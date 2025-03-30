using SmartCasa.Model.Entities;

namespace SmartCasa.Services.DTO;

public class ExpenseDTO
{
    public int Id { get; set; }
    public required string Description { get; set; }
    public required decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public string Category { get; set; }
    public IEnumerable<SplitDTO> Splits { get; set; }
}

public class SplitDTO
{
    public int Id { get; set; }
    public string Type { get; set; }
    public decimal? Amount { get; set; }
    public decimal? Percentage { get; set; }
    public MemberDTO Member { get; set; }
    // public IEnumerable<TransactionDTO> Transactions { get; set; }
}



