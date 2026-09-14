namespace forgeboard.api.DTOs.Project
{
    public class ProjectResponseDto
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public int ProjectPriorityId { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public DateTimeOffset StartDate { get; set; }

        public DateTimeOffset EndDate { get; set; }

        public bool Archived { get; set; }

        public string? ImageFileName { get; set; }

        public string? ImageFileContentType { get; set; }
    }
}
