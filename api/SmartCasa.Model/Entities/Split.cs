using System.ComponentModel.DataAnnotations;
namespace SmartCasa.Model.Entities;

public enum SplitType
{
    Amount,
    Percentage
}
public class Split()
{
    [Key]
    public int Id { get; set; }
    public decimal? Amount { get; set; }
    public decimal? Percentage { get; set; }
    public SplitType Type { get; set; }
    public int ExpenseId { get; set; }
    public Expense Expense { get; set; }
    public int MemberId { get; set; }
    public Member Member { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();

    public bool IsPaid => Transactions.Sum(t => t.Amount) >= Amount;
}