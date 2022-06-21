using System;

namespace API.DTOs
{
    public class ExpenseDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string Description { get; set; }
    }
}