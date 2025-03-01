using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Eventapp.Model;
using Eventapp.Model.Entities;
using Eventapp.Services.Interfaces;

namespace Eventapp.Services;

public static class DependencyInjection
{
    public static void RegisterServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddIdentity<User, IdentityRole<int>>()
            .AddEntityFrameworkStores<CoreContext>()
            .AddDefaultTokenProviders();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IEventService, EventService>();
        services.AddScoped<IEmailService, EmailService>();
    }
}

