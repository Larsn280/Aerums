using Microsoft.AspNetCore.Identity;
namespace Aerums_API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public ICollection<FreeTimeModel>? FreeTimes { get; set; }
        public ICollection<BookingModel>? Bookings { get; set; }
        public ICollection<ApplicationUser>? MyFriends { get; set; }
    }
}
