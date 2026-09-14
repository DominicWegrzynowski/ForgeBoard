using System.Collections.Generic;
using System.ComponentModel;

namespace forgeboard.api.Models
{
    public class Company
    {
        public int Id { get; set; }

        [DisplayName("Company Name")]
        public string Name { get; set; } = string.Empty;

        [DisplayName("Company Description")]
        public string Description { get; set; } = string.Empty;

        //-- Navigation Properties
        public virtual ICollection<User> Members { get; set; } = new HashSet<User>();
        public virtual ICollection<Project> Projects { get; set; } = new HashSet<Project>();
        public virtual ICollection<Invite> Invites { get; set;} = new HashSet<Invite>();   
    }
}
