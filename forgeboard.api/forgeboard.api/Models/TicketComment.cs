using System;
using System.ComponentModel;

namespace forgeboard.api.Models
{
    public class TicketComment
    {
        public int Id { get; set; }

        [DisplayName("Team Member")]
        public int UserId { get; set; }

        [DisplayName("Ticket")]
        public int TicketId { get; set; }

        [DisplayName("Member Comment")]
        public string Comment { get; set; } = string.Empty;

        [DisplayName("Date")]
        public DateTimeOffset Created { get; set; }

        //-Navigational Properties
        public virtual Ticket Ticket { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
