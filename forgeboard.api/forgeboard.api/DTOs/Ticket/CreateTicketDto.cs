namespace forgeboard.api.DTOs.Ticket
{
    public class CreateTicketDto
    {
        public int ProjectId { get; set; }
        public int TicketPriorityId { get; set; }
        public int TicketStatusId { get; set; }
        public int TicketTypeId { get; set; }

        // Temporary until Entra determines the current user
        public int OwnerUserId { get; set; }

        public int? DeveloperUserId { get; set; }

        public required string Title { get; set; }
        public required string Description { get; set; }
    }
}
