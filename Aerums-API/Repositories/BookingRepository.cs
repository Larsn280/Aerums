using Aerums_API.Data;
using Aerums_API.Interfaces;
using Aerums_API.Models;
using Aerums_API.ViewModels.BookingViewModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Aerums_API.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly AerumsContext _context;
        private readonly IMapper _mapper;

        public BookingRepository(AerumsContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<BookingViewModel> GetBookingByIdAsync(int id)
        {
            var selectedBooking = await _context.BookingModel!.FindAsync(id);

            BookingViewModel booking = new BookingViewModel();

            if(selectedBooking != null) {
                booking.Date = selectedBooking.Date;
                booking.StartTime = selectedBooking.StartTime;
                booking.EndTime = selectedBooking.EndTime;
                booking.IsConfirmedHostingUser = selectedBooking.IsConfirmedHostingUser;
                booking.IsConfirmedAttendingUser = selectedBooking.IsConfirmedAttendingUser;
                booking.Place = selectedBooking.Place;
                booking.Note = selectedBooking.Note;

                return booking;
            }
            return null!;
        }

        public async Task<List<BookingViewModel>> ListAllBookingsAsync()
        {
            List<BookingModel> allBookings = await _context.BookingModel!.ToListAsync();
            List<BookingViewModel> booked = new List<BookingViewModel>();
            BookingViewModel newBooking = new BookingViewModel();

            foreach(var booking in allBookings){

                newBooking = new BookingViewModel
                {
                    Date = booking.Date,
                    StartTime = booking.StartTime,
                    EndTime = booking.EndTime,
                    IsConfirmedHostingUser = booking.IsConfirmedHostingUser,
                    IsConfirmedAttendingUser = booking.IsConfirmedAttendingUser,
                    Place = booking.Place,
                    Note = booking.Note
                };

                booked.Add(newBooking);
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
    }
}