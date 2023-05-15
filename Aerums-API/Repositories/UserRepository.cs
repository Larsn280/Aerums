using Aerums_API.ViewModels.UserViewModels;
using Aerums_API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Aerums_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Aerums_API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserRepository(UserManager<ApplicationUser> userManager) {
            _userManager = userManager;
        }

        public async Task<DisplayUserViewModel> GetLoggedInUserByUserNameAsync(string userName)
        {
            var user = await _userManager.FindByEmailAsync(userName);
            DisplayUserViewModel loggedInUser = new DisplayUserViewModel();

            if(user != null) {
                loggedInUser.UserName = user.UserName;
                loggedInUser.FirstName = user.FirstName;
                loggedInUser.LastName = user.LastName;
            }

            return loggedInUser;
        }

        public async Task<List<DisplayUserViewModel>> ListAllUsersAsync() {

            List<DisplayUserViewModel> allUsers = new List<DisplayUserViewModel>();
            DisplayUserViewModel newUser = new DisplayUserViewModel();

            var result = await _userManager.Users.ToListAsync();

            foreach(var user in result) {
                newUser = new DisplayUserViewModel {
                    UserName = $"{user.FirstName} {user.LastName}"
                };

                allUsers.Add(newUser);
            }
            
            return allUsers;
        }
    }
}