using Microsoft.AspNetCore.Identity;
namespace Aerums_API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public List<FreeTimeModel>? FreeTimes { get; set; }
        public List<BookingModel>? Bookings { get; set; }
        public List<ApplicationUser>? MyFriends { get; set; }
    }
}
