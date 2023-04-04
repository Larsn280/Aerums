using Aerums_API.Models;
using Aerums_API.ViewModels.BookingViewModels;

namespace Aerums_API.Interfaces {
    public interface IBookingRepository {
        public Task<List<BookingViewModel>> ListAllBookingsAsync ();

        public Task<BookingViewModel> GetBookingByIdAsync (int id);

        public Task DeleteBooking (int id);

        public Task<bool> SaveAllAsync();

    }
}