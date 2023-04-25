
using Aerums_API.ViewModels.UserViewModels;

namespace Aerums_API.Interfaces
{
    public interface IUserRepository
    {
        public Task<List<DisplayUserViewModel>> ListAllUsersAsync();
    }
}