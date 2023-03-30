using System.ComponentModel.DataAnnotations;

namespace Aerums_API.ViewModels.Authorization
{
    public class RegisterViewModel
    {
        [Required]
        [EmailAddress(ErrorMessage = "Felaktig e-post adress")]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}