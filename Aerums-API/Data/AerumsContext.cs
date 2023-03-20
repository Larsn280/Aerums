using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace Aerums_API.Data {
    public class AerumsContext : IdentityDbContext<User>
    {
        public DbSet<User> Users => Set<User>();
        public AerumsContext(DbContextOptions options) : base(options) { }
    }
}