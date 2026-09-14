using forgeboard.api.Endpoints;
using forgeboard.api.Startup;

var builder = WebApplication.CreateBuilder(args);

builder.AddDependencies();

var app = builder.Build();

app.UseOpenApi();

app.UseHttpsRedirection();

//app.UseAuthentication();
//app.UseAuthorization();
app.MapTicketPriorityEndpoints();
//Add Other endpoints

app.Run();