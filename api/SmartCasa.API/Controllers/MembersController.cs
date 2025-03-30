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
public class MembersController : ControllerBase
{
    IMemberService _memberService;
    public MembersController(IMemberService memberService)
    {
        _memberService = memberService;
    }

    [HttpPost("{homeId}")]
    public async Task<IActionResult> Create(int homeId, [FromBody] CreateMemberRequest request)
    {
        int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId);
        var newMemberEntry = await _memberService.Create(new MemberDTO
        {
            DisplayName = request.DisplayName,
            Role = request.Role,
        }, homeId);
        if (newMemberEntry == null)
        {
            return BadRequest();
        }
        return new JsonResult(newMemberEntry);
    }

    [HttpGet("{homeId}")]
    public IActionResult Get(int homeId)
    {

        return Ok(_memberService.All(homeId).ToList());
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateMemberRequest request)
    {
        int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId);
        var updatedMemberEntry = await _memberService.Update(new MemberDTO
        {
            Id = id,
            DisplayName = request.DisplayName,
            Role = request.Role,
        }, userId);
        if (updatedMemberEntry == null)
        {
            return BadRequest();
        }
        return new JsonResult(updatedMemberEntry);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId);
        var deleted = await _memberService.Delete(id, userId);
        if (!deleted)
        {
            return BadRequest();
        }
        return new JsonResult(deleted);
    }

}
