using Aerums_API.Interfaces;
using Aerums_API.ViewModels.UserViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Aerums_API.Controllers
{
    [ApiController]
    [Route("api/v1/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepo;

        public UserController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet()]
        public async Task<ActionResult<List<DisplayUserViewModel>>> ListAllUsers() {
            return Ok(await _userRepo.ListAllUsersAsync());
        }

        [HttpGet("{userName}")]
        public async Task <ActionResult<DisplayUserViewModel>> GetLoggedInUserByUserName(string userName) {
            return Ok(await _userRepo.GetLoggedInUserByUserNameAsync(userName));
        }
    }
}