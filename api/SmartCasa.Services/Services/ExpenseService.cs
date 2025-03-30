using SmartCasa.Model;
using SmartCasa.Model.Entities;
using SmartCasa.Model.Repositories.Interfaces;
using SmartCasa.Services.DTO;
using SmartCasa.Services.Interfaces;

namespace SmartCasa.Services;

public class ExpenseService : IExpenseService
{
    private readonly CoreContext _context;
    private readonly IExpenseRepository _expenseRepository;

    public ExpenseService(CoreContext context, IExpenseRepository expenseRepository)
    {
        _context = context;
        _expenseRepository = expenseRepository;
    }

    private IQueryable<ExpenseDTO> HomeExpenses(int homeId)
    {
        return _expenseRepository.GetHomeExpenses(homeId).Select(e => e.ToDto());
    }

    public IQueryable<ExpenseDTO> All(int userId)
    {
        return HomeExpenses(userId).AsQueryable();
    }

    public ExpenseDTO? Get(int id, int userId)
    {
        return HomeExpenses(userId).FirstOrDefault(e => e.Id == id);
    }

    public async Task<ExpenseDTO?> Create(ExpenseDTO entry, int homeId)
    {
        Expense newExpense = entry.ToEntity();
        var home = await _context.Homes.FindAsync(homeId);
        if (home == null)
        {
            return null;
        }

        newExpense.Home = home;

        var result = await _context.Expenses.AddAsync(newExpense);
        await _context.SaveChangesAsync();
        return result.Entity.ToDto();
    }

    public async Task<ExpenseDTO?> Update(ExpenseDTO entry, int userId)
    {
        var entryToUpdate = await _context.Expenses.FindAsync(entry.Id);
        if (entryToUpdate == null)
        {
            return null;
        }
        entryToUpdate.Description = entry.Description;
        entryToUpdate.Amount = entry.Amount;
        entryToUpdate.Date = entry.Date;
        entryToUpdate.Category = entry.Category.ToExpenseCategory();

        var result = _context.Expenses.Update(entryToUpdate);
        await _context.SaveChangesAsync();
        return result.Entity.ToDto();
    }

    public async Task<bool> Delete(int id, int userId)
    {
        var entryToDelete = await _context.Expenses.FindAsync(id);
        if (entryToDelete == null)
        {
            return false;
        }
        var result = _context.Expenses.Remove(entryToDelete);
        return await _context.SaveChangesAsync() > 0;
    }

    // # region BudgetEntries
    // public async Task<BudgetEntryDTO?> Create(BudgetEntryDTO entry, int budgetId)
    // {
    //     Expense Expense = await _context.Expenses.FindAsync(budgetId);
    //     if (Expense == null)
    //     {
    //         return null;
    //     }
    //     BudgetEntry newBudgetEntry = entry.ToEntity(budget);

    //     var result = await _context.BudgetEntries.AddAsync(newBudgetEntry);
    //     await _context.SaveChangesAsync();
    //     return result.Entity.ToDto();
    // }

    // public async Task<BudgetEntryDTO?> Update(BudgetEntryDTO entry, int budgetId)
    // {
    //     BudgetEntry toUpdateEntry = await _context.BudgetEntries.FindAsync(entry.Id);
    //     if (toUpdateEntry == null)
    //     {
    //         return null;
    //     }
    //     toUpdateEntry.Description = entry.Description;
    //     toUpdateEntry.Amount = entry.Amount;


    //     var result = _context.BudgetEntries.Update(toUpdateEntry);
    //     await _context.SaveChangesAsync();
    //     return result.Entity.ToDto();
    // }

    // public async Task<bool> DeleteBudgetEntry(int id, int userId)
    // {
    //     var toDeleteEntry = await _context.BudgetEntries.FindAsync(id);
    //     if (toDeleteEntry == null)
    //     {
    //         return false;
    //     }
    //     var result = _context.BudgetEntries.Remove(toDeleteEntry);
    //     return await _context.SaveChangesAsync() > 0;
    // }
    // # endregion 

}