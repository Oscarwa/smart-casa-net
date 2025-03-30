using SmartCasa.Model.Entities;

namespace SmartCasa.Model.Repositories.Interfaces;

public interface IExpenseRepository
{
    IQueryable<Expense> GetHomeExpenses(int homeId);
}