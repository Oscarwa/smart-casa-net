using System.ComponentModel.DataAnnotations;
using SmartCasa.Model.Entities;

namespace SmartCasa.Model.Entities;

public enum MemberRole
{
    Admin,
    Regular,
    Managed
}

public class Member
{
    [Key]
    public int Id { get; set; }
    public int HomeId { get; set; }
    public Home Home { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public string DisplayName { get; set; }
    public MemberRole Role { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool Active { get; set; } = true;
    public int AccountId { get; set; }
    public Account Account { get; set; }
}