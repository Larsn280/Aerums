using Aerums_API.Data;
using Aerums_API.Models;
using Microsoft.AspNetCore.Identity;

namespace Aerums_API.Services
{
    public class DatabaseService
    {
        private readonly AerumsContext _ctx;
        private readonly UserManager<ApplicationUser> _userManager;

        public DatabaseService(AerumsContext ctx, UserManager<ApplicationUser> userManager)
        {
            _ctx = ctx;
            _userManager = userManager;
        }

        public async Task Seed()
        {
            var testssonsBookingList = new List<BookingModel>{
                new BookingModel(){
                    Date = DateTime.Now.AddDays(+5),
                    StartTime = DateTime.Now.AddDays(+5),
                    EndTime = DateTime.Now.AddDays(+5),
                    Place = "Hemma hos Test Testsson",
                    Note = "Ta med kaffe o Bulle",
                },
                new BookingModel(){
                    Date = DateTime.Now.AddDays(+10),
                    StartTime = DateTime.Now.AddDays(+10),
                    EndTime = DateTime.Now.AddDays(+10),
                    Place = "Lekplatsen",
                    Note = "Ta med regnkläder",
                },
                new BookingModel(){
                    Date = DateTime.Now.AddDays(+3),
                    StartTime = DateTime.Now.AddDays(+3),
                    EndTime = DateTime.Now.AddDays(+3),
                    Place = "Café Björnen"
                },

            };
            var björkssonsBookingList = new List<BookingModel>{
                new BookingModel(){
                    Date = DateTime.Now.AddDays(+15),
                    StartTime = DateTime.Now.AddDays(+15),
                    EndTime = DateTime.Now.AddDays(+15),
                    Place = "Stranden"
                }};
            await _ctx.AddRangeAsync(testssonsBookingList);
            await _ctx.AddRangeAsync(björkssonsBookingList);

            var testssonsFreetimeList = new List<FreeTimeModel>{
                new FreeTimeModel(){
                    Date = DateTime.Now.AddDays(+5),
                    StartTime = DateTime.Now.AddDays(+5),
                    EndTime = DateTime.Now.AddDays(+5),
                },
                new FreeTimeModel(){
                    Date = DateTime.Now.AddDays(+5),
                    StartTime = DateTime.Now.AddDays(+5),
                    EndTime = DateTime.Now.AddDays(+5),
                },
                new FreeTimeModel(){
                    Date = DateTime.Now.AddDays(+5),
                    StartTime = DateTime.Now.AddDays(+5),
                    EndTime = DateTime.Now.AddDays(+5),
                },
                new FreeTimeModel(){
                    Date = DateTime.Now.AddDays(+5),
                    StartTime = DateTime.Now.AddDays(+5),
                    EndTime = DateTime.Now.AddDays(+5),
                },
                new FreeTimeModel(){
                    Date = DateTime.Now.AddDays(+5),
                    StartTime = DateTime.Now.AddDays(+5),
                    EndTime = DateTime.Now.AddDays(+5),
                }
            };
            var björkssonsFreetimeList = new List<FreeTimeModel>{
                new FreeTimeModel(){
                    Date = DateTime.Now.AddDays(+3),
                    StartTime = DateTime.Now.AddDays(+3),
                    EndTime = DateTime.Now.AddDays(+3),
                },
                new FreeTimeModel(){
                    Date = DateTime.Now.AddDays(+5),
                    StartTime = DateTime.Now.AddDays(+5),
                    EndTime = DateTime.Now.AddDays(+5),
                },
                new FreeTimeModel(){
                    Date = DateTime.Now.AddDays(+8),
                    StartTime = DateTime.Now.AddDays(+8),
                    EndTime = DateTime.Now.AddDays(+8),
                },
                new FreeTimeModel(){
                    Date = DateTime.Now.AddDays(+15),
                    StartTime = DateTime.Now.AddDays(+15),
                    EndTime = DateTime.Now.AddDays(+15),
                },
                new FreeTimeModel(){
                    Date = DateTime.Now.AddDays(+5),
                    StartTime = DateTime.Now.AddDays(+5),
                    EndTime = DateTime.Now.AddDays(+5),
                }
            };
            await _ctx.AddRangeAsync(testssonsFreetimeList);
            await _ctx.AddRangeAsync(björkssonsFreetimeList);

            var testUser = new ApplicationUser()
            {
                UserName = "test@mail.com",
                Email = "test@mail.com",
                FirstName = "Test",
                LastName = "Testsson",
                FreeTimeModel = testssonsFreetimeList,
                BookingModel = testssonsBookingList
            };
            var test2User = new ApplicationUser()
            {
                UserName = "bjork@mail.com",
                Email = "bjork@mail.com",
                FirstName = "Berit",
                LastName = "Björksson",
                FreeTimeModel = björkssonsFreetimeList,
                BookingModel = björkssonsBookingList
            };
            await _userManager.CreateAsync(testUser, "Passw0rd!");
            await _userManager.CreateAsync(test2User, "Passw0rd!");

            var friends = new FriendModel()
            {
                UserId = testUser.Id,
                FriendId = test2User.Id,
                IsFriendConfirmed = true
            };
            await _ctx.AddRangeAsync(friends);

            await _ctx.SaveChangesAsync();
        }
        public async Task Recreate()
        {
            await _ctx.Database.EnsureDeletedAsync();
            await _ctx.Database.EnsureCreatedAsync();
        }
        public async Task CreateIfNotExist()
        {
            await _ctx.Database.EnsureCreatedAsync();
        }
        public async Task RecreateAndSeed()
        {
            await Recreate();
            await Seed();
        }
        public async Task CreateAndSeedIfNotExist()
        {
            bool createdDatabase = await _ctx.Database.EnsureCreatedAsync();
            if (createdDatabase) await Seed();
        }
    }
}
