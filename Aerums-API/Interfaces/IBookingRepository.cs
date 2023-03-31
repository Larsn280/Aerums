
using Aerums_API.ViewModels.BookingViewModels;

namespace Aerums_API.Interfaces
{
    public interface IBookingRepository
    {
        public Task<List<BookingViewModel>> ListAllBookingsAsync();
    }
}