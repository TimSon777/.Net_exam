using InstantCredit.Shared.Models;

namespace InstantCredit.Credit.Calculate;

public class Request
{
    public PersonalityModel? Personality { get; set; }
    public CreditInfo? Credit { get; set; }
    public bool CertificateOfNoCriminalRecord { get; set; }
    public bool OtherCredits { get; set; }
    public Passport? Passport { get; set; }
}