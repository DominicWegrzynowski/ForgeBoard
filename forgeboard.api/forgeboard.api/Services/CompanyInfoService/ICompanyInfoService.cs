using forgeboard.api.Models;

namespace forgeboard.api.Services.CompanyInfoService
{
    public interface ICompanyInfoService
    {
        public Task<Company> GetCompanyInfoByIdAsync(int? companyId);
        public Task<List<User>> GetAdminsByCompanyId(int companyId);
        public Task<User> GetUserById(string id, int companyId);
        public Task<List<User>> GetAllMembersAsync(int companyId);
        public Task<List<Project>> GetAllProjectsAsync(int companyId);
        public Task<List<Ticket>> GetAllTicketsAsync(int companyId);
    }
}
