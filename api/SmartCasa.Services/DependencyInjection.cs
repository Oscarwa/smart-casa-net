using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SmartCasa.Model;
using SmartCasa.Model.Entities;
using SmartCasa.Services.Interfaces;

namespace SmartCasa.Services;

public static class DependencyInjection
{
    public static void RegisterServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHttpContextAccessor();

        services
            .AddIdentityCore<User>()
            .AddRoles<IdentityRole<int>>()
            .AddEntityFrameworkStores<CoreContext>()
            .AddDefaultTokenProviders();

        services.Configure<IdentityOptions>(options =>
        {
            options.User.RequireUniqueEmail = true;
        });

        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IHomeService, HomeService>();
        services.AddScoped<IMemberService, MemberService>();
        services.AddScoped<IExpenseService, ExpenseService>();
        services.AddScoped<IEmailService, EmailService>();
    }
}

