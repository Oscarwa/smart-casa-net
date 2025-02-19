using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Eventapp.Model.Entities;

namespace Eventapp.Model;
public class CoreContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    public CoreContext() { }
    public CoreContext(DbContextOptions<CoreContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    // public DbSet<Home> Homes { get; set; }
}