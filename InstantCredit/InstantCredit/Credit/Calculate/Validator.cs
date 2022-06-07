using FluentValidation;
using InstantCredit.Shared.Validators;

namespace InstantCredit.Credit.Calculate;

// ReSharper disable once UnusedType.Global
public class Validator : AbstractValidator<Request>
{
    public Validator()
    {
        RuleFor(r => r.Credit)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .SetValidator(new CreditInfoValidator());

        RuleFor(r => r.Personality)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .SetValidator(new PersonalityValidator());

        RuleFor(r => r.Passport)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .SetValidator(new PassportValidator());
    }
}