using Microsoft.AspNetCore.Identity;
namespace Aerums_API.Models
{
    public class User : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public List<FreeTimeModel>? FreeTimes { get; set; }
        public List<BookingModel>? Bookings { get; set; }
        public List<User>? MyFriends { get; set; }
    }
}
