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
        public ActionResult<List<BookingViewModel>> ListAllBookings()
        {
            return Ok(_bookingRepo.ListAllBookings());
        }
    }
}