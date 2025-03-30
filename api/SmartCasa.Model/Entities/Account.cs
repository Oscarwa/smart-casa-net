using System.ComponentModel.DataAnnotations;

namespace SmartCasa.Model.Entities;

public class Account
{
    [Key]
    public int Id { get; set; }
    public Home? Home { get; set; }
    public Member? Member { get; set; }
    public decimal OpeningBalance { get; set; } = 0;
    // public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();


    // public decimal Balance => OpeningBalance + Transactions.Sum(t =>
    //     t.DebitAccountId == Id ? -t.Amount : t.Amount);
}