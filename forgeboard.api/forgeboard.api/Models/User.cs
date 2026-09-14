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
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; } = String.Empty;
        [MaxLength(50)]
        public string? FirstName { get; set; }

        [MaxLength(50)]
        public string? LastName { get; set; }

        [NotMapped]
        public string? FullName => $"{FirstName} {LastName}".Trim();
        
        public string? AvatarUrl { get; set; }
        public int CompanyId { get; set; }

        //Navigation Properties
        public virtual Company Company { get; set; } = null!;
        public virtual ICollection<Project>? Projects { get; set; }
    }
}
