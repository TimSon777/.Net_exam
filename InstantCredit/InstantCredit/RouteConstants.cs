namespace InstantCredit;

public static class RouteConstants
{
    private const string Prefix = "/api";

    public static class Credit
    {
        public const string Calculate = $"{Prefix}/{nameof(Credit)}/{nameof(Calculate)}";
    }
}