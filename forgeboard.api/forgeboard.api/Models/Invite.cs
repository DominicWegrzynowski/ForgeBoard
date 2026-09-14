using System;
using System.ComponentModel;

namespace forgeboard.api.Models
{
    public class Invite
    {
        //Primary Keys
        public int Id { get; set; }

        //Foreign Keys
        [DisplayName("Company")]
        public int CompanyId { get; set; }

        [DisplayName("Project")]
        public int ProjectId { get; set; }

        [DisplayName("Invitor")]
        public int InvitorId { get; set; }

        [DisplayName("Invitee")]
        public int InviteeId { get; set; }

        [DisplayName("Code")]
        public Guid CompanyToken { get; set; } //GUID = global unique identifier

        //Remaining Properties
        [DisplayName("Date Sent")]
        public DateTimeOffset InviteDate { get; set; }

        [DisplayName("Join Date")]
        public DateTimeOffset JoinDate { get; set; }

        [DisplayName("Invitee Email")]
        public string InviteeEmail { get; set; }

        [DisplayName("Invitee First Name")]
        public string InviteeFirstName { get; set; }

        [DisplayName("Invitee Last Name")]
        public string InviteeLastName { get; set; }
        public bool IsValid { get; set; }

        //Navigation Properties

        public virtual Company Company { get; set; }
        public virtual User Invitor { get; set; } = null!;
        public virtual User Invitee { get; set; } = null!;
        public virtual Project Project { get; set; }

    }
}
