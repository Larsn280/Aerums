using Aerums_API.Models;
using Aerums_API.ViewModels.FreeTimeViewModels;
namespace Aerums_API.Interfaces
{
    public interface IFreeTimeRepository
    {
        Task<List<FreeTimeViewModel>> ListAllFreeTimesAsync();
        Task<FreeTimeViewModel> GetFreeTimeByIdAsync(int id);
        Task DeleteFreeTime(int id);
        Task AddNewFreeTime(FreeTimeViewModel input);
        Task EditFreeTime(FreeTimeViewModel input, int id);
    }
}

