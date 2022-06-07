using InstantCredit.Core.Interfaces;
using InstantCredit.Core.Models;
using InstantCredit.Shared.Models;

namespace InstantCredit.Infrastructure.Services;

public class CriminalChecker : ICriminalChecker
{
    public async Task<CriminalStatus> CheckAsync(Passport passport, bool certificateOfNoCriminalRecord)
    {
        var number = Random.Shared.Next(10);
        
        var criminalStatus = new CriminalStatus
        {
            Succeeded = true,
            Errors = new List<string>()
        };
        
        switch (number)
        {
            case 0:
                criminalStatus.Succeeded = false;
                criminalStatus.Errors.Add("Passport error: passport was not found");
                break;
            case 1 when certificateOfNoCriminalRecord:
                criminalStatus.Succeeded = true;
                criminalStatus.Errors.Add("Certificate error: certificate was not found");
                break;
        }

        return await Task.FromResult(criminalStatus);
    }
}