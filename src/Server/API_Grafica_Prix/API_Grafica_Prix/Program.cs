using API_Grafica_Prix.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using API_Grafica_Prix.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);


builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// Add services to the container.

builder.Services.AddControllers();



var configuration = builder.Configuration;

var jwtSecretKey = configuration["JwtSettings:SecretKey"];
var emailSettings = new EmailSettings
{
    Email = configuration["EmailSettings:Email"],
    Senha = configuration["EmailSettings:Senha"],
    Destinatario = configuration["EmailSettings:Destinatario"]
};

builder.Services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));
builder.Services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("LeituraPolicy", policy =>
        policy.RequireClaim("Permissao", "Leitura")); // Apenas permissão de Leitura

    options.AddPolicy("EscritaPolicy", policy =>
        policy.RequireClaim("Permissao", "Escrita")); // Apenas permissão de Escrita

    options.AddPolicy("AdminPolicy", policy =>
        policy.RequireClaim("Permissao", "Admin")); // Apenas permissão de Admin
});


builder.Services.AddDbContext<PrixContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ISenhaService, SenhaService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtService, JwtService>();




builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddScoped<UsuarioLogado>();

builder.Services.AddAuthentication(options =>
{


    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;


})
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("g7IZLOhJHi5q4nPHBW2bkm7EgBfeii2F"))
        };



    });



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(c =>
{
    c.AllowAnyHeader();
    c.AllowAnyMethod();
    c.AllowAnyOrigin();
});

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();



app.MapControllers();

app.Run();
