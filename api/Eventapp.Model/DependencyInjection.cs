using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Eventapp.Model;

public static class DependencyInjection
{
    public static void RegisterModels(this IServiceCollection services, IConfiguration Configuration)
    {
        var connString = Configuration.GetConnectionString("DefaultConnection");

        services.AddDbContext<CoreContext>(options =>
        {
            options.UseNpgsql(
                Configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly("Eventapp.API")
            );
        });

        //services.AddScoped<IUserRepository, UserRepository>();
    }
}