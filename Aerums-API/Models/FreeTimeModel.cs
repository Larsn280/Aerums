using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aerums_API.Models
{
    public class FreeTimeModel
    {
        [Key]
        public int FreeTimeId { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MMMM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Date { get; set; }
        [DisplayFormat(DataFormatString = "{0:HH\\:mm}", ApplyFormatInEditMode = true)]
        public DateTime StartTime { get; set; }
        [DisplayFormat(DataFormatString = "{0:HH\\:mm}", ApplyFormatInEditMode = true)]
        public DateTime EndTime { get; set; }
        public string? Place { get; set; }
        public string? Note { get; set; }
        [ForeignKey("ApplicationUser")]
        public ApplicationUser ApplicationUsers { get; set; }
    }
}