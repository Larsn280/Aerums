using Aerums_API.Interfaces;
using Aerums_API.Models;
using Aerums_API.ViewModels;
using Aerums_API.ViewModels.FriendViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Aerums_API.Controllers
{
    [ApiController]
    [Route("api/v1/friends")]
    public class FriendController : ControllerBase
    {
        private readonly IFriendRepository _friendRepo;

        public FriendController(IFriendRepository friendRepo) {
            _friendRepo = friendRepo;
        }
        
        [HttpGet ("list")]
        public async Task<ActionResult<List<FriendViewModel>>> ListAllFriends () {
            return Ok (await _friendRepo.ListAllFriendsAsync ());
        }

        [HttpPost()]
        public async Task<ActionResult> AddFriend(PostFriendViewModel model) {
            try {
                await _friendRepo.AddFriendAsync(model);

                if (await _friendRepo.SaveAllAsync())
                {
                return StatusCode(201);
                }

                return StatusCode(500, "Det gick inte att lägga till kompisen");

            } catch {
                return StatusCode(500);
            }
        }
    }
}