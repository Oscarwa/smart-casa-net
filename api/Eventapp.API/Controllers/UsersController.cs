using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Eventapp.Services.Interfaces;
using Eventapp.Model;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Eventapp.API.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IEventService _eventService;
    public UsersController(IUserService userService, IEventService eventService)
    {
        _userService = userService;
        _eventService = eventService;
    }

    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {

        // Extract user ID from token
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return Unauthorized("Invalid token");

        // Fetch user details
        var user = await _userService.Get(int.Parse(userId));
        if (user == null)
            return NotFound("User not found");

        var events = await _eventService.MyEvents(user);

        return Ok(new
        {
            Id = user.Id,
            Email = user.Email,
            Username = user.UserName,
            Events = events
        });
    }


}
