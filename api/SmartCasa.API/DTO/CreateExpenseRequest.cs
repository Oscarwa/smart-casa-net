namespace SmartCasa.API.DTO;

public class CreateExpenseRequest
{
    public required DateTime Date { get; set; }
    public required string Description { get; set; }
    public required decimal Amount { get; set; }
    public string Category { get; set; }
}
