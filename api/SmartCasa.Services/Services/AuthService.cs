using System.Linq;
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
        private readonly IEmailService _emailService;

        public AuthService(SignInManager<User> signInManager, UserManager<User> userManager, IEmailService emailService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _emailService = emailService;
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
            var user = await _userManager.FindByNameAsync(username);
            if (user is null) return null;

            if (!await _userManager.CheckPasswordAsync(user, password)) return null;
            return user;
        }

        public async Task<bool> PasswordReset(string username, string token, string password)
        {
            var user = await _userManager.FindByEmailAsync(username);
            if (user == null)
            {
                return false;
            }
            var result = await _userManager.ResetPasswordAsync(user, token, password);
            if (!result.Succeeded)
            {
                return false;
            }
            return true;
        }

        public async Task<(User?, string[])> SignUp(string username)
        {
            var newUser = new User { UserName = username, Email = username, EmailConfirmed = true };
            var result = await _userManager.CreateAsync(newUser);

            if (!result.Succeeded)
            {
                return (null, result.Errors.Select(e => e.Description).ToArray());
            }

            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(newUser);

            var resetLink = $"http://localhost:5173/auth/password-reset?token={Uri.EscapeDataString(resetToken)}&email={Uri.EscapeDataString(username)}";
            await _emailService.SendAsync([username], "Password reset", $"<div>{resetLink}</div>");

            return (newUser, [string.Empty]);

        }

        public IQueryable<User> All()
        {
            return _userManager.Users.AsQueryable();
        }
    }
}
