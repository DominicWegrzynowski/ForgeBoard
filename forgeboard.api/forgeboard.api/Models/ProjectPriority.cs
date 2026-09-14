using System.ComponentModel;

namespace forgeboard.api.Models
{
    public class ProjectPriority
    {
        public int Id { get; set; }

        [DisplayName("Priority Name")]
        public string Name { get; set; } = string.Empty;
    }
}
