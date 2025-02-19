﻿using System.Linq;
using Microsoft.AspNetCore.Identity;
using System.Text.Json;
using SmartCasa.Model.Entities;
using SmartCasa.Services.Interfaces;
using Microsoft.Extensions.Logging;
using SmartCasa.Model;

namespace SmartCasa.Services
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

        public async Task<(User?, string[])> SignUp(string username, string password)
        {
            var newUser = new User { UserName = username, Email = username };

            var result = await _userManager.CreateAsync(newUser, password);
            return result.Succeeded ? (newUser, [string.Empty]) : (null, result.Errors.Select(e => e.Description).ToArray());

        }

        public IQueryable<User> All()
        {
            return _userManager.Users.AsQueryable();
        }
    }
}
