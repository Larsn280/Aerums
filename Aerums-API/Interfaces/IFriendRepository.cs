
using Aerums_API.ViewModels.FriendViewModels;

namespace Aerums_API.Interfaces
{
    public interface IFriendRepository
    {
        public Task<List<FriendViewModel>> ListAllFriendsAsync(string userId);
        public Task AddFriendAsync(PostFriendViewModel model);
        public Task RemoveFriendAsync(DeleteFriendViewModel model);
        public Task<bool> SaveAllAsync();
    }
}