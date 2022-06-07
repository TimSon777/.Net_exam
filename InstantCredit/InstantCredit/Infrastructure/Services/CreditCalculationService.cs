using InstantCredit.Core.Interfaces;
using InstantCredit.Core.Models;
using InstantCredit.Shared.Extensions;
using InstantCredit.Shared.Models;
using InstantCredit.Shared.Models.Enums;

namespace InstantCredit.Infrastructure.Services;

public class CreditCalculationService : ICreditCalculationService
{
    private int SumPoints { get; set; }
    
    public ICreditCalculationService CalculateByAge(int age, CreditInfo creditInfo)
    {
        if (age.Between(21, 28))
        {
            switch (creditInfo.Sum)
            {
                case < 1_000_000:
                    SumPoints += 12;
                    return this;
                case > 3_000_000:
                    SumPoints += 0;
                    return this;
                default:
                    SumPoints += 9;
                    return this;
            }
        }

        if (age.Between(29, 59))
        {
            SumPoints += 14;
            return this;
        }

        SumPoints += creditInfo.Deposit == Deposit.None 
            ? 0 
            : 8;
        
        return this;
    }

    public ICreditCalculationService CalculateByCriminal(bool certificateOfNoCriminalRecord)
    {
        SumPoints += certificateOfNoCriminalRecord 
            ? 15 
            : 0;
        
        return this;
    }

    public ICreditCalculationService CalculateByEmployment(Employment employment, int age)
    {
        SumPoints += employment switch
        {
            Employment.Contract => 14,
            Employment.OwnIndividualEntrepreneurship => 12,
            Employment.Freelancer => 8,
            Employment.Pensioner when age < 70 => 5,
            Employment.Pensioner => 0,
            Employment.Unemployed => 0,
            _ => throw new ArgumentOutOfRangeException(nameof(employment), employment, null)
        };

        return this;
    }

    public ICreditCalculationService CalculateByCreditInfo(CreditInfo creditInfo)
    {
        SumPoints += creditInfo.Sum switch
        {
            <= 1_000_000 => 12,
            <= 5_000_000 => 14,
            <= 10_000_000 => 8,
            _ => throw new ArgumentOutOfRangeException()
        };

        SumPoints += creditInfo.Deposit switch
        {
            Deposit.Guarantee => 12,
            Deposit.Realty => 14,
            Deposit.OldCar => 3,
            Deposit.NewCar => 8,
            Deposit.None => 0,
            _ => throw new ArgumentOutOfRangeException()
        };

        SumPoints += creditInfo.Purpose switch
        {
            CreditPurpose.Realty => 8,
            CreditPurpose.ConsumerCredit => 14,
            CreditPurpose.ReCrediting => 12,
            _ => throw new ArgumentOutOfRangeException()
        };

        return this;
    }

    public ICreditCalculationService CalculateByOtherCredits(bool otherCredits, CreditPurpose creditPurpose)
    {
        if (!otherCredits)
        {
            SumPoints += creditPurpose == CreditPurpose.ReCrediting ? 0 : 15;
        }
        else
        {
            SumPoints += 0;
        }

        return this;
    }

    public CreditResult Build()
    {
        var result = new CreditResult
        {
            Percent = 0,
            CreditIssued = SumPoints >= 80
        };
        
        if (SumPoints < 80)
        {
            return result;
        }

        result.Percent = SumPoints switch
        {
            < 84 => 30,
            < 88 => 26,
            < 92 => 22,
            < 96 => 19,
            < 100 => 15,
            100 => 12.5,
            _ => throw new ArgumentOutOfRangeException()
        };

        result.CreditIssued = true;
        SumPoints = 0;
        return result;
    }
}