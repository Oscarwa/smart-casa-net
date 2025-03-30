using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using SmartCasa.Services.Interfaces;

using SmartCasa.API.DTO;
using Microsoft.AspNetCore.Authorization;
using SmartCasa.Services.DTO;

namespace SmartCasa.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase
{
    IHomeService _homeService;
    public HomeController(IHomeService homeService)
    {
        _homeService = homeService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateHomeRequest request)
    {
        int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId);
        var entry = await _homeService.Create(new HomeDTO
        {
            Name = request.Name,
        }, userId);
        if (entry == null)
        {
            return BadRequest();
        }
        return new JsonResult(entry.Name);
    }

    [HttpGet]
    public IActionResult Get()
    {
        int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId);
        return Ok(_homeService.All(userId).ToList());
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateHomeRequest request)
    {
        int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId);
        var entry = await _homeService.Update(new HomeDTO
        {
            Id = id,
            Name = request.Name,
        }, userId);
        if (entry == null)
        {
            return BadRequest();
        }
        return new JsonResult(entry.Name);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId);
        var deleted = await _homeService.Delete(id, userId);
        if (!deleted)
        {
            return BadRequest();
        }
        return new JsonResult(deleted);
    }

}
