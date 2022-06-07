using InstantCredit.Core.Models;
using InstantCredit.Shared.Models;

namespace InstantCredit.Core.Interfaces;

public interface ICriminalChecker
{
    Task<CriminalStatus> CheckAsync(Passport passport, bool certificateOfNoCriminalRecord);
}