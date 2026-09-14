namespace forgeboard.api.Startup
{
    public static class CORSConfig
    {
        public const string PolicyName = "ForgeBoardClient";
        public static void AddCorsServices(this IServiceCollection services, IConfiguration configuration)
        {
            var clientUrl = configuration["ClientUrl"] ?? throw new InvalidOperationException("ClientUrl configuration was not found");

            services.AddCors(options => 
            {
                options.AddPolicy(PolicyName, policy => 
                {
                    policy
                        .WithOrigins(clientUrl)
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
        }

        public static void UseCorsPolicy(this WebApplication app)
        {
            app.UseCors(PolicyName);
        }
    }
}
