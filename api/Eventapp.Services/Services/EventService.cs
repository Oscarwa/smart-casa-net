using Eventapp.Model;
using Eventapp.Model.Entities;
using Eventapp.Services.Interfaces;

namespace Eventapp.Services;

public class EventService : IEventService
{
    private readonly CoreContext _context;

    public EventService(CoreContext context)
    {
        _context = context;
    }

    public IQueryable<Event> All()
    {
        return _context.Events.AsQueryable();
    }

    public async Task<IQueryable<Event>> MyEvents(User user)
    {
        return All().Where(e => e.Organizers.Contains(user)).AsQueryable();
    }

    public async Task<Event?> Get(int id)
    {
        return await _context.Events.FindAsync(id);
    }

    public async Task<Event?> Create(string name, string? description, DateOnly date, string? location, int userId)
    {
        var organizer = await _context.Users.FindAsync(userId);
        if (organizer == null)
        {
            return null;
        }

        var newEvent = new Event
        {
            Name = name,
            Description = description,
            Date = date,
            Location = location,
            Organizers = new List<User> { organizer }
        };
        var result = await _context.Events.AddAsync(newEvent);
        await _context.SaveChangesAsync();
        return result.Entity;
    }

    public async Task<Event?> Update(int id, string name, string? description, DateOnly date, string? location)
    {
        var eventToUpdate = await _context.Events.FindAsync(id);
        if (eventToUpdate == null)
        {
            return null;
        }
        eventToUpdate.Name = name;
        eventToUpdate.Description = description;
        eventToUpdate.Date = date;
        eventToUpdate.Location = location;
        var result = _context.Events.Update(eventToUpdate);
        await _context.SaveChangesAsync();
        return result.Entity;
    }

    public async Task<bool> Delete(int id)
    {
        var eventToDelete = await _context.Events.FindAsync(id);
        if (eventToDelete == null)
        {
            return false;
        }
        var result = _context.Events.Remove(eventToDelete);
        return await _context.SaveChangesAsync() > 0;

    }
}