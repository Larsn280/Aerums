using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aerums_API.Models
{
    public class FreeTimeModel
    {
        [Key]
        public int FreeTimeId { get; set; }
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? Place { get; set; }
        public string? Note { get; set; }
        [ForeignKey("ApplicationUser")]
        public ApplicationUser? ApplicationUsers { get; set; }
    }
}