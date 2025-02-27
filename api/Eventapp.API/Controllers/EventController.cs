using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Eventapp.Services.Interfaces;
using Eventapp.API.DTO;
using Microsoft.AspNetCore.Authorization;

namespace Eventapp.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class EventController : ControllerBase
{
    IEventService _eventService;
    public EventController(IEventService eventService)
    {
        _eventService = eventService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateEvent([FromBody] CreateEventRequest request)
    {
        var @event = await _eventService.Create(request.Name, request.Description, request.Date, request.Location, 1);
        if (@event == null)
        {
            return BadRequest();
        }
        return new JsonResult(@event.Name);
    }

    [HttpGet]
    public IActionResult Get() => Ok(_eventService.All().Select(e => e.Name).ToList());

}
