using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
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
        private readonly IExpenseRepository _expenseRepository;
        private readonly IMapper _mapper;
        public ExpensesController(IExpenseRepository expenseRepository, IMapper mapper)
        {
            _mapper = mapper;
            _expenseRepository = expenseRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseDto>>> GetExpenses()
        {
            var username = User.GetUserName();

            var expenses = await _expenseRepository.GetExpensesByUserAsync(username);

            var expensesToReturn = _mapper.Map<IEnumerable<ExpenseDto>>(expenses);

            return Ok(expensesToReturn);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExpenseDto>> GetExpense(int id)
        {
            var expense = await _expenseRepository.GetExpenseByIdAsync(id);

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
                Description = _expense.Description
            };

            _expenseRepository.Add(expense);

            if (await _expenseRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to add expense.");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, ExpenseUpdateDto expenseUpdateDto)
        {
            var username = User.GetUserName();
            var expense = await _expenseRepository.GetExpenseByIdAsync(id);

            _mapper.Map(expenseUpdateDto, expense);

            _expenseRepository.Update(expense.Id);

            if (await _expenseRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update the expense.");
           
        }

        // [HttpPut("{id}")]
        // public async Task<ActionResult> UpdateDescription(int id, string description)
        // {
        //     var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //     var expense = await _expenseRepository.GetExpenseByIdAsync(id);

        //     expense.Description = description;

        //     _expenseRepository.UpdateDescription(expense.Id);

        //     if (await _expenseRepository.SaveAllAsync()) return NoContent();

        //     return BadRequest("Failed to update the description.");
           
        // }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var expense = await _expenseRepository.GetExpenseByIdAsync(id);

            _expenseRepository.Delete(expense.Id);

            if (await _expenseRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to delete the expense.");           
        }
    }
}