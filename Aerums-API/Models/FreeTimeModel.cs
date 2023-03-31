using System.ComponentModel.DataAnnotations;
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
        // public ApplicationUser? User { get; set; }
        public virtual ICollection<ApplicationUser>? ApplicationUsers { get; set; }
    }
}