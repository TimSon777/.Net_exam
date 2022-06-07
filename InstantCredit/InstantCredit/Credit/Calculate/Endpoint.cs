using FluentValidation;
using InstantCredit.Core.Interfaces;
using MinimalApi.Endpoint;

namespace InstantCredit.Credit.Calculate;

// ReSharper disable once UnusedType.Global
public class Endpoint : IEndpoint<IResult, Request>
{
    private readonly IValidator<Request> _validator;
    private ICreditCalculationService _creditCalculationService;
    private readonly ICriminalChecker _criminalChecker;
    
    public Endpoint(IValidator<Request> validator, ICriminalChecker criminalChecker)
    {
        _validator = validator;
        _criminalChecker = criminalChecker;
    }

    public async Task<IResult> HandleAsync(Request request)
    {
        var result = await _validator.ValidateAsync(request);
        if (!result.IsValid)
        {
            return Results.BadRequest(result.Errors);
        }

        var criminalStatus = await _criminalChecker.CheckAsync(request.Passport!, request.CertificateOfNoCriminalRecord);
        if (!criminalStatus.Succeeded)
        {
            return Results.Conflict(criminalStatus.Error);
        }

        var response = _creditCalculationService
            .CalculateByAge(request.Personality!.Age, request.Credit!)
            .CalculateByCriminal(request.CertificateOfNoCriminalRecord)
            .CalculateByEmployment(request.Personality.Employment, request.Personality.Age)
            .CalculateByCreditInfo(request.Credit!)
            .CalculateByOtherCredits(request.OtherCredits, request.Credit!.Purpose)
            .Build()
            .ToResponse();

        return Results.Ok(response);
    }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPost(RouteConstants.Credit.Calculate, async (Request r, ICreditCalculationService creditCalculationService) =>
        {
            _creditCalculationService = creditCalculationService;
            return await HandleAsync(r);
        });
    }
}