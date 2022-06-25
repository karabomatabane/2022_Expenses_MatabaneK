using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class ExpensesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ExpensesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseDto>>> GetExpenses([FromQuery] ExpenseParams expenseParams)
        {
            var username = User.GetUserName();

            var expenses = await _unitOfWork.ExpenseRepository.GetExpensesByUserAsync(username, expenseParams);

            var expensesToReturn = _mapper.Map<IEnumerable<ExpenseDto>>(expenses);

            Response.AddPaginationHeader(expenses.CurrentPage, expenses.PageSize,
                expenses.TotalCount, expenses.TotalPages);

            return Ok(expensesToReturn);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExpenseDto>> GetExpense(int id)
        {
            var expense = await _unitOfWork.ExpenseRepository.GetExpenseByIdAsync(id);

            return _mapper.Map<ExpenseDto>(expense);
        }

        [HttpPost]
        public async Task<ActionResult> Add(Expense _expense)
        {
            var username = User.GetUserName();
            var expense = new Expense()
            {
                Date = _expense.Date,
                UserName = username,
                Description = _expense.Description,
                Amount = _expense.Amount
            };

            _unitOfWork.ExpenseRepository.Add(expense);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to add expense.");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, ExpenseUpdateDto expenseUpdateDto)
        {
            var username = User.GetUserName();
            var expense = await _unitOfWork.ExpenseRepository.GetExpenseByIdAsync(id);

            _mapper.Map(expenseUpdateDto, expense);

            _unitOfWork.ExpenseRepository.Update(expense.Id);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update the expense.");

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var expense = await _unitOfWork.ExpenseRepository.GetExpenseByIdAsync(id);

            _unitOfWork.ExpenseRepository.Delete(expense.Id);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to delete the expense.");
        }
    }
}