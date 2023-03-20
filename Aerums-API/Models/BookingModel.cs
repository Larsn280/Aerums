using System.ComponentModel.DataAnnotations;
namespace Aerums_API.Models
{
    public class BookingModel
    {
        public int BookingsId { get; set; }
        public DateTime Date { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public bool IsConfirmedHostingUser { get; set; }
        public bool IsConfirmedAttendingUser { get; set; }
        public List<string>? Place { get; set; }
        public List<string>? Note { get; set; }
        public User HostingUser { get; set; }
        public List<User> AttendingUser { get; set; }
    }

}