using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Aerums_API.Models;
using Aerums_API.ViewModels.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace LNSchool_API.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signManager;
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _signManager = signInManager;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserViewModel>> RegisterUser(RegisterViewModel model)
        {
            var user = new ApplicationUser
            {
                Email = model.Email!.ToLower(),
                UserName = model.Email.ToLower(),
                FirstName = model.FirstName,
                LastName = model.LastName
            };

            var result = await _userManager.CreateAsync(user, model.Password!);

            if (result.Succeeded)
            {
                await _userManager.AddClaimAsync(user, new Claim("User", "true"));
                await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Name, user.UserName));
                await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Email, user.Email));

                var userData = new UserViewModel
                {
                    UserName = user.UserName,
                    Token = await CreateJwtToken(user)
                };

                return StatusCode(201, userData);
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("User registration", error.Description);
                }
                return StatusCode(500, ModelState);
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<UserViewModel>> Login(LoginViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName!);

            if (user is null)
                return Unauthorized("Felaktigt användarnamn");

            var result = await _signManager.CheckPasswordSignInAsync(user, model.Password!, false);

            if (!result.Succeeded)
                return Unauthorized();

            var userData = new UserViewModel
            {
                UserName = user.UserName,
                Expires = DateTime.Now.AddDays(7),
                Token = await CreateJwtToken(user)
            };

            return Ok(userData);
        }

        private async Task<string> CreateJwtToken(ApplicationUser user)
        {
            var key = Convert.FromBase64String(_config.GetValue<string>("apiKey")!);
            var userClaims = (await _userManager.GetClaimsAsync(user)).ToList();

            var jwt = new JwtSecurityToken(
                claims: userClaims,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha512Signature
                )
            );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}