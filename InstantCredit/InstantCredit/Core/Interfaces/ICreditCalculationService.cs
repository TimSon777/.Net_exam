using InstantCredit.Core.Models;
using InstantCredit.Shared.Models;
using InstantCredit.Shared.Models.Enums;

namespace InstantCredit.Core.Interfaces;

public interface ICreditCalculationService
{
    ICreditCalculationService CalculateByAge(int age, CreditInfo creditInfo);
    ICreditCalculationService CalculateByCriminal(bool certificateOfNoCriminalRecord);
    ICreditCalculationService CalculateByEmployment(Employment employment, int age);
    ICreditCalculationService CalculateByCreditInfo(CreditInfo creditInfo);
    ICreditCalculationService CalculateByOtherCredits(bool otherCredits, CreditPurpose creditPurpose);
    CreditResult Build();
}