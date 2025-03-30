using SmartCasa.Model.Entities;
using SmartCasa.Services.DTO;

namespace SmartCasa.Services.Interfaces
{
    public interface IExpenseService : IModelService<Expense, ExpenseDTO>
    {
        // Task<BudgetEntryDTO?> Create(BudgetEntryDTO entry, int budgetId);

        // Task<BudgetEntryDTO?> Update(BudgetEntryDTO entry, int budgetId);

        // Task<bool> DeleteBudgetEntry(int id, int userId);
    }
}
