using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using SmartCasa.Model.Entities;

namespace SmartCasa.Model;
public class CoreContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    public CoreContext() { }
    public CoreContext(DbContextOptions<CoreContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    // public DbSet<Home> Homes { get; set; }
}