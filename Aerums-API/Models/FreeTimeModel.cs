using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aerums_API.Models
{
    public class FreeTimeModel
    {
        [Key]
        public int FreeTimeId { get; set; }
        public string? Date { get; set; }
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
        public string? Place { get; set; }
        public string? Note { get; set; }
        [ForeignKey("ApplicationUser")]
        public ApplicationUser ApplicationUsers { get; set; }
    }
}