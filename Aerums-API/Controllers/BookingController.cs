using Aerums_API.Interfaces;
using Aerums_API.Models;
using Aerums_API.ViewModels.BookingViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Aerums_API.Controllers {
    [ApiController]
    [Route ("api/v1/booking")]
    public class BookingController : ControllerBase {
        private readonly IBookingRepository _bookingRepo;

        public BookingController (IBookingRepository bookingRepo) {
            _bookingRepo = bookingRepo;
        }

        [HttpGet ("list")]
        public async Task<ActionResult<List<BookingViewModel>>> ListAllBookings () {
            return Ok (await _bookingRepo.ListAllBookingsAsync ());
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult<BookingViewModel>> GetBookingById (int id) {

            var response = await _bookingRepo.GetBookingByIdAsync (id);

            if (response is null)
                return NotFound ($"Kundum int fin andar gamtfiskn med id: {id}");
            return Ok (response);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBooking (int id) {
            try {
            await _bookingRepo.DeleteBooking(id);

            if (await _bookingRepo.SaveAllAsync()) 
            {
                return NoContent();
            }

            return StatusCode(500, $"Kundum int ta bort andar gamtfiskn med id: {id}");

            } catch (Exception ex) {

            return StatusCode (500, ex.Message);
            }
        }
    }
}