using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IExpenseRepository
    {
        void Update(int id);
        void Delete(int id);

        void Add(Expense expense);
        void UpdateDescription(int id);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Expense>> GetExpensesAsync();
        Task<IEnumerable<Expense>> GetExpensesByUserAsync(string username);
        Task<Expense> GetExpenseByIdAsync(int id);
    }
}