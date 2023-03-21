using Microsoft.AspNetCore.Identity;
namespace Aerums_API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public virtual BookingModel? BookingModel { get; set; }
        public virtual FreeTimeModel? FreeTimeModel { get; set; }
    }
}
