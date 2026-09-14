using forgeboard.api.Data;

namespace forgeboard.api.Startup
{
    public static class Dependencies
    {
        public static void AddDependencies(this WebApplicationBuilder builder)
        {
            builder.Services.AddOpenApiServices();
            builder.Services.AddDatabaseServices(builder.Configuration);
            builder.Services.AddControllers();
            // Add other dependencies here, such as repositories, services, etc.
        }
    }
}
