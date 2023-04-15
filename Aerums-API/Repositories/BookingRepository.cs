using Aerums_API.Data;
using Aerums_API.Interfaces;
using Aerums_API.Models;
using Aerums_API.ViewModels.BookingViewModels;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Aerums_API.Repositories {
    public class BookingRepository : IBookingRepository {
        private readonly AerumsContext _context;
        private readonly IMapper _mapper;

        public BookingRepository(AerumsContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<BookingViewModel?> GetBookingAsync(string place)
        {
            return await _context.BookingModel.Where(c => c.Place.ToLower() == place.ToLower())
            .ProjectTo<BookingViewModel>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<BookingViewModel> GetBookingByIdAsync(int id)
        {
            var selectedBooking = await _context.BookingModel!.FindAsync(id);

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
                    BookingsId = booking.BookingsId,
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

        public async Task AddBookingAsync(PostBookingsViewModel model){
            try {
                var bookingToAdd = _mapper.Map<BookingModel>(model);

                await _context.BookingModel!.AddAsync(bookingToAdd); 
            } catch {
                throw new Exception($"Kundum Int leg til an dar: {model}");
            }
        }

        public async Task EditBookingAsync(int bookingsId, PostBookingsViewModel model){

           try { 
            var booking = await _context.BookingModel!.FindAsync(bookingsId);

            if(booking == null)
            {
                throw new Exception($"Kundum Int fin andar gamtfiskn: {bookingsId}");
            }

            booking.Date = model.Date;
            booking.StartTime = model.StartTime;
            booking.EndTime = model.EndTime;
            booking.Place = booking.Place;
            booking.Note = booking.Note;

            _context.BookingModel.Update(booking);
            } catch {
                throw new Exception($"Kundum Int fin andar gamtfiskn: {bookingsId}");
            }
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