using SmartCasa.Model;
using SmartCasa.Model.Entities;
using SmartCasa.Services.DTO;
using SmartCasa.Services.Interfaces;

namespace SmartCasa.Services;

public class MemberService : IMemberService
{
    private readonly CoreContext _context;

    public MemberService(CoreContext context)
    {
        _context = context;
    }

    private IQueryable<MemberDTO> HomeMembers(int homeId)
    {
        return _context.Members.Where(
            g => g.HomeId == homeId
        ).Select(g => g.ToDto());
    }

    public IQueryable<MemberDTO> All(int homeId)
    {
        return HomeMembers(homeId).AsQueryable();
    }

    public MemberDTO? Get(int id, int homeId)
    {
        return HomeMembers(homeId).FirstOrDefault(e => e.Id == id);
    }

    public async Task<MemberDTO?> Create(MemberDTO entry, int homeId)
    {
        Member newEntry = entry.ToEntity();
        var home = await _context.Homes.FindAsync(homeId);
        if (home == null)
        {
            return null;
        }

        newEntry.Home = home;

        var result = await _context.Members.AddAsync(newEntry);
        await _context.SaveChangesAsync();
        return result.Entity.ToDto();
    }

    public async Task<MemberDTO?> Update(MemberDTO entry, int userId)
    {
        var entryToUpdate = await _context.Members.FindAsync(entry.Id);
        if (entryToUpdate == null)
        {
            return null;
        }
        entryToUpdate.DisplayName = entry.DisplayName;
        entryToUpdate.Role = entry.Role.ToMemberRole();


        var result = _context.Members.Update(entryToUpdate);
        await _context.SaveChangesAsync();
        return result.Entity.ToDto();
    }

    public async Task<bool> Delete(int id, int userId)
    {
        var entryToDelete = await _context.Members.FindAsync(id);
        if (entryToDelete == null)
        {
            return false;
        }
        entryToDelete.Active = false;
        //var result = _context.Members.Remove(entryToDelete);
        _context.Members.Update(entryToDelete);
        return await _context.SaveChangesAsync() > 0;

    }

}