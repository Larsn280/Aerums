using Aerums_API.Models;
using Aerums_API.ViewModels.BookingViewModels;

namespace Aerums_API.Interfaces
{
    public interface IBookingRepository
    {
        public Task<List<BookingViewModel>> ListAllBookingsAsync();
        public Task<BookingViewModel> GetBookingByIdAsync(int id);
        public Task<BookingViewModel?> GetBookingAsync(string place);
        public Task<List<BookingViewModel>> ListAllThisUsersBookingsAsync(string userName);
        public Task AddBookingAsync(PostBookingsViewModel model);
        public Task EditBookingAsync(int bookingsId, PostBookingsViewModel model);
        public Task DeleteBooking(int id);
        public Task<bool> SaveAllAsync();
    }
}