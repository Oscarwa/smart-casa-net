using System.ComponentModel.DataAnnotations;

namespace Eventapp.Model.Entities;
public class Event
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }
    public DateOnly Date { get; set; }
    public string? Location { get; set; }
    public string? Description { get; set; }
    public required List<User> Organizers { get; set; }
    public List<Guest>? Guests { get; set; }
}