using SmartCasa.Model.Entities;

namespace SmartCasa.Services.DTO
{
    public static class HomeMappingExtensions
    {
        public static HomeDTO ToDto(this Home entity)
        {
            return new HomeDTO
            {
                Id = entity.Id,
                Name = entity.Name,
                Members = entity.Members?.ToDto()
            };
        }

        public static Home ToEntity(this HomeDTO dto)
        {
            return new Home
            {
                Id = dto.Id,
                Name = dto.Name,
            };
        }
    }
}