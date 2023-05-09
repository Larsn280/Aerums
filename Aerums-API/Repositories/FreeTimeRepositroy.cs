using Aerums_API.Data;
using Aerums_API.Interfaces;
using Aerums_API.Models;
using Aerums_API.ViewModels.FreeTimeViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Aerums_API.Repositories
{
    public class FreeTimeRepository : IFreeTimeRepository
    {
        private readonly AerumsContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public FreeTimeRepository(AerumsContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<List<FreeTimeViewModel>> ListAllFreeTimesAsync()
        {
            List<FreeTimeModel> allFreeTimes = await _context.FreeTimeModel!.ToListAsync();
            List<FreeTimeViewModel> freeTimers = new List<FreeTimeViewModel>();
            var newFreeTime = new FreeTimeViewModel();

            foreach (var freeTime in allFreeTimes)
            {

                newFreeTime = new FreeTimeViewModel
                {
                    FreeTimeId = freeTime.FreeTimeId,
                    Date = freeTime.Date,
                    StartTime = freeTime.StartTime,
                    EndTime = freeTime.EndTime,
                    Place = freeTime.Place,
                    Note = freeTime.Note,
                    UserName = freeTime.ApplicationUsers.UserName
                };

                freeTimers.Add(newFreeTime);
            }

            return freeTimers;
        }
        public async Task<FreeTimeViewModel> GetFreeTimeByIdAsync(int id)
        {
            var selectedFreeTime = await _context.FreeTimeModel!.FindAsync(id);

            FreeTimeViewModel freeTime = new FreeTimeViewModel();

            if (selectedFreeTime != null)
            {
                freeTime.FreeTimeId = selectedFreeTime.FreeTimeId;
                freeTime.Date = selectedFreeTime.Date;
                freeTime.StartTime = selectedFreeTime.StartTime;
                freeTime.EndTime = selectedFreeTime.EndTime;
                freeTime.Note = selectedFreeTime.Note;
                freeTime.Place = selectedFreeTime.Place;
                freeTime.UserName = selectedFreeTime.ApplicationUsers.UserName;

                return freeTime;
            }

            return null!;
        }

        public async Task<List<FreeTimeViewModel>> ListAllThisUsersFreetimeAsync(string userName)
        {
            List<FreeTimeViewModel> myFreetimes = new List<FreeTimeViewModel>();
            FreeTimeViewModel foundFreetimes = new FreeTimeViewModel();
            var user = await _userManager.FindByEmailAsync(userName);
            if (user != null)
            {
                var allFreetimes = _context.FreeTimeModel!.Where(u => u.ApplicationUsers.UserName == userName).ToList();
                foreach (var freeTimes in allFreetimes)
                {
                    foundFreetimes = new FreeTimeViewModel
                    {
                        FreeTimeId = freeTimes.FreeTimeId,
                        Date = freeTimes.Date,
                        StartTime = freeTimes.StartTime,
                        EndTime = freeTimes.EndTime,
                        Place = freeTimes.Place,
                        Note = freeTimes.Note,
                        UserName = freeTimes.ApplicationUsers.UserName
                    };
                    myFreetimes.Add(foundFreetimes);
                }
                return myFreetimes;
            }
            return null;
        }
        public async Task DeleteFreeTime(int id)
        {

            var selectedFreeTime = await _context.FreeTimeModel!.FindAsync(id);
            if (selectedFreeTime == null)
            {

            }
            if (selectedFreeTime != null)
            {
                _context.FreeTimeModel.Remove(selectedFreeTime);
                await _context.SaveChangesAsync();
            }
        }
        public async Task AddNewFreeTime(PostFreeTimeViewModel input)
        {
            FreeTimeModel newFreeTime = new FreeTimeModel();
            var user = await _userManager.FindByEmailAsync(input.UserName!);

            if (user != null)
            {
                newFreeTime.Date = input.Date;
                newFreeTime.StartTime = input.StartTime;
                newFreeTime.EndTime = input.EndTime;
                newFreeTime.Place = input.Place;
                newFreeTime.Note = input.Note;
                newFreeTime.ApplicationUsers = user;
                await _context.FreeTimeModel!.AddAsync(newFreeTime);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception($"No user with email: "+input.UserName+" could be found"); 
            }
            
            // await _context.AddRangeAsync(newFreeTime);
            // await _context.SaveChangesAsync();
        }
        public async Task EditFreeTime(PostFreeTimeViewModel input, int id)
        {
            var selectedFreeTime = await _context.FreeTimeModel!.FindAsync(id);
            var editedFreeTime = new FreeTimeModel
            {
                Date = input.Date,
                StartTime = input.StartTime,
                EndTime = input.EndTime,
                Note = input.Note,
                Place = input.Place
            };
            _context.FreeTimeModel.UpdateRange(editedFreeTime);
            await _context.SaveChangesAsync();
        }

    }
}
