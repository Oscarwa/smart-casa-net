using Eventapp.Model.Entities;

namespace Eventapp.Services.Interfaces
{
    public interface IEventService
    {
        Task<Event?> Create(string name, string? description, DateOnly date, string? location, int userId);

        Task<Event?> Update(int id, string name, string? description, DateOnly date, string? location);

        Task<bool> Delete(int id);

        Task<Event?> Get(int id);

        IQueryable<Event> All();
    }

}
