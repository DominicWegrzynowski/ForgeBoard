using forgeboard.api.Data;
using forgeboard.api.Models;
using forgeboard.api.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace forgeboard.api.Services.CompanyInfoService
{
    public class CompanyInfoService : ICompanyInfoService
    {
        private readonly ForgeBoardDbContext _context;

        public CompanyInfoService(ForgeBoardDbContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAdminsByCompanyId(int companyId)
        {
            List<User> admins = new();

            foreach (var user in _context.Users)
            {
                if (user.CompanyId == companyId)
                {
                    //Authorize if user admin
                    admins.Add(user);
                }
            }

            return admins;
        }

        public async Task<User> GetUserById(int id, int companyId)
        {
            var user = await _context.Users
                .Where(u => u.Id == id && u.CompanyId == companyId)
                .FirstOrDefaultAsync<User>();

            return user;
        }

        public async Task<List<User>> GetAllMembersAsync(int companyId)
        {
            return await _context.Users
                .Where(u => u.CompanyId == companyId)
                .ToListAsync<User>();
        }

        public async Task<List<Project>> GetAllProjectsAsync(int companyId)
        {
            return await _context.Projects
                .Where(p => p.CompanyId == companyId)
                .Include(p => p.Members) //Eager loading these properties
                .Include(p => p.Tickets)
                    .ThenInclude(t => t.Comments)
                .Include(p => p.Tickets)
                    .ThenInclude(t => t.Attachments)
                .Include(p => p.Tickets)
                    .ThenInclude(t => t.History)
                .Include(p => p.Tickets)
                    .ThenInclude(t => t.DeveloperUser)
                .Include(p => p.Tickets)
                    .ThenInclude(t => t.OwnerUser)
                .Include(p => p.Tickets)
                    .ThenInclude(t => t.TicketStatus)
                .Include(p => p.Tickets)
                    .ThenInclude(t => t.TicketPriority)
                .Include(p => p.Tickets)
                    .ThenInclude(t => t.TicketType)
                .Include(p => p.ProjectPriority)
                .ToListAsync();
        }

        public async Task<List<Ticket>> GetAllTicketsAsync(int companyId)
        {
            List<Ticket> result = new List<Ticket>();
            List<Project> projects = new List<Project>();

            projects = await GetAllProjectsAsync(companyId);

            result = projects.SelectMany(p => p.Tickets).ToList();

            return result;
        }

        public async Task<Company> GetCompanyInfoByIdAsync(int? companyId)
        {
            Company result = new();

            if (companyId is not null)
            {
                result = await _context.Companies
                    .Include(c => c.Members)
                    .Include(c => c.Projects)
                    .Include(c => c.Invites)
                    .FirstOrDefaultAsync(c => c.Id == companyId);
            }

            return result;
        }

        public Task<User> GetUserById(string id, int companyId)
        {
            throw new NotImplementedException();
        }
    }
}
