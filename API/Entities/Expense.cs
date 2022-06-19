using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Expenses")]
    public class Expense
    {
        public int Id { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string Description { get; set; }
        public string UserName { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId {get; set; }
    }
}