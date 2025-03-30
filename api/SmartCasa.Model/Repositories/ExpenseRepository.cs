using SmartCasa.Model.Entities;
using SmartCasa.Model.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace SmartCasa.Model.Repositories
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly CoreContext _context;
        public ExpenseRepository(CoreContext context)
        {
            _context = context;
        }

        public IQueryable<Expense> GetHomeExpenses(int homeId)
        {
            return _context.Expenses
                .Include(e => e.Splits)
                .Where(e => e.HomeId == homeId)
                .AsQueryable();
        }
    }
}