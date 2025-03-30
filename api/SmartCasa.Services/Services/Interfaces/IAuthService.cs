using SmartCasa.Model.Entities;

namespace SmartCasa.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User?> SignIn(string username, string password);

        Task<(User?, string[])> SignUp(string username);

        Task<bool> PasswordReset(string username, string token, string password);

        Task<bool> IsEmailDuplicate(string email);
        IQueryable<User> All();
    }
}
