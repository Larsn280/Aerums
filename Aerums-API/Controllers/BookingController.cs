using Aerums_API.Interfaces;
using Aerums_API.ViewModels.BookingViewModels;
using Microsoft.AspNetCore.Mvc;


namespace Aerums_API.Controllers
{
    [ApiController]
    [Route("api/v1/booking")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepo;

        public BookingController(IBookingRepository bookingRepo)
        {
            _bookingRepo = bookingRepo;
        }

        [HttpGet("list")]
        public async Task<ActionResult<List<BookingViewModel>>> ListAllBookings()
        {
            return Ok(await _bookingRepo.ListAllBookingsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingViewModel>> GetBookingById(int id) {

            var response = await _bookingRepo.GetBookingByIdAsync(id);

            if(response is null)
                return NotFound($"Kundum int fin andar gamtfiskn med id: {id}");
                return Ok(response);
            
        }
    }
}