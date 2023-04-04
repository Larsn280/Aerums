
namespace Aerums_API.ViewModels.BookingViewModels
{
    public class BookingViewModel
    {
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsConfirmedHostingUser { get; set; } = false;
        public bool IsConfirmedAttendingUser { get; set; } = false;
        public string? Place { get; set; }
        public string? Note {get; set;}
    }
}