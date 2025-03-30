using System.ComponentModel.DataAnnotations;

namespace SmartCasa.Model.Entities;

public class Transaction
{
    [Key]
    public int Id { get; set; }
    public int ExpenseId { get; set; }
    public Expense Expense { get; set; }
    public int DebitAccountId { get; set; }
    public Account DebitAccount { get; set; }
    public int CreditAccountId { get; set; }
    public Account CreditAccount { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}