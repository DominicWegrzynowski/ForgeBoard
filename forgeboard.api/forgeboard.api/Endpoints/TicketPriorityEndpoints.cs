using forgeboard.api.Data;
using forgeboard.api.Models;
using Microsoft.EntityFrameworkCore;

namespace forgeboard.api.Endpoints
{
    public static class TicketPriorityEndpoints
    {
        public static void MapTicketPriorityEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("/api/ticket-priorities");

            group.MapGet("/", async (ForgeBoardDbContext db) => 
            {
                var priorities = await db.TicketPriorities
                    .AsNoTracking()
                    .ToListAsync();

                return Results.Ok(priorities);
            });

            group.MapPost("/", async (TicketPriority priority, ForgeBoardDbContext db) => 
            {
                //This will still error
                db.TicketPriorities.Add(priority);
                await db.SaveChangesAsync();

                return Results.Created($"/api/ticket-priorities/{priority.Id}", priority);
            });
        }
    }
}
