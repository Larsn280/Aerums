using Xunit;
using Microsoft.EntityFrameworkCore;
using Aerums_API.Repositories;
using Aerums_API.Models;
using Aerums_API.Data;

namespace Aerums_API.Tests
{
    public class FreeTimeRepositoryTests
    {
        private DbContextOptions<AerumsContext> CreateNewContextOptions()
        {
            // Create a new instance of DbContextOptionsBuilder and configure it to use an in-memory database
            return new DbContextOptionsBuilder<AerumsContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;
        }

        [Fact]
        public async Task ListAllFreeTimesAsync_ReturnsAllFreeTimes()
        {
            // Arrange
            var options = CreateNewContextOptions();

            // Create some sample free times
            var freeTimes = new List<FreeTimeModel>
            {
                new FreeTimeModel { FreeTimeId = 1, Date = DateTime.Now, StartTime = DateTime.Now, EndTime = DateTime.Now },
                new FreeTimeModel { FreeTimeId = 2, Date = DateTime.Now, StartTime = DateTime.Now, EndTime = DateTime.Now }
            };

            // Insert the sample free times into the in-memory database
            using (var context = new AerumsContext(options))
            {
                context.FreeTimeModel.AddRange(freeTimes);
                context.SaveChanges();
            }

            // Act
            using (var context = new AerumsContext(options))
            {
                var repository = new FreeTimeRepository(context, null);
                var result = await repository.ListAllFreeTimesAsync();
                
                // Assert
                Assert.Equal(2, result.Count);
                // Additional assertions based on your expected results
            }
        }
    }
}