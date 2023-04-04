using Microsoft.AspNetCore.Identity;
namespace Aerums_API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public List<BookingModel>? BookingModel { get; set; }
        public List<FreeTimeModel>? FreeTimeModel { get; set; }
    }
}
