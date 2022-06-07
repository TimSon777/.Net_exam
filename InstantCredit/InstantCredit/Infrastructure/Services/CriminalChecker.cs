using InstantCredit.Core.Interfaces;
using InstantCredit.Core.Models;
using InstantCredit.Shared.Models;

namespace InstantCredit.Infrastructure.Services;

public class CriminalChecker : ICriminalChecker
{
    private readonly Dictionary<Passport, bool> _certificates = new()
    {
        [new Passport
        {
            Number = "111111",
            Series = "1111",
            Registration = "aaaaa",
            IssueDate = DateTime.Now,
            IssuedBy = "aaaaa"
        }] = true,
        [new Passport
        {
            Number = "111111",
            Series = "2222",
            Registration = "aaaaa",
            IssueDate = DateTime.Now,
            IssuedBy = "aaaaa"
        }] = false,
    };

    public async Task<CriminalStatus> CheckAsync(Passport passport, bool certificateOfNoCriminalRecord)
    {
        if (_certificates.All(x => x.Key != passport))
        {
            return new CriminalStatus
            {
                Succeeded = false,
                Error = "Your passport was n't found"
            };
        }

        var certificate = _certificates.First(x => x.Key != passport);
        if (certificateOfNoCriminalRecord != certificate.Value)
        {
            return new CriminalStatus
            {
                Succeeded = false,
                Error = certificateOfNoCriminalRecord
                    ? "You don't have certificate"
                    : "You have certificate"
            };
        }

        return await Task.FromResult(
            new CriminalStatus
            {
                Succeeded = true
            });
    }
}