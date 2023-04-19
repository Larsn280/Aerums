using System.ComponentModel.DataAnnotations;

namespace Aerums_API.Models
{
    public class FriendModel
    {
        [Key]
        public int Id { get; set; }
        public string? UserId { get; set; }
        public string? FriendId { get; set; }
        public bool IsFriendConfirmed { get; set; } = false;
    }
}