
namespace Aerums_API.ViewModels.FreeTimeViewModels
{
    public class PutFreeTimeViewModel
    { 
        public int Id { get; set; }
        public string? Date { get; set; }
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
        public string? Place { get; set; }
        public string? Note { get; set; }
        public string? UserName { get; set; }
    }
}