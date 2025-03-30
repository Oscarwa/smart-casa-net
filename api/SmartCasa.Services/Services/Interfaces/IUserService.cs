using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartCasa.Model.Entities;

namespace SmartCasa.Services.Interfaces
{
    public interface IUserService

    {
        Task<User?> Get(int id);
    }
}
