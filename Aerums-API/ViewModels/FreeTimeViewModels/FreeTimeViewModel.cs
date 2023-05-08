using Aerums_API.Models;

namespace Aerums_API.ViewModels.FreeTimeViewModels
{
    public class FreeTimeViewModel
    {
        public int FreeTimeId { get; set; }
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? Place { get; set; }
        public string? Note { get; set; }
        public string? UserName { get; set; }
    }
}
