using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IExpenseRepository
    {
        void Update(int id);
        void Delete(int id);

        void Add(Expense expense);
        
        Task<PagedList<Expense>> GetExpensesByUserAsync(string username, ExpenseParams expenseParams);
        Task<Expense> GetExpenseByIdAsync(int id);
    }
}