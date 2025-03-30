namespace SmartCasa.Services.Interfaces
{
    public interface IModelService<T, TDto>
    {
        Task<TDto?> Create(TDto entry, int userId);

        Task<TDto?> Update(TDto entry, int userId);

        Task<bool> Delete(int id, int userId);

        TDto? Get(int id, int userId);

        IQueryable<TDto> All(int userId);
    }

}