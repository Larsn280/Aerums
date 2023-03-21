using Aerums_API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Aerums_API.Data {
    public class AerumsContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<BookingModel>? BookingModel {get; set;}
        public DbSet<FreeTimeModel>? FreeTimeModel {get; set;}
        public AerumsContext(DbContextOptions options) : base(options) { }
    }
}