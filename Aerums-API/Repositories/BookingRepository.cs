using Aerums_API.Data;
using Aerums_API.Interfaces;
using Aerums_API.Models;
using Aerums_API.ViewModels.BookingViewModels;
using Microsoft.EntityFrameworkCore;

namespace Aerums_API.Repositories {
    public class BookingRepository : IBookingRepository {
        private readonly AerumsContext _context;

        public BookingRepository (AerumsContext context) {
            _context = context;
        }

        public async Task<BookingViewModel> GetBookingByIdAsync (int id) {
            var selectedBooking = await _context.BookingModel!.FindAsync (id);

            BookingViewModel booking = new BookingViewModel ();

            if (selectedBooking != null) {
                booking.Date = selectedBooking.Date;
                booking.StartTime = selectedBooking.StartTime;
                booking.EndTime = selectedBooking.EndTime;
                booking.IsConfirmed = selectedBooking.IsConfirmed;
                booking.Place = selectedBooking.Place;
                booking.Note = selectedBooking.Note;

                return booking;
            }
            return null!;
        }

        public async Task<List<BookingViewModel>> ListAllBookingsAsync () {
            List<BookingModel> allBookings = await _context.BookingModel!.ToListAsync ();
            List<BookingViewModel> booked = new List<BookingViewModel> ();
            BookingViewModel newBooking = new BookingViewModel ();

            foreach (var booking in allBookings) {

                newBooking = new BookingViewModel {
                    Date = booking.Date,
                    StartTime = booking.StartTime,
                    EndTime = booking.EndTime,
                    IsConfirmed = booking.IsConfirmed,
                    Place = booking.Place,
                    Note = booking.Note
                };

                booked.Add (newBooking);
            }

            return booked;
        }

        public async Task DeleteBooking (int id) {
            try {

            var selectedBooking = await _context.BookingModel!.FindAsync (id);

            if(selectedBooking is null) {
                throw new Exception($"Kundum int fin andar: {id}");
            }

            if(selectedBooking is not null) {
                _context.BookingModel.Remove(selectedBooking);
            }
            _context.BookingModel.Remove (selectedBooking!);
            } catch {
                throw new Exception($"Kundum Int fin andar: {id}");
            }
            
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}