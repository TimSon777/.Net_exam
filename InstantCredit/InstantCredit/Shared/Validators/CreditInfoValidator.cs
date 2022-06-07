using FluentValidation;
using InstantCredit.Shared.Models;

namespace InstantCredit.Shared.Validators;

public class CreditInfoValidator : AbstractValidator<CreditInfo>
{
    public CreditInfoValidator()
    {
        RuleFor(c => c.Sum)
            .GreaterThan(0)
            .LessThanOrEqualTo(10_000_000);
    }
}