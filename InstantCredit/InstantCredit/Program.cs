using System.Reflection;
using System.Text.Json.Serialization;
using FluentValidation.AspNetCore;
using InstantCredit.Core.Interfaces;
using InstantCredit.Infrastructure.Services;
using MinimalApi.Endpoint.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpoints();
builder.Services.AddFluentValidation(fv =>
{
    fv.LocalizationEnabled = false;
    fv.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly());
});

builder.Services.Configure<Microsoft.AspNetCore.Mvc.JsonOptions>(
    options => options
        .JsonSerializerOptions
        .Converters
        .Add(new JsonStringEnumConverter()));

builder.Services.AddScoped<ICreditCalculationService, CreditCalculationService>();
builder.Services.AddTransient<ICriminalChecker, CriminalChecker>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapFallbackToFile("index.html");
app.MapEndpoints();
app.Run();