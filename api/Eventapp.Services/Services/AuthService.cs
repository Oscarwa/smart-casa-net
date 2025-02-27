using System.Linq;
using Microsoft.AspNetCore.Identity;
using System.Text.Json;
using Eventapp.Model.Entities;
using Eventapp.Services.Interfaces;
using Microsoft.Extensions.Logging;
using Eventapp.Model;

namespace Eventapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AuthService(SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<bool> IsEmailDuplicate(string email)
        {
            Console.WriteLine("Checking email: " + email);
            var user = await _userManager.FindByEmailAsync(email);
            Console.WriteLine("User result: " + (user != null).ToString());
            return user != null;
        }

        public async Task<User?> SignIn(string username, string password)
        {
            var signInResult = await _signInManager.PasswordSignInAsync(username, password, false, false);
            if (signInResult.Succeeded)
            {
                var appUser = await _userManager.FindByEmailAsync(username);
                if (appUser != null)
                {
                    var customClaims = new List<KeyValuePair<string, string>>();
                    customClaims.Add(new KeyValuePair<string, string>("user", JsonSerializer.Serialize(appUser)));
                }
                return appUser;
            }
            return null;
        }

        public async Task<(User?, string[])> SignUp(string username)
        {
            var newUser = new User { UserName = username, Email = username };
            string password = "Event@2025";

            var result = await _userManager.CreateAsync(newUser, password);
            return result.Succeeded ? (newUser, [string.Empty]) : (null, result.Errors.Select(e => e.Description).ToArray());

        }

        public IQueryable<User> All()
        {
            return _userManager.Users.AsQueryable();
        }
    }
}
