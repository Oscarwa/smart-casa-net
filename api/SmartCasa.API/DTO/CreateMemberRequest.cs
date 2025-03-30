namespace SmartCasa.API.DTO;

public class CreateMemberRequest
{
    public required string DisplayName { get; set; }
    public required string Role { get; set; }
}
