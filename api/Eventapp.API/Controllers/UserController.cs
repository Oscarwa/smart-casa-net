using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Eventapp.Services;
using Eventapp.Services.Interfaces;

namespace Eventapp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        IAuthService _authService;
        public UserController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _authService.SignIn(request.Email, request.Password);
            if (user == null)
            {
                return BadRequest();
            }
            return new JsonResult(user);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] RegisterRequest request)
        {
            var (user, message) = await _authService.SignUp(request.Email, request.Password);
            return user != null ? Ok(user.Id) : BadRequest(message);
        }

        [HttpGet("all")]
        public IActionResult Get() => Ok(_authService.All().Select(u => u.Email).ToList());
    }
}
