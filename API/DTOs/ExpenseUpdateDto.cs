using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ExpenseUpdateDto
    {
        [Required]
        public DateTime Date { get; set; } = DateTime.Now;
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Amount { get; set; }
    }
}