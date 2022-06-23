using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Expense
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        [Required]
        public DateTime Date { get; set; } = DateTime.Now;
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Amount { get; set; }
        public string UserName { get; set; }
    }
}