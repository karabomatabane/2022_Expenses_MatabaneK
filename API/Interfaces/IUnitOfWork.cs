using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
         IExpenseRepository ExpenseRepository {get; }
         Task<bool> Complete();
         bool HasChanges();
    }
}