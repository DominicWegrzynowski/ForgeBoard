using forgeboard.api.Services.CompanyInfoService;
using forgeboard.api.Services.ProjectService;
using forgeboard.api.Services.TicketService;

namespace forgeboard.api.Startup
{
    public static class Dependencies
    {
        public static void AddDependencies(this WebApplicationBuilder builder)
        {
            builder.Services.AddOpenApiServices();
            builder.Services.AddDatabaseServices(builder.Configuration);
            builder.Services.AddCorsServices(builder.Configuration);
            builder.Services.AddControllers();
            builder.Services.AddScoped<ITicketService, TicketService>();
            builder.Services.AddScoped<IProjectService, ProjectService>();
            builder.Services.AddScoped<ICompanyInfoService, CompanyInfoService>();
        }
    }
}
