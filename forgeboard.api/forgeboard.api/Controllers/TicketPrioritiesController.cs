using forgeboard.api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace forgeboard.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketPrioritiesController : ControllerBase
    {
        private readonly ForgeBoardDbContext _context;

        public TicketPrioritiesController(ForgeBoardDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var priorities = await _context.TicketPriorities
            .AsNoTracking()
            .ToListAsync(cancellationToken);

            return Ok(priorities);
        }

        //[HttpGet("{id:int}")]
        //public async Task<IActionResult> GetById(int id)
        //{
            
        //}
    }
}
