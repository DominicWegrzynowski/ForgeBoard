using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace forgeboard.api.Models
{
    public class Ticket
    {
        //Primary Key
        public int Id { get; set; }

        //Foreign Keys
        [DisplayName("Project")]
        public int ProjectId { get; set; }

        [DisplayName("Ticket Priority")]
        public int TicketPriorityId { get; set; }

        [DisplayName("Ticket Status")]
        public int TicketStatusId { get; set; }

        [DisplayName("Ticket Type")]
        public int TicketTypeId { get; set; }

        [DisplayName("Ticket Owner")]
        public int OwnerUserId { get; set; }

        [DisplayName("Ticket Developer")]
        public int? DeveloperUserId { get; set; }

        //Remaining Properties
        [Required]
        [StringLength(50)]
        [DisplayName("Title")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [DisplayName("Description")]
        public string Description { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        [Display(Name = "Created")]
        public DateTimeOffset Created { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Updated")]
        public DateTimeOffset? Updated { get; set; }

        [DisplayName("Archived")]
        public bool Archived { get; set; }

        [DisplayName("Archived By Project")]
        public bool ArchivedByProject { get; set; }

        //Navigation Properties
        //the virtual keyword allows for lazy loading and change tracking in entity framework
        public virtual Project Project { get; set; } = null!;
        public virtual TicketType TicketType { get; set; } = null!;
        public virtual TicketPriority TicketPriority { get; set; } = null!;
        public virtual TicketStatus TicketStatus { get; set; } = null!;
        public virtual User OwnerUser { get; set; } = null!;
        public virtual User? DeveloperUser { get; set; }

        //One to many relationships
        public virtual ICollection<TicketComment> Comments { get; set; } = new HashSet<TicketComment>();
        public virtual ICollection<TicketAttachment> Attachments { get; set; } = new HashSet<TicketAttachment>();
        public virtual ICollection<Notification> Notifications { get; set; } = new HashSet<Notification>();
        public virtual ICollection<TicketHistory> History { get; set; } = new HashSet<TicketHistory>();

    }
}
