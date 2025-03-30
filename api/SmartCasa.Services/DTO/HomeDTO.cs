namespace SmartCasa.Services.DTO
{

    public class HomeDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<MemberDTO> Members { get; set; }
    }
}
