using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly DataContext _context;
        public ExpenseRepository(DataContext context)
        {
            _context = context;
        }

        public void Add(Expense expense)
        {
            if (expense != null)
            {
                _context.Expenses.Add(expense);
            }
        }

        public void Delete(int id)
        {
            var expense = _context.Expenses.FirstOrDefault(e => e.Id == id);
            if (expense != null)
            {
                _context.Expenses.Remove(expense);
            }
        }

        public async Task<Expense> GetExpenseByIdAsync(int id)
        {
            return await _context.Expenses.FindAsync(id);
        }

        public async Task<IEnumerable<Expense>> GetExpensesAsync()
        {
            return await _context.Expenses.ToListAsync();
        }

        public async Task<IEnumerable<Expense>> GetExpensesByUserAsync(string username)
        {
            return await _context.Expenses.Where(e => e.UserName == username).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(int id)
        {
            var expense = _context.Expenses.FirstOrDefault(e => e.Id == id);
            if (expense != null)
            {
                _context.Entry(expense).State = EntityState.Modified;
            }
        }

        public void UpdateDescription(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}