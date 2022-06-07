using FluentValidation;
using InstantCredit.Shared.Models;

namespace InstantCredit.Shared.Validators;

public class PassportValidator : AbstractValidator<Passport>
{
    public PassportValidator()
    {
        RuleFor(r => r.Series)
            .NotEmpty()
            .Length(4)
            .Matches(@"^\d*$");

        RuleFor(r => r.Number)
            .NotEmpty()
            .Length(6)
            .Matches(@"^\d*$");

        RuleFor(r => r.Registration)
            .NotEmpty()
            .Length(5, 150);

        RuleFor(r => r.IssuedBy)
            .NotEmpty()
            .Length(5, 150);

        RuleFor(r => r.IssueDate)
            .NotEmpty()
            .Must(issueDate => issueDate < DateTime.Now)
            .WithMessage("The date of issue must be less than the current date");
    }
}