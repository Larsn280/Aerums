using System.Text;
using Aerums_API.Data;
using Aerums_API.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<AerumsContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Sqlite"))
);

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(
  options =>
    {
      options.Password.RequireLowercase = false;
      options.Password.RequireUppercase = false;
      options.Password.RequiredLength = 1;
      options.Password.RequireNonAlphanumeric = false;
      options.Password.RequireDigit = false;

      options.User.RequireUniqueEmail = true;

      options.Lockout.MaxFailedAccessAttempts = 5;
      options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
    }
).AddEntityFrameworkStores<AerumsContext>();

builder.Services.AddAuthentication(options =>
{
  options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
  options.TokenValidationParameters = new TokenValidationParameters
  {
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(
          Encoding.ASCII.GetBytes(builder.Configuration.GetValue<string>("apiKey")!)
      ),
    ValidateLifetime = true,
    ValidateAudience = false,
    ValidateIssuer = false,
    ClockSkew = TimeSpan.Zero
  };
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{

  options.AddPolicy("aerums-react",
    policy =>
    {
      policy.AllowAnyHeader();
      policy.AllowAnyMethod();
      policy.WithOrigins(
        "http://localhost:3000");
    }
  );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("lnschool-react");

app.UseAuthorization();

app.MapControllers();

app.Run();
