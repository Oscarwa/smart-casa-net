namespace SmartCasa.API.DTO;

public class CreateSplitRequest
{
    public required string Type { get; set; }
    public decimal? Amount { get; set; }
    public decimal? Percentage { get; set; }
}
