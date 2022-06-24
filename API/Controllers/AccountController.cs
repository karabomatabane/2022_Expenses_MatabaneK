using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        //private readonly DataContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<IdentityUser> userManager, 
            SignInManager<IdentityUser> signInManager, ITokenService tokenService, IMapper mapper)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var userexists = await UserExists(registerDto.UserName, registerDto.Email);
            if (userexists.Result) return BadRequest(userexists.Message);

            var user = _mapper.Map<IdentityUser>(registerDto);

            user.UserName = registerDto.UserName.ToLower();

            user.Email = registerDto.Email.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user == null) return Unauthorized("Invalid username");
            var result = await _signInManager
            .CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<ValidationResponse> UserExists(string username, string email)
        {
            bool uniqueUserName = await _userManager.FindByNameAsync(username.ToLower()) == null;
            bool uniqueEmail = await _userManager.FindByEmailAsync(email.ToLower()) == null;
            return new ValidationResponse()
            {
                Result = !uniqueUserName || !uniqueEmail,
                Message = !uniqueUserName ? "Username is already taken" : !uniqueEmail ? "Email is already taken" : ""
            };
        }

        // private async Task<bool> PasswordExists(string username, string email)
        // {
        //     return await _userManager.getu
        // }
        
    }

    public class ValidationResponse
    {
        public bool Result { get; set; }
        public string Message { get; set; }
    }
}