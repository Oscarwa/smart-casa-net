using System.ComponentModel.DataAnnotations;

namespace Eventapp.Model.Entities;
public class Guest
{
    [Key]
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }

    public required Event Event { get; set; }
}