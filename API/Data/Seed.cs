using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedExpenses(DataContext context)
        {
            if (await context.Expenses.AnyAsync()) return;
            
            var expenseData = await System.IO.File.ReadAllTextAsync("Data/ExpenseSeedData.json");
            var expenses = JsonSerializer.Deserialize<List<Expense>>(expenseData);
            var expenseDataThabo = await System.IO.File.ReadAllTextAsync("Data/ExpenseSeedDataThabo.json");
            var expensesThabo = JsonSerializer.Deserialize<List<Expense>>(expenseDataThabo);
            foreach (var expense in expenses)
            {
                expense.UserName = "chris";
                context.Add(expense);
            }
            foreach (var expense in expensesThabo)
            {
                expense.UserName = "thabo";
                context.Add(expense);
            }
            await context.SaveChangesAsync();
        }

        public static async Task SeedUsers(UserManager<IdentityUser> userManager)
        {
            if (await userManager.Users.AnyAsync()) return;
            
            for (int i = 0; i < Users.Count(); i++)
                {
                    var user = Users[i];
                    if (await userManager.FindByNameAsync(user.UserName) == null)
                    {
                        IdentityUser _user = new IdentityUser
                        {
                            UserName = user.UserName,
                            Email = $"{user.UserName}@test.com"
                        };

                        await userManager.CreateAsync(_user, $"{user.UserName}@P{i}");
                    }
                }
        }

        private static readonly List<IdentityUser> Users = new List<IdentityUser>
        {
           new IdentityUser {UserName = "chris"},
           new IdentityUser {UserName = "lerato"},
           new IdentityUser {UserName = "thabo"},
        };

        // public static async void EnsurePopulated(IApplicationBuilder app)
        // {
        //    DataContext context = app.ApplicationServices
        //         .CreateScope().ServiceProvider
        //         .GetRequiredService<DataContext>();

        //     if (context.Database.GetPendingMigrations().Any())
        //     {
        //         context.Database.Migrate();
        //     }

        //     UserManager<IdentityUser> userManager = app.ApplicationServices
        //         .CreateScope().ServiceProvider
        //         .GetRequiredService<UserManager<IdentityUser>>();
            
        //     for (int i = 0; i < SeedUsers.Count(); i++)
        //     {
        //         var user = SeedUsers[i];
        //         if (await userManager.FindByNameAsync(user.UserName) == null)
        //         {
        //             IdentityUser _user = new IdentityUser
        //             {
        //                 UserName = user.UserName,
        //                 Email = $"{user.UserName}@test.com"
        //             };

        //             IdentityResult result = await userManager.CreateAsync(_user, $"{user.UserName}@{i}");
        //         }
        //     }
        // }
    }
}