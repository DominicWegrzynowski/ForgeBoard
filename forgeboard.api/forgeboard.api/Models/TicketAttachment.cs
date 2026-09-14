using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace forgeboard.api.Models
{
    public class TicketAttachment
    {
        public int Id { get; set; }

        [DisplayName("Ticket")]
        public int TicketId { get; set; }

        [DisplayName("Team Member")]
        public int UserId { get; set; }

        [DisplayName("File Date")]
        public DateTimeOffset Created { get; set; }

        [DisplayName("File Description")]
        public string Description { get; set; }

        [NotMapped]
        [DisplayName("Select a file")]
        [DataType(DataType.Upload)]
        public IFormFile? FormFile { get; set; }

        [DisplayName("File")]
        public string FileName { get; set; }
        public byte[] FileData { get; set; }

        [DisplayName("File Extension")]
        public string FileContentType { get; set; }

        //Navigation Properties
        public virtual Ticket Ticket { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
