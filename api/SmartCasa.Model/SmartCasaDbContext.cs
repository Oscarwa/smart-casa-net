using Microsoft.EntityFrameworkCore;

public class SmartCasaDbContext : SmartCasaDbContext
{
    public SmartCasaDbContext(DbContextOptions<SmartCasaDbContext> options) : base(options) { }

    public DbSet<Home> Homes { get; set; }
}