using api.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var conString = builder.Environment.IsDevelopment() ? builder.Configuration.GetConnectionString("DevelopmentConnection") : builder.Configuration.GetConnectionString("DefaultConnection");
Console.WriteLine("connection string: " + conString);
builder.Services.AddControllers()
 .AddJsonOptions(options =>
 {
     options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
     options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
 });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(conString));
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddIdentityCore<IdentityUser>(options => {
    options.SignIn.RequireConfirmedAccount = false;
    options.User.RequireUniqueEmail = true;
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
})
.AddEntityFrameworkStores<ApplicationDbContext>();

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddAntiforgery();


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()       
              .AllowAnyMethod()       
              .AllowAnyHeader();      
    });
});

var app = builder.Build();
Console.WriteLine( "#### Informacoes do ambiente: " + app.Environment.ToString());
Console.WriteLine( "#### Development: " + app.Environment.IsDevelopment());

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();
    await SeedDefaultUserAsync(services);
}


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors();

app.MapControllers();

app.Run();

async Task SeedDefaultUserAsync(IServiceProvider services)
{
    var userManager = services.GetRequiredService<UserManager<IdentityUser>>();

    const string defaultUserName = "desafio";
    const string defaultEmail = "desafio@desafio.com";
    const string defaultPassword = "desafio123";

    if (await userManager.FindByEmailAsync(defaultUserName) == null)
    {
        var defaultUser = new IdentityUser
        {
            UserName = defaultUserName,
            Email = defaultEmail,
            EmailConfirmed = true
        };

        var result = await userManager.CreateAsync(defaultUser, defaultPassword);
    }
}
