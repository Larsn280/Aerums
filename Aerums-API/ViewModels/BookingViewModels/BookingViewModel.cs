
namespace Aerums_API.ViewModels.BookingViewModels
{
    public class BookingViewModel
    {
        public int BookingsId { get; set; }
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsConfirmed { get; set; } = false;
        public string? Place { get; set; }
        public string? Note { get; set; }
        public string UserName { get; set; }
    }
}