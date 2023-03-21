using Aerums_API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Aerums_API.Data {
    public class AerumsContext : IdentityDbContext<User>
    {
        public AerumsContext(DbContextOptions options) : base(options) { }
    }
}