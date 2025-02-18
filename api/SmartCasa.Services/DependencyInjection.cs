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
        services.AddIdentity<User, IdentityRole<int>>()
            .AddEntityFrameworkStores<CoreContext>()
            .AddDefaultTokenProviders();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IAuthService, AuthService>();
    }
}

