using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Expense, ExpenseDto>();
            CreateMap<RegisterDto, IdentityUser>();
            CreateMap<ExpenseUpdateDto, Expense>();
        }
    }
}