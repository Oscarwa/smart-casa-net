using System.ComponentModel.DataAnnotations;

namespace SmartCasa.Model.Entities;

public enum ExpenseCategory
{
    Housing,
    Utilities,
    Groceries,
    Transportation,
    Entertainment,
    Health,
    Delivery,
    Hobbies,
    Other
}

public class Expense
{
    [Key]
    public int Id { get; set; }
    public int HomeId { get; set; }
    public Home Home { get; set; }
    public int RegisteredById { get; set; }
    public Member RegisteredBy { get; set; }
    public required DateTime Date { get; set; }
    public required string Description { get; set; }
    public required decimal Amount { get; set; }
    public ExpenseCategory Category { get; set; } = ExpenseCategory.Other;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int? RecurrenceId { get; set; }
    public ExpenseRecurrence Recurrence { get; set; }
    public ICollection<Split> Splits { get; set; } = new List<Split>();

    public bool IsReconciled => Splits.All(s => s.IsPaid);
}
