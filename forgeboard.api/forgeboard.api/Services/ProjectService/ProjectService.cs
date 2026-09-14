using forgeboard.api.Data;
using forgeboard.api.Models;
using forgeboard.api.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace forgeboard.api.Services.ProjectService
{
    public class ProjectService : IProjectService
    {
        private readonly ForgeBoardDbContext _context;
        public ProjectService(ForgeBoardDbContext context)
        {
            _context = context;
        }
        public async Task AddNewProjectAsync(Project project)
        {

            _context.Add(project);
            await _context.SaveChangesAsync();

        }
        public async Task<bool> AddProjectManagerAsync(int userId, int projectId)
        {
            User currentPM = await GetProjectManagerAsync(projectId);
            if (currentPM is not null)
            {

                await RemoveProjectManagerAsync(projectId);

            }

            //Add new PM

            await AddUserToProjectAsync(userId, projectId);
            return true;

        }
        public async Task<bool> AddUserToProjectAsync(int userId, int projectId)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user is not null)
            {
                Project project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == projectId);
                if (!await IsUserOnProjectAsync(userId, projectId))
                {

                    project.Members.Add(user);
                    await _context.SaveChangesAsync();
                    return true;

                }
                else
                {
                    Console.WriteLine($"{user.FullName} is already on the project!");
                    return false;
                }
            }
            else
            {
                Console.WriteLine($"User does not exist");
                return false;
            }
        }
        public async Task ArchiveProjectAsync(Project project)
        {

            project.Archived = true;
            await UpdateProjectAsync(project);

            foreach (var ticket in project.Tickets)
            {
                ticket.ArchivedByProject = true;
                _context.Update(ticket);
                await _context.SaveChangesAsync();
            }


        }
        public async Task<List<User>> GetAllProjectMembersExceptPMAsync(int projectId)
        {
            List<User> developers = await GetProjectMembersByRoleAsync(projectId, Roles.Developer.ToString());
            List<User> submitters = await GetProjectMembersByRoleAsync(projectId, Roles.Submitter.ToString());
            List<User> admins = await GetProjectMembersByRoleAsync(projectId, Roles.Admin.ToString());
            List<User> teamMembers = developers.Concat(submitters).Concat(admins).ToList();

            return teamMembers;
        }
        public async Task<List<Project>> GetAllProjectsByCompanyAsync(int companyId)
        {

            List<Project> projects = await _context.Projects.Where(p => p.CompanyId == companyId && p.Archived == false)
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

            return projects;

        }
        public async Task<List<Project>> GetAllProjectsByPriorityAsync(int companyId, string priorityName)
        {
            List<Project> projects = await GetAllProjectsByCompanyAsync(companyId);
            int priorityId = await LookupProjectPriorityId(priorityName);

            return projects.Where(p => p.ProjectPriorityId == priorityId).ToList();
        }
        public async Task<List<Project>> GetArchivedProjectsByCompanyAsync(int companyId)
        {

            List<Project> projects = await _context.Projects.Where(p => p.CompanyId == companyId && p.Archived == true)
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

            return projects;

        }
        public Task<List<User>> GetDevelopersOnProjectAsync(int projectId)
        {
            throw new System.NotImplementedException();
        }
        public async Task<Project> GetProjectByIdAsync(int projectId, int companyId)
        {
            Project project = await _context.Projects
                                            .Include(p => p.Tickets)
                                                .ThenInclude(t => t.TicketStatus)
                                            .Include(p => p.Tickets)
                                                .ThenInclude(t => t.TicketPriority)
                                            .Include(p => p.Members)
                                            .Include(p => p.ProjectPriority)
                                            .FirstOrDefaultAsync(p => p.Id == projectId && p.CompanyId == companyId);

            return project;
        }
        public async Task<User> GetProjectManagerAsync(int projectId)
        {
            Project project = await _context.Projects
                                            .Include(p => p.Members)
                                            .FirstOrDefaultAsync(p => p.Id == projectId);

            foreach (var member in project?.Members)
            {
                //Authorize if Project manager later
                return member;

            }

            return null;
        }
        public async Task<List<User>> GetProjectMembersByRoleAsync(int projectId, string role)
        {
            Project project = await _context.Projects
                                            .Include(p => p.Members)
                                            .FirstOrDefaultAsync(p => p.Id == projectId);

            List<User> members = new List<User>();
            foreach (var member in project.Members)
            {

                //Authorize if user is a project member within the incominig role
                members.Add(member);
            }

            return members;
        }
        public Task<List<User>> GetSubmittersOnProjectAsync(int projectId)
        {
            throw new System.NotImplementedException();
        }
        public async Task<List<Project>> GetUnassignedProjectsAsync(int companyId)
        {
            List<Project> result = new();
            List<Project> projects = new();


            projects = await _context.Projects.Include(p => p.ProjectPriority)
                                              .Where(p => p.CompanyId == companyId)
                                              .ToListAsync();

            foreach (Project project in projects)
            {
                if ((await GetProjectMembersByRoleAsync(project.Id, nameof(Roles.ProjectManager))).Count == 0)
                {
                    result.Add(project);
                }
            }


            return result;
        }
        public async Task<List<Project>> GetUserProjectsAsync(int userId)
        {

            List<Project> userProjects = (await _context.Users
                                                       .Include(u => u.Projects)
                                                            .ThenInclude(p => p.Company)
                                                       .Include(u => u.Projects)
                                                            .ThenInclude(p => p.Members)
                                                       .Include(u => u.Projects)
                                                            .ThenInclude(p => p.Tickets)
                                                       .Include(u => u.Projects)
                                                            .ThenInclude(p => p.Tickets)
                                                                .ThenInclude(t => t.DeveloperUser)
                                                       .Include(u => u.Projects)
                                                            .ThenInclude(p => p.Tickets)
                                                                .ThenInclude(t => t.OwnerUser)
                                                       .Include(u => u.Projects)
                                                            .ThenInclude(p => p.Tickets)
                                                                .ThenInclude(t => t.TicketPriority)
                                                       .Include(u => u.Projects)
                                                            .ThenInclude(p => p.Tickets)
                                                                .ThenInclude(t => t.TicketStatus)
                                                       .Include(u => u.Projects)
                                                            .ThenInclude(p => p.Tickets)
                                                                .ThenInclude(t => t.TicketType)
                                                       .FirstOrDefaultAsync(u => u.Id == userId)).Projects.ToList();

            return userProjects;

        }
        public async Task<List<User>> GetUsersNotOnProjectAsync(int projectId, int companyId)
        {
            List<User> users = await _context.Users.Where(u => u.Projects.All(p => p.Id != projectId)).ToListAsync();

            return users.Where(u => u.CompanyId == companyId).ToList();
        }
        public async Task<bool> IsAssignedProjectManagerAsync(int userId, int projectId)
        {

            int? projectManagerId = (await GetProjectManagerAsync(projectId))?.Id;

            return projectManagerId == userId ? true : false; //if projectManagerId == userId return true, else return false

        }
        public async Task<bool> IsUserOnProjectAsync(int userId, int projectId)
        {
            Project project = await _context.Projects.Include(p => p.Members).FirstOrDefaultAsync(p => p.Id == projectId);

            bool result = false;

            if (project != null)
            {
                result = project.Members.Any(m => m.Id == userId);
            }

            return result;
        }
        public async Task<int> LookupProjectPriorityId(string priorityName)
        {
            int priorityId = (await _context.ProjectPriorities.FirstOrDefaultAsync(p => p.Name == priorityName)).Id;
            return priorityId;
        }
        public async Task RemoveProjectManagerAsync(int projectId)
        {
            Project project = await _context.Projects
                                            .Include(p => p.Members)
                                            .FirstOrDefaultAsync(p => p.Id == projectId);


            foreach (User member in project?.Members)
            {
                //Athorize is user is project manager
                await RemoveUserFromProjectAsync(member.Id, projectId);
            }

        }
        public async Task RemoveUserFromProjectAsync(int userId, int projectId)
        {

            User user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            Project project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == projectId);


            if (await IsUserOnProjectAsync(user.Id, projectId))
            {
                project.Members.Remove(user);
                await _context.SaveChangesAsync();
            }
        }
        public async Task RemoveUsersFromProjectByRoleAsync(string role, int projectId)
        {

            List<User> members = await GetProjectMembersByRoleAsync(projectId, role);
            Project project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == projectId);

            foreach (var member in members)
            {

                project.Members.Remove(member);
                await _context.SaveChangesAsync();


            }

        }
        public async Task RestoreProjectAsync(Project project)
        {

            project.Archived = false;
            await UpdateProjectAsync(project);

            foreach (var ticket in project.Tickets)
            {
                ticket.ArchivedByProject = false;
                _context.Update(ticket);
                await _context.SaveChangesAsync();
            }

        }
        public async Task UpdateProjectAsync(Project project)
        {
            _context.Update(project);
            await _context.SaveChangesAsync();
        }
    }
}