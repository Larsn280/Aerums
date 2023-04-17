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

        public FreeTimeRepository(AerumsContext context)
        {
            _context = context;
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

                return freeTime;
            }

            return null!;
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
        public async Task AddNewFreeTime(FreeTimeViewModel input)
        {
            var newFreeTime = new FreeTimeModel
            {
                Date = input.Date,
                StartTime = input.StartTime,
                EndTime = input.EndTime,
                Place = input.Place,
                Note = input.Note,
            };
            await _context.AddRangeAsync(newFreeTime);
            await _context.SaveChangesAsync();
        }
        public async Task EditFreeTime(FreeTimeViewModel input, int id)
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
