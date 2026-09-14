using forgeboard.api.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace forgeboard.api.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Username { get; set; } = String.Empty;
        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; } = String.Empty;
        [Required]
        public string PasswordHash { get; set; } = String.Empty;
        [MaxLength(50)]
        public string? FirstName { get; set; }

        [MaxLength(50)]
        public string? LastName { get; set; }

        [NotMapped]
        public string? FullName => $"{FirstName} {LastName}".Trim();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
        [MaxLength(255)]
        public string? AvatarUrl { get; set; }
        public UserRole Role { get; set; } = UserRole.Developer;
        public int CompanyId { get; set; }

        //Navigation Properties
        public virtual Company? Company { get; set; }
        public virtual ICollection<Project>? Projects { get; set; }

        // JWT
        public bool IsActive { get; set; }
        public bool EmailConfirmed { get; set; }
    }
}
