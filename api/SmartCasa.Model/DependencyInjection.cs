using SmartCasa.Model.Repositories;
using SmartCasa.Model.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace SmartCasa.Model;

public static class DependencyInjection
{
    public static void RegisterModels(this IServiceCollection services, IConfiguration Configuration)
    {
        var connString = Configuration.GetConnectionString("DefaultConnection");

        services.AddDbContext<CoreContext>(options =>
        {
            options.UseNpgsql(
                Configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly("SmartCasa.API")
            );
        });

        services.AddScoped<IExpenseRepository, ExpenseRepository>();
    }
}