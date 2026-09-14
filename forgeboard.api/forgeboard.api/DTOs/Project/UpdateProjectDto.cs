using System.ComponentModel.DataAnnotations;

namespace forgeboard.api.DTOs.Project
{
    public class UpdateProjectDto
    {
        public int ProjectPriorityId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public DateTimeOffset StartDate { get; set; }

        public DateTimeOffset EndDate { get; set; }
    }
}
