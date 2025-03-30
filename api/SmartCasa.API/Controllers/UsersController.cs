using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using SmartCasa.Services.Interfaces;
using SmartCasa.Model;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace SmartCasa.API.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IHomeService _homeService;
    public UsersController(IUserService userService, IHomeService homeService)
    {
        _userService = userService;
        _homeService = homeService;
    }

    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {

        // Extract user ID from token
        if (!int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId))
            return Unauthorized("Invalid token");

        // Fetch user details
        var user = await _userService.Get(userId);
        if (user == null)
            return NotFound("User not found");


        return Ok(new
        {
            Id = user.Id,
            Email = user.Email,
            Username = user.UserName,

        });
    }


}
