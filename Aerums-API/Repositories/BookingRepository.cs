using Aerums_API.Data;
using Aerums_API.Interfaces;
using Aerums_API.Models;
using Aerums_API.ViewModels.BookingViewModels;

namespace Aerums_API.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly AerumsContext _context;

        public BookingRepository(AerumsContext context)
        {
            _context = context;
        }

        public List<BookingViewModel> ListAllBookings()
        {
            List<BookingModel> allBookings = _context.BookingModel!.ToList();
            List<BookingViewModel> booked = new List<BookingViewModel>();
            BookingViewModel newBooking = new BookingViewModel();

            foreach(var booking in allBookings){

                newBooking = new BookingViewModel
                {
                    Place = booking.Place
                };

                booked.Add(newBooking);
            }

            return booked;
        }
    }
}