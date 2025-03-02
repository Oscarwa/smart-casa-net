using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.JsonWebTokens;
using Eventapp.Services.Interfaces;
using Eventapp.Model.Entities;

namespace Eventapp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IConfiguration _config;
        public AuthController(IConfiguration config, IAuthService authService)
        {
            _authService = authService;
            _config = config;
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] LoginRequest request)
        {
            var user = await _authService.SignIn(request.Email, request.Password);
            if (user == null)
            {
                return BadRequest();
            }
            var token = GenerateToken(user);
            // Console.WriteLine($"Generated token for user [{request.Email}]: {token}");
            return new JsonResult(token);
        }

        public class RegisterRequest
        {
            public required string Email { get; set; }
        }
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] RegisterRequest request)
        {
            Console.WriteLine("Request: " + request.Email);
            var (user, message) = await _authService.SignUp(request.Email);
            return user != null ? Ok(user.Id) : BadRequest(message);
        }


        public class PasswordResetModel
        {
            public required string Email { get; set; }
            public required string Token { get; set; }
            public required string Password { get; set; }
        }
        [HttpPost("password-reset")]
        public async Task<IActionResult> PasswordReset([FromBody] PasswordResetModel model)
        {
            var passwordReset = await _authService.PasswordReset(model.Email, model.Token, model.Password);
            return passwordReset ? Ok() : BadRequest();
        }

        [HttpGet("all")]
        public IActionResult Get() => Ok(_authService.All().Select(u => u.Email).ToList());


        private string GenerateToken(User user)
        {
            var jwtSettings = _config.GetSection("JwtSettings");
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));

            var creds = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
        };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpireMinutes"])),
                SigningCredentials = creds,
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"]
            };

            var tokenHandler = new JsonWebTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return token;
        }
    }
}
