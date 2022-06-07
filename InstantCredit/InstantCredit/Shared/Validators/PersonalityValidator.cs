using FluentValidation;
using InstantCredit.Shared.Models;

namespace InstantCredit.Shared.Validators;

public class PersonalityValidator : AbstractValidator<Personality>
{
    public PersonalityValidator()
    {
        RuleFor(r => r.Age)
            .GreaterThanOrEqualTo(21)
            .LessThanOrEqualTo(72);

        RuleFor(r => r.FirstName)
            .NotEmpty()
            .Length(2, 30);

        RuleFor(r => r.SecondName)
            .NotEmpty()
            .Length(2, 30);

        RuleFor(r => r.Patronymic)
            .NotEmpty()
            .Length(2, 30);
    }
}