// using API.Data;
// using Microsoft.AspNetCore.Builder;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.DependencyInjection;
// using System.Collections.Generic;
// using System.Linq;

// namespace ConferenceManager.Data
// {
//     public class UserModel
//     {
//         public string Username { get; set; }
//     }

//     public static class SeedIdentityData
//     {

//         private static readonly List<UserModel> SeedUsers = new List<UserModel>
//         {
//            new UserModel {Username = "mary"},
//            new UserModel {Username = "john"},
//            new UserModel {Username = "thabo"},
//         };

//         public static async void EnsurePopulated(IApplicationBuilder app)
//         {
//            DataContext context = app.ApplicationServices
//                 .CreateScope().ServiceProvider
//                 .GetRequiredService<DataContext>();

//             if (context.Database.GetPendingMigrations().Any())
//             {
//                 context.Database.Migrate();
//             }

//             UserManager<IdentityUser> userManager = app.ApplicationServices
//                 .CreateScope().ServiceProvider
//                 .GetRequiredService<UserManager<IdentityUser>>();
//             int x = 0;
//             foreach (var user in SeedUsers)
//             {
//                 if (await userManager.FindByNameAsync(user.Username) == null)
//                 {
//                     IdentityUser _user = new IdentityUser
//                     {
//                         UserName = user.Username,
//                         Email = $"{user.Username}@ufs.ac.za"
//                     };

//                     IdentityResult result = await userManager.CreateAsync(_user, $"{user.Username}@{x}");
//                     x++;
//                 }
//             }
//         }
//     }
// }
