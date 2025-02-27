using Eventapp.Model.Entities;

namespace Eventapp.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User?> SignIn(string username, string password);

        Task<(User?, string[])> SignUp(string username);

        Task<bool> IsEmailDuplicate(string email);
        IQueryable<User> All();
    }
}
