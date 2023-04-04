
namespace Aerums_API.ViewModels.BookingViewModels
{
    public class PostBookingsViewModel
    {
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? Place { get; set; }
        public string? Note {get; set;}
    }
}