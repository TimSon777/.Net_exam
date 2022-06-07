using InstantCredit.Core.Models;

namespace InstantCredit.Credit.Calculate;

public class Response
{
    public bool CreditIssued { get; set; }
    public double Percent { get; set; }
}

public static class CreditResultExtensions
{
    public static Response ToResponse(this CreditResult creditResult)
    {
        return new Response
        {
            Percent = creditResult.Percent,
            CreditIssued = creditResult.CreditIssued
        };
    }
}