using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ExpenseUpdateDto
    {
        [Required]
        public DateTime Date { get; set; } = DateTime.Now;
        public string Description { get; set; }
    }
}