using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
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

        public async Task<PagedList<Expense>> GetExpensesByUserAsync(string username, ExpenseParams expenseParams)
        {
            var query = _context.Expenses.Where(e => e.UserName == username).AsNoTracking();

            var minDate = DateTime.Today.AddMonths(-1);
            if (expenseParams.Filter)
            {
                query = query.Where(e => DateTime.Compare(e.Date, minDate) > 0);
            }
            return await PagedList<Expense>.CreateAsync(query, expenseParams.PageNumber, expenseParams.PageSize);
        }

        public void Update(int id)
        {
            var expense = _context.Expenses.FirstOrDefault(e => e.Id == id);
            if (expense != null)
            {
                _context.Entry(expense).State = EntityState.Modified;
            }
        }
    }
}