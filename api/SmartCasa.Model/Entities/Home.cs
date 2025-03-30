using System.ComponentModel.DataAnnotations;
namespace SmartCasa.Model.Entities;


public class Home()
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public int AccountId { get; set; }
    public Account Account { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Member> Members { get; set; } = new List<Member>();
}