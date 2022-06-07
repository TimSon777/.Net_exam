using FluentValidation;

namespace InstantCredit.Credit.Calculate;

// ReSharper disable once UnusedType.Global
public class Validator : AbstractValidator<Request>
{
    public Validator()
    {
        RuleFor(r => r.Credit!.Sum)
            .Cascade(CascadeMode.Stop)
            .GreaterThan(0)
            .LessThanOrEqualTo(10_000_000)
            .When((c, _) => c.Credit is not null);

        RuleFor(r => r.Personality!.Age)
            .Cascade(CascadeMode.Stop)
            .GreaterThanOrEqualTo(21)
            .LessThanOrEqualTo(72)
            .When((c, _) => c.Personality is not null);

        RuleFor(r => r.Personality!.FirstName)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(2, 30)
            .When((c, _) => c.Personality is not null);
        
        RuleFor(r => r.Personality!.SecondName)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(2, 30)
            .When((c, _) => c.Personality is not null);
        
        RuleFor(r => r.Personality!.Patronymic)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(2, 30)
            .When((c, _) => c.Personality is not null);

        RuleFor(r => r.Passport!.Number)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(4)
            .When((c, _) => c.Passport is not null);

        RuleFor(r => r.Passport!.Registration)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(5, 150)
            .When((c, _) => c.Passport is not null);

        RuleFor(r => r.Passport!.Registration)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(6)
            .When((c, _) => c.Passport is not null);
        
        RuleFor(r => r.Passport!.IssuedBy)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(5, 150)
            .When((c, _) => c.Passport is not null);

        RuleFor(r => r.Passport!.IssueDate)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Must(issueDate => issueDate < DateTime.Now)
            .WithMessage("The date of issue must be less than the current date")
            .When((c, _) => c.Passport is not null);
    }
}