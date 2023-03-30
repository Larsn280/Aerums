using Aerums_API.Data;
using Aerums_API.Interfaces;
using Aerums_API.Models;
using Aerums_API.ViewModels.BookingViewModels;
using Microsoft.EntityFrameworkCore;

namespace Aerums_API.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly AerumsContext _context;

        public BookingRepository(AerumsContext context)
        {
            _context = context;
        }

        public async Task<List<BookingViewModel>> ListAllBookings()
        {
            List<BookingModel> allBookings = await _context.BookingModel!.ToListAsync();
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