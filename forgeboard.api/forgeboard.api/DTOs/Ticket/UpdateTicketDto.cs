namespace forgeboard.api.DTOs.Ticket
{
    public class UpdateTicketDto
    {
        public int ProjectId { get; set; }
        public int TicketPriorityId { get; set; }
        public int TicketStatusId { get; set; }
        public int TicketTypeId { get; set; }
        public int? DeveloperUserId { get; set; }

        public required string Title { get; set; }
        public required string Description { get; set; }
    }
}
