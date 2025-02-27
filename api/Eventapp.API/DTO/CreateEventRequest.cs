namespace Eventapp.API.DTO;

public class CreateEventRequest
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public DateOnly Date { get; set; }
    public string? Location { get; set; }
}
