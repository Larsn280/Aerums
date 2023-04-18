
using Aerums_API.Data;
using Aerums_API.Interfaces;
using Aerums_API.Models;
using Aerums_API.ViewModels.FriendViewModels;
using Microsoft.AspNetCore.Identity;

namespace Aerums_API.Repositories
{
    public class FriendRepository : IFriendRepository {
        private readonly AerumsContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public FriendRepository(AerumsContext context, UserManager<ApplicationUser> userManager) 
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<List<FriendViewModel>> ListAllFriendsAsync() {
            throw new Exception("Nej");
        }

        public async Task AddFriendAsync(PostFriendViewModel model)
        {
            try {
                FriendModel friendToAdd = new FriendModel();
                friendToAdd.UserId = model.UserId;
                friendToAdd.FriendId = model.FriendId;

                await _context.FriendModel!.AddAsync(friendToAdd);
            } catch {
                throw new Exception($"We could not add: {model}");
            }
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}