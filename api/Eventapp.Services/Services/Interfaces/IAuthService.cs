using Eventapp.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eventapp.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User?> SignIn(string username, string password);

        Task<(User?, string[])> SignUp(string username, string password);

        Task<bool> IsEmailDuplicate(string email);
        IQueryable<User> All();
    }
}
