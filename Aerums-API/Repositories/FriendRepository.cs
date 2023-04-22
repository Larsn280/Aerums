
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

        public async Task<List<FriendViewModel>> ListAllFriendsAsync(string userId) {

            List<FriendViewModel> allMyFriends = new List<FriendViewModel>();
            FriendViewModel newFriend = new FriendViewModel();

            var allFriends = _context.FriendModel!.Where(f => f.UserId == userId).ToList();

            var allFriendsData = (from f in allFriends
            join u in _userManager.Users on f.FriendId equals u.Id
            select new FriendViewModel {
                UserId = f.UserId,
                FriendId = f.FriendId,
                FriendName = $"{u.FirstName} {u.LastName}"
            }).ToList();

            
            foreach(var friend in allFriendsData) {

                newFriend = new FriendViewModel {
                    UserId = friend.UserId,
                    FriendId = friend.FriendId,
                    FriendName = friend.FriendName
                };

                allMyFriends.Add(newFriend);
            }

            return await Task.FromResult(allMyFriends);
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