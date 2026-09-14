using forgeboard.api.DTOs.Ticket;
using forgeboard.api.Models;
using forgeboard.api.Services.TicketService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace forgeboard.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public TicketsController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        // GET api/tickets/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Ticket>> GetById(int id)
        {
            var ticket = await _ticketService.GetTicketByIdAsync(id);

            if(ticket is null)
            {
                return NotFound();
            }

            var dto = new TicketResponseDto
            {
                Id = ticket.Id,

                ProjectId = ticket.ProjectId,
                TicketPriorityId = ticket.TicketPriorityId,
                TicketStatusId = ticket.TicketStatusId,
                TicketTypeId = ticket.TicketTypeId,

                OwnerUserId = ticket.OwnerUserId,
                DeveloperUserId = ticket.DeveloperUserId,

                Title = ticket.Title,
                Description = ticket.Description,

                Created = ticket.Created,
                Updated = ticket.Updated,

                Archived = ticket.Archived,
                ArchivedByProject = ticket.ArchivedByProject,

                ProjectName = ticket.Project.Name,
                PriorityName = ticket.TicketPriority.Name,
                StatusName = ticket.TicketStatus.Name,
                TypeName = ticket.TicketType.Name,

                OwnerName = ticket.OwnerUser.FullName,
                DeveloperName = ticket.DeveloperUser?.FullName
            };

            return Ok(dto);
        }

        // GET api/tickets/company/5
        [HttpGet("company/{companyId:int}")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetByCompany(int companyId)
        {
            var tickets = await _ticketService.GetAllTicketsByCompanyAsync(companyId);

            return Ok(tickets);
        }

        // POST api/tickets
        [HttpPost]
        public async Task<ActionResult<Ticket>> Create(CreateTicketDto dto)
        {
            var ticket = new Ticket
            {
                ProjectId = dto.ProjectId,
                TicketPriorityId = dto.TicketPriorityId,
                TicketStatusId = dto.TicketStatusId,
                TicketTypeId = dto.TicketTypeId,
                OwnerUserId = dto.OwnerUserId,
                DeveloperUserId = dto.DeveloperUserId,

                Title = dto.Title.Trim(),
                Description = dto.Description.Trim(),

                Created = DateTimeOffset.UtcNow,
                Archived = false,
                ArchivedByProject = false
            };

            await _ticketService.AddNewTicketAsync(ticket);

            return CreatedAtAction(nameof(GetById), new { id = ticket.Id }, ticket);
        }

        // PUT api/tickets/5
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Update(int id, UpdateTicketDto dto)
        {
            var ticket = await _ticketService.GetTicketByIdAsync(id);

            if(ticket is null)
            {
                return NotFound();
            }

            ticket.ProjectId = dto.ProjectId;
            ticket.TicketPriorityId = dto.TicketPriorityId;
            ticket.TicketStatusId = dto.TicketStatusId;
            ticket.TicketTypeId = dto.TicketTypeId;
            ticket.DeveloperUserId = dto.DeveloperUserId;

            ticket.Title = dto.Title.Trim();
            ticket.Description = dto.Description.Trim();
            ticket.Updated = DateTimeOffset.UtcNow;

            await _ticketService.UpdateTicketAsync(ticket);

            return NoContent();
        }

        // PATCH api/tickets/5/archive
        [HttpPatch("{id:int}")]
        public async Task<IActionResult> Archive(int id)
        {
            var ticket = await _ticketService.GetTicketByIdAsync(id);

            if(ticket is null)
            {
                NotFound();
            }

            await _ticketService.ArchiveTicketAsync(ticket);

            return NoContent();
        }

        //Patch api/tickets/5/assignment
        [HttpPatch("{id:int}")]
        public async Task<IActionResult> Assign(int id, AssignTicketDto dto)
        {
            var ticket = await _ticketService.GetTicketByIdAsync(id);

            if (ticket is null)
            {
                return NotFound();
            }

            await _ticketService.AssignTicketAsync(id, dto.DeveloperUserId);

            return NoContent();
        }
    }
}
