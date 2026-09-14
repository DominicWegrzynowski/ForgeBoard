using System.ComponentModel;

namespace forgeboard.api.Models
{
    public class TicketType
    {
        public int Id { get; set; }

        [DisplayName("Type Name")]
        public string Name { get; set; } = string.Empty;

    }
}
