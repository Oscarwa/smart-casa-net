using System.ComponentModel.DataAnnotations;

namespace SmartCasa.Model.Entities;

public class ExpenseRecurrence : BaseRecurrencePattern
{
    [Key]
    public int Id { get; set; }
    // Reference to the original expense this recurrence is based on
    // public int OriginalExpenseId { get; set; }
    // public Expense OriginalExpense { get; set; }

    // A collection to store the generated expenses based on this recurrence pattern
    public ICollection<Expense> Expenses { get; set; } = new List<Expense>();
}