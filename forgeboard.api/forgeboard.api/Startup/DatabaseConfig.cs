using forgeboard.api.Data;
using Microsoft.EntityFrameworkCore;


namespace forgeboard.api.Startup
{
    public static class DatabaseConfig
    {
        public const string ConnectionStringName = "DefaultConnection";

        public static void AddDatabaseServices(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString(ConnectionStringName)
                ?? throw new InvalidOperationException($"Connection string {ConnectionStringName} was not found.");

            services.AddDbContext<ForgeBoardDbContext>(options =>
            options.UseSqlServer(
                connectionString
            ));
            
        }
    }
}
