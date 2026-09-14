using System.Collections.Generic;

namespace forgeboard.api.Models.ViewModels
{
    public class DashboardViewModel
    {
        public Company Company { get; set; }
        public List<Project> Projects { get; set; }
        public List<Ticket> Tickets { get; set; }
        public List<User> Members { get; set; }
        public List<string> Roles { get; set; } = new();
    }
}
