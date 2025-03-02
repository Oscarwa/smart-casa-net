using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Eventapp.Model.Entities;

namespace Eventapp.Services.Interfaces
{
    public interface IUserService

    {
        Task<User?> Get(int id);
    }
}
