using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace SmartCasa.Model;

public static class DependencyInjection
{
    public static void RegisterModel(this IServiceCollection services, IConfiguration Configuration)
    {
        services.AddDbContext<AspNetCoreNTierDbContext>(options =>
        {
            options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
        });

        services.AddScoped<IUserRepository, UserRepository>();
    }
}