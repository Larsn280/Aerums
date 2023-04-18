using Aerums_API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Aerums_API.Data {
    public class AerumsContext : IdentityDbContext<ApplicationUser>
    {
        public virtual DbSet<BookingModel>? BookingModel {get; set;}
        public virtual DbSet<FreeTimeModel>? FreeTimeModel {get; set;}
        public virtual DbSet<FriendModel>? FriendModel {get; set;}
        public AerumsContext(DbContextOptions options) : base(options) { }
    }
}