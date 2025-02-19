using System.ComponentModel.DataAnnotations;

namespace Eventapp.Model;
public class Home
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Rules { get; set; }
}