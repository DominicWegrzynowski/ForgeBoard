namespace forgeboard.api.DTOs.Ticket
{
    public class TicketResponseDto
    {
        public int Id { get; set; }

        public int ProjectId { get; set; }
        public int TicketPriorityId { get; set; }
        public int TicketStatusId { get; set; }
        public int TicketTypeId { get; set; }

        public int OwnerUserId { get; set; }
        public int? DeveloperUserId { get; set; }

        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public DateTimeOffset Created { get; set; }
        public DateTimeOffset? Updated { get; set; }

        public bool Archived { get; set; }
        public bool ArchivedByProject { get; set; }

        // Flattened display data React actually wants
        public string ProjectName { get; set; } = string.Empty;
        public string PriorityName { get; set; } = string.Empty;
        public string StatusName { get; set; } = string.Empty;
        public string TypeName { get; set; } = string.Empty;

        public string OwnerName { get; set; } = string.Empty;
        public string? DeveloperName { get; set; }
    }
}
