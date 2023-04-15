using Aerums_API.Interfaces;
using Aerums_API.ViewModels;
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

        [HttpPost()]
        public async Task<ActionResult> AddBooking(PostBookingsViewModel model)
        {
            try
            {
                if (await _bookingRepo.GetBookingAsync(model.Place!) is not null)
                {
                var error = new ErrorViewModel{
                    StatusCode = 400,
                    StatusText = $"Place {model.Place} already exists..."
                };
                
                return BadRequest(error);
                }

                await _bookingRepo.AddBookingAsync(model);

                if (await _bookingRepo.SaveAllAsync())
                {
                return StatusCode(201);
                }

                return StatusCode(500, "Could not save booking...");
            }
            catch (Exception ex)
            {
                var error = new ErrorViewModel{
                    StatusCode = 500,
                    StatusText = ex.Message
                };
                return StatusCode(500, error);
            }
        }

        [HttpPut("{bookingsId}")]
        public async Task<ActionResult> EditBooking(int bookingsId, PostBookingsViewModel model)
        {
            try
            {
            await _bookingRepo.EditBookingAsync(bookingsId, model);

            if(await _bookingRepo.SaveAllAsync())
            {
                return NoContent();
            }

            return StatusCode(500, "Ed wat fil mes uldum djäro edar");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}