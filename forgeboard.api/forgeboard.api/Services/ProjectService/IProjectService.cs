using forgeboard.api.Models;

namespace forgeboard.api.Services.ProjectService
{
    public interface IProjectService
    {
        public Task AddNewProjectAsync(Project project);
        public Task<bool> AddProjectManagerAsync(int userId, int projectId);
        public Task<bool> AddUserToProjectAsync(int userId, int projectId);
        public Task ArchiveProjectAsync(Project project);
        public Task<List<Project>> GetAllProjectsByCompanyAsync(int companyId);
        public Task<List<Project>> GetAllProjectsByPriorityAsync(int companyId, string priorityName);
        public Task<List<User>> GetAllProjectMembersExceptPMAsync(int projectId);
        public Task<List<Project>> GetArchivedProjectsByCompanyAsync(int companyId);
        public Task<List<User>> GetDevelopersOnProjectAsync(int projectId);
        public Task<User> GetProjectManagerAsync(int projectId);
        public Task<List<User>> GetProjectMembersByRoleAsync(int projectId, string role);
        public Task<Project> GetProjectByIdAsync(int projectId, int companyId);
        public Task<List<User>> GetSubmittersOnProjectAsync(int projectId);
        public Task<List<Project>> GetUnassignedProjectsAsync(int companyId);
        public Task<List<User>> GetUsersNotOnProjectAsync(int projectId, int companyId);
        public Task<List<Project>> GetUserProjectsAsync(int userId);
        public Task<bool> IsAssignedProjectManagerAsync(int userId, int projectId);
        public Task<bool> IsUserOnProjectAsync(int userId, int projectId);
        public Task<int> LookupProjectPriorityId(string priorityName);
        public Task RemoveProjectManagerAsync(int projectId);
        public Task RemoveUsersFromProjectByRoleAsync(string role, int projectId);
        public Task RemoveUserFromProjectAsync(int userId, int projectId);
        public Task RestoreProjectAsync(Project project);
        public Task UpdateProjectAsync(Project project);
    }
}
