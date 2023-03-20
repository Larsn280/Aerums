namespace Aerums_API.Models
{
    public class FreeTimeModel
    {
        public int FreeTimeId { get; set; }
        public DateTime Date { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public string? Place { get; set; }
        public string? Note { get; set; }
        public User User { get; set; }
    }
}