﻿using Microsoft.AspNetCore.Http;
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
    }
}
