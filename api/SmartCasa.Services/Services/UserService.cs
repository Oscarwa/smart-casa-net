using SmartCasa.Model;
using SmartCasa.Model.Entities;
using SmartCasa.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartCasa.Services
{
    public class UserService : IUserService
    {
        private readonly CoreContext _context;
        public UserService(CoreContext context)
        {
            _context = context;
        }

        public async Task<User?> Get(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}
