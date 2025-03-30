using SmartCasa.Model.Entities;

namespace SmartCasa.Services.DTO
{
    public static class MemberMappingExtensions
    {
        public static MemberDTO ToDto(this Member entity)
        {
            return new MemberDTO
            {
                Id = entity.Id,
                DisplayName = entity.DisplayName,
                Role = entity.Role.ToString(),
            };
        }

        public static IEnumerable<MemberDTO> ToDto(this IEnumerable<Member> entities)
        {
            return entities.Select(e => e.ToDto());
        }

        public static Member ToEntity(this MemberDTO dto)
        {
            return new Member
            {
                Id = dto.Id,
                DisplayName = dto.DisplayName,
                Role = dto.Role.ToMemberRole(),
            };
        }

        public static MemberRole ToMemberRole(this string role)
        {
            return Enum.TryParse<MemberRole>(role, out var memberRole) ? memberRole : MemberRole.Regular;
        }
    }
}