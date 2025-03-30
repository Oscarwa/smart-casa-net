using SmartCasa.Model;
using SmartCasa.Model.Entities;
using SmartCasa.Services.DTO;
using SmartCasa.Services.Interfaces;

namespace SmartCasa.Services;

public class HomeService : IHomeService
{
    private readonly CoreContext _context;

    public HomeService(CoreContext context)
    {
        _context = context;
    }

    private IQueryable<HomeDTO> UserHomes(int userId)
    {
        return _context.Homes.Where(
            e => e.Members.Select(o => o.UserId).Contains(userId)
        ).Select(e => e.ToDto());
    }

    public IQueryable<HomeDTO> All(int userId)
    {
        return UserHomes(userId).AsQueryable();
    }

    public HomeDTO? Get(int id, int userId)
    {
        return UserHomes(userId).FirstOrDefault(e => e.Id == id);
    }

    public async Task<HomeDTO?> Create(HomeDTO entry, int userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return null;
        }
        Home newEntry = entry.ToEntity();

        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            // Create home account
            var homeAccount = new Account();
            await _context.Accounts.AddAsync(homeAccount);
            await _context.SaveChangesAsync(); // Ensure home account is created first
            newEntry.AccountId = homeAccount.Id;

            // Create member account
            var memberAccount = new Account();
            await _context.Accounts.AddAsync(memberAccount);
            await _context.SaveChangesAsync(); // Save to generate account ID

            // Create member and add to home
            var member = new Member
            {
                User = user,
                Home = newEntry,
                DisplayName = user.UserName,
                Role = MemberRole.Admin,
                Account = memberAccount,
            };
            newEntry.Members.Add(member);

            // Add the home entry to the database
            await _context.Homes.AddAsync(newEntry);

            // Commit transaction
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            // Return the newly created home DTO
            return newEntry.ToDto();
        }
        catch (Exception)
        {
            // Rollback transaction if any error occurs
            await transaction.RollbackAsync();
            throw;  // Re-throw the exception so the caller can handle it
        }
    }

    public async Task<HomeDTO?> Update(HomeDTO entry, int userId)
    {
        var entryToUpdate = await _context.Homes.FindAsync(entry.Id);
        if (entryToUpdate == null)
        {
            return null;
        }
        entryToUpdate.Name = entry.Name;

        var result = _context.Homes.Update(entryToUpdate);
        await _context.SaveChangesAsync();
        return result.Entity.ToDto();
    }

    public async Task<bool> Delete(int id, int userId)
    {
        var homeToDelete = await _context.Homes.FindAsync(id);
        if (homeToDelete == null)
        {
            return false;
        }
        var result = _context.Homes.Remove(homeToDelete);
        return await _context.SaveChangesAsync() > 0;

    }

}