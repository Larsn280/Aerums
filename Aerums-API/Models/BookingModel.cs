using System.ComponentModel.DataAnnotations;
namespace Aerums_API.Models
{
    public class BookingModel
    {
        [Key]
        public int BookingsId { get; set; }
        public DateTime Date { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public bool IsConfirmedHostingUser { get; set; } = false;
        public bool IsConfirmedAttendingUser { get; set; } = false;
        // public List<string>? Place { get; set; }
        public string? Place {get; set;} 
        // public List<string>? Note { get; set; }
        public string? Note {get; set;}
        // public ApplicationUser? HostingUser { get; set; }
        // public List<ApplicationUser>? AttendingUser { get; set; }
        public virtual ICollection<ApplicationUser>? ApplicationUsers { get; set; }
    }

}