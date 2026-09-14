using forgeboard.api.Data;
using forgeboard.api.Models;
using forgeboard.api.Models.Enums;
using forgeboard.api.Services.CompanyInfoService;
using forgeboard.api.Services.ProjectService;
using Microsoft.EntityFrameworkCore;

namespace forgeboard.api.Services.TicketService
{
    public class TicketService : ITicketService
    {

        private readonly ForgeBoardDbContext _context;
        private readonly ICompanyInfoService _CompanyInfoService;
        private readonly IProjectService _ProjectService;

        public TicketService(ForgeBoardDbContext context, ICompanyInfoService CompanyInfoService, IProjectService ProjectService)
        {
            _context = context;
            _CompanyInfoService = CompanyInfoService;
            _ProjectService = ProjectService;
        }
        public async Task AddNewTicketAsync(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
        }

        public async Task AddTicketAttachmentAsync(TicketAttachment ticketAttachment)
        {
            await _context.AddAsync(ticketAttachment);
            await _context.SaveChangesAsync();
        }

        public async Task AddTicketCommentAsync(TicketComment ticketComment)
        {
            await _context.AddAsync(ticketComment);
            await _context.SaveChangesAsync();
        }

        public async Task ArchiveTicketAsync(Ticket ticket)
        {
            if (ticket is not null)
            {
                ticket.Archived = true;
                _context.Update(ticket);
                await _context.SaveChangesAsync();

            }
        }

        public async Task AssignTicketAsync(int ticketId, int userId)
        {
            Ticket ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.Id == ticketId);
            if (ticket is not null)
            {

                ticket.DeveloperUserId = userId;
                //Revisit this code when assigning tickets
                ticket.TicketStatusId = (await LookupTicketStatusIdAsync("Development")).Value;

                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Ticket>> GetAllTicketsByCompanyAsync(int companyId)
        {

            List<Ticket> tickets = await _context.Projects
                                        .Where(p => p.CompanyId == companyId)
                                        .SelectMany(p => p.Tickets)
                                            .Include(t => t.Attachments)
                                            .Include(t => t.Comments)
                                            .Include(t => t.History)
                                            .Include(t => t.DeveloperUser)
                                            .Include(t => t.OwnerUser)
                                            .Include(t => t.TicketPriority)
                                            .Include(t => t.TicketStatus)
                                            .Include(t => t.TicketType)
                                            .Include(t => t.TicketType)
                                        .ToListAsync();
            return tickets;
        }

        public async Task<List<Ticket>> GetAllTicketsByPriorityAsync(int companyId, string priorityName)
        {
            int priorityId = (await LookupTicketPriorityIdAsync(priorityName)).Value;


            List<Ticket> tickets = await _context.Projects
                                                    .Where(p => p.CompanyId == companyId)
                                                    .SelectMany(p => p.Tickets)
                                                        .Include(t => t.Attachments)
                                                        .Include(t => t.Comments)
                                                        .Include(t => t.History)
                                                        .Include(t => t.DeveloperUser)
                                                        .Include(t => t.OwnerUser)
                                                        .Include(t => t.TicketPriority)
                                                        .Include(t => t.TicketStatus)
                                                        .Include(t => t.TicketType)
                                                    .Where(t => t.TicketPriorityId == priorityId)
                                                    .ToListAsync();

            return tickets;

        }

        public async Task<List<Ticket>> GetAllTicketsByStatusAsync(int companyId, string statusName)
        {
            int statusId = (await LookupTicketStatusIdAsync(statusName)).Value;


            List<Ticket> tickets = await _context.Projects
                                                    .Where(p => p.CompanyId == companyId)
                                                    .SelectMany(p => p.Tickets)
                                                        .Include(t => t.Attachments)
                                                        .Include(t => t.Comments)
                                                        .Include(t => t.History)
                                                        .Include(t => t.DeveloperUser)
                                                        .Include(t => t.OwnerUser)
                                                        .Include(t => t.TicketPriority)
                                                        .Include(t => t.TicketStatus)
                                                        .Include(t => t.TicketType)
                                                    .Where(t => t.TicketStatusId == statusId)
                                                    .ToListAsync();

            return tickets;

        }

        public async Task<List<Ticket>> GetAllTicketsByTypeAsync(int companyId, string typeName)
        {
            int typeId = (await LookupTicketTypeIdAsync(typeName)).Value;


            List<Ticket> tickets = await _context.Projects
                                                    .Where(p => p.CompanyId == companyId)
                                                    .SelectMany(p => p.Tickets)
                                                        .Include(t => t.Attachments)
                                                        .Include(t => t.Comments)
                                                        .Include(t => t.History)
                                                        .Include(t => t.DeveloperUser)
                                                        .Include(t => t.OwnerUser)
                                                        .Include(t => t.TicketPriority)
                                                        .Include(t => t.TicketStatus)
                                                        .Include(t => t.TicketType)
                                                    .Where(t => t.TicketTypeId == typeId)
                                                    .ToListAsync();

            return tickets;

        }

        public async Task<List<Ticket>> GetArchivedTicketsAsync(int companyId)
        {

            List<Ticket> tickets = await _context.Projects
                                                    .Where(p => p.CompanyId == companyId)
                                                    .SelectMany(p => p.Tickets)
                                                        .Include(t => t.Attachments)
                                                        .Include(t => t.Comments)
                                                        .Include(t => t.History)
                                                        .Include(t => t.DeveloperUser)
                                                        .Include(t => t.OwnerUser)
                                                        .Include(t => t.TicketPriority)
                                                        .Include(t => t.TicketStatus)
                                                        .Include(t => t.TicketType)
                                                    .Where(t => t.Archived == true)
                                                    .ToListAsync();
            return tickets;

        }

        public async Task<List<Ticket>> GetProjectTicketsByPriorityAsync(int projectId, string priorityName)
        {
            int priorityId = (await LookupTicketPriorityIdAsync(priorityName)).Value;


            List<Ticket> tickets = await _context.Projects
                                                    .Where(p => p.Id == projectId)
                                                    .SelectMany(p => p.Tickets)
                                                        .Include(t => t.Attachments)
                                                        .Include(t => t.Comments)
                                                        .Include(t => t.History)
                                                        .Include(t => t.DeveloperUser)
                                                        .Include(t => t.OwnerUser)
                                                        .Include(t => t.TicketPriority)
                                                        .Include(t => t.TicketStatus)
                                                        .Include(t => t.TicketType)
                                                    .Where(t => t.TicketPriorityId == priorityId)
                                                    .ToListAsync();
            return tickets;

        }

        public async Task<List<Ticket>> GetProjectTicketsByRoleAsync(int projectId, string role, int userId)
        {

            List<Ticket> tickets = new List<Ticket>();

            if (role == Roles.Admin.ToString())
            {
                tickets = await _context.Projects
                                        .Where(p => p.Id == projectId)
                                        .SelectMany(p => p.Tickets)
                                        .ToListAsync();
            }

            if (role == Roles.Developer.ToString())
            {
                tickets = (await _context.Projects
                                            .Where(p => p.Id == projectId)
                                            .SelectMany(p => p.Tickets)
                                            .ToListAsync())
                            .Where(t => t.DeveloperUserId == userId).ToList();
            }

            if (role == Roles.Submitter.ToString())
            {
                tickets = (await _context.Projects
                                            .Where(p => p.Id == projectId)
                                            .SelectMany(p => p.Tickets)
                                            .ToListAsync())
                            .Where(t => t.OwnerUserId == userId).ToList();
            }

            if (role == Roles.ProjectManager.ToString())
            {
                tickets = (await _context.Projects
                                            .Where(p => p.Id == projectId)
                                            .SelectMany(p => p.Tickets)
                                            .ToListAsync())
                            .ToList();
            }

            return tickets;

        }

        public async Task<List<Ticket>> GetProjectTicketsByStatusAsync(int projectId, string statusName)
        {
            int statusId = (await LookupTicketStatusIdAsync(statusName)).Value;


            List<Ticket> tickets = await _context.Projects
                                                    .Where(p => p.Id == projectId)
                                                    .SelectMany(p => p.Tickets)
                                                        .Include(t => t.Attachments)
                                                        .Include(t => t.Comments)
                                                        .Include(t => t.History)
                                                        .Include(t => t.DeveloperUser)
                                                        .Include(t => t.OwnerUser)
                                                        .Include(t => t.TicketPriority)
                                                        .Include(t => t.TicketStatus)
                                                        .Include(t => t.TicketType)
                                                    .Where(t => t.TicketStatusId == statusId)
                                                    .ToListAsync();
            return tickets;

        }

        public async Task<List<Ticket>> GetProjectTicketsByTypeAsync(int projectId, string typeName)
        {
            int typeId = (await LookupTicketTypeIdAsync(typeName)).Value;


            List<Ticket> tickets = await _context.Projects
                                                    .Where(p => p.Id == projectId)
                                                    .SelectMany(p => p.Tickets)
                                                        .Include(t => t.Attachments)
                                                        .Include(t => t.Comments)
                                                        .Include(t => t.History)
                                                        .Include(t => t.DeveloperUser)
                                                        .Include(t => t.OwnerUser)
                                                        .Include(t => t.TicketPriority)
                                                        .Include(t => t.TicketStatus)
                                                        .Include(t => t.TicketType)
                                                    .Where(t => t.TicketTypeId == typeId)
                                                    .ToListAsync();
            return tickets;

        }

        public async Task<List<Ticket>> GetUnassignedTicketsAsync(int companyId)
        {

            List<Ticket> tickets = await _context.Projects
                                                    .Where(p => p.CompanyId == companyId)
                                                    .SelectMany(p => p.Tickets)
                                                        .Include(t => t.Attachments)
                                                        .Include(t => t.Comments)
                                                        .Include(t => t.History)
                                                        .Include(t => t.DeveloperUser)
                                                        .Include(t => t.OwnerUser)
                                                        .Include(t => t.TicketPriority)
                                                        .Include(t => t.TicketStatus)
                                                        .Include(t => t.TicketType)
                                                    .Where(t => t.DeveloperUserId == null)
                                                    .ToListAsync();
            return tickets;

        }

        public async Task<Ticket> GetTicketAsNoTrackingAsync(int ticketId)
        {

            return await _context.Tickets.AsNoTracking().FirstOrDefaultAsync(t => t.Id == ticketId);

        }

        public async Task<TicketAttachment?> GetTicketAttachmentByIdAsync(int ticketAttachmentId)
        {

            return await _context.TicketAttachments.FirstOrDefaultAsync(t => t.Id == ticketAttachmentId);

        }

        public async Task<Ticket?> GetTicketByIdAsync(int ticketId)
        {

            Ticket? ticket = await _context.Tickets
                                    .Include(t => t.DeveloperUser)
                                    .Include(t => t.OwnerUser)
                                    .Include(t => t.Project)
                                    .ThenInclude(p => p.Members)
                                    .Include(t => t.TicketPriority)
                                    .Include(t => t.TicketStatus)
                                    .Include(t => t.TicketType)
                                    .Include(t => t.Comments)
                                    .ThenInclude(c => c.User)
                                    .Include(t => t.Attachments)
                                    .Include(t => t.History)
                                    .FirstOrDefaultAsync(t => t.Id == ticketId);

            return ticket;

        }

        public async Task<User> GetTicketDeveloperAsync(int ticketId, int companyId)
        {
            User developer = new User();


            Ticket ticket = (await GetAllTicketsByCompanyAsync(companyId)).FirstOrDefault(t => t.Id == ticketId);

            if (ticket?.DeveloperUserId is not null)
            {
                developer = ticket.DeveloperUser;
            }

            return developer;

        }

        public async Task<List<Ticket>> GetTicketsByRoleAsync(string role, int userId, int companyId)
        {

            List<Ticket> tickets = new List<Ticket>();

            if (role == Roles.Admin.ToString())
            {
                tickets = await GetAllTicketsByCompanyAsync(companyId);
            }

            if (role == Roles.Developer.ToString())
            {
                tickets = (await GetAllTicketsByCompanyAsync(companyId))
                            .Where(t => t.DeveloperUserId == userId).ToList();
            }

            if (role == Roles.Submitter.ToString())
            {
                tickets = (await GetAllTicketsByCompanyAsync(companyId))
                            .Where(t => t.OwnerUserId == userId).ToList();
            }

            if (role == Roles.ProjectManager.ToString())
            {
                tickets = await GetTicketsByUserIdAsync(userId, companyId);
            }

            return tickets;

        }

        public async Task<List<Ticket>> GetTicketsByUserIdAsync(int userId, int companyId)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            List<Ticket> tickets = new List<Ticket>();



            tickets = (await _ProjectService.GetAllProjectsByCompanyAsync(companyId))
                                                    .SelectMany(t => t.Tickets)
                                                    .ToList();


            //if (await _RolesService.IsUserInRoleAsync(user, Roles.Admin.ToString()))
            //{
            //    tickets = (await _ProjectService.GetAllProjectsByCompanyAsync(companyId))
            //                                        .SelectMany(t => t.Tickets)
            //                                        .ToList();
            //}

            //if (await _RolesService.IsUserInRoleAsync(user, Roles.Developer.ToString()))
            //{
            //    tickets = (await _ProjectService.GetAllProjectsByCompanyAsync(companyId))
            //                                        .SelectMany(t => t.Tickets)
            //                                        .Where(t => t.DeveloperUserId == userId)
            //                                        .ToList();
            //}

            //if (await _RolesService.IsUserInRoleAsync(user, Roles.Submitter.ToString()))
            //{
            //    tickets = (await _ProjectService.GetAllProjectsByCompanyAsync(companyId))
            //                                        .SelectMany(t => t.Tickets)
            //                                        .Where(t => t.OwnerUserId == userId)
            //                                        .ToList();
            //}

            //if (await _RolesService.IsUserInRoleAsync(user, Roles.ProjectManager.ToString()))
            //{
            //    tickets = (await _ProjectService.GetUserProjectsAsync(userId))
            //                                        .SelectMany(t => t.Tickets)
            //                                        .ToList();
            //}
            return tickets;


        }

        public async Task<int?> LookupTicketPriorityIdAsync(string priorityName)
        {

            Models.TicketPriority priority = await _context.TicketPriorities.FirstOrDefaultAsync(t => t.Name == priorityName);
            return priority?.Id;

        }

        public async Task<int?> LookupTicketStatusIdAsync(string statusName)
        {

            Models.TicketStatus status = await _context.TicketStatuses.FirstOrDefaultAsync(t => t.Name == statusName);
            return status?.Id;

        }

        public async Task<int?> LookupTicketTypeIdAsync(string typeName)
        {

            Models.TicketType type = await _context.TicketTypes.FirstOrDefaultAsync(t => t.Name == typeName);
            return type?.Id;

        }

        public async Task UpdateTicketAsync(Ticket ticket)
        {

            _context.Update(ticket);
            await _context.SaveChangesAsync();

        }

        public Task<List<Ticket>> GetProjectTicketsByRoleAsync(string role, int userId, int projectId, int companyId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Ticket>> GetProjectTicketsByStatusAsync(string statusName, int companyId, int projectId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Ticket>> GetProjectTicketsByPriorityAsync(string priorityName, int companyId, int projectId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Ticket>> GetProjectTicketsByTypeAsync(string typeName, int companyId, int projectId)
        {
            throw new NotImplementedException();
        }

        public async Task<User?> GetUserById(int id)
        {
            return await _context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();
        }
    }
}
