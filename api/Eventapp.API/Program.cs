
using Microsoft.AspNetCore.Identity;
using Eventapp.Model;
using Eventapp.Model.Entities;
using Eventapp.Services;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddScoped<UserManager<User>>();
builder.Services.AddScoped<SignInManager<User>>();

builder.Services.RegisterModels(builder.Configuration);
builder.Services.RegisterServices(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddHealthChecks();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options.Title = "Eventapp API";
        options.Servers = [];
    });
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseHttpsRedirection();
}


app.UseRouting();
app.UseCors();
app.UseAuthorization();
app.UseAuthentication();

app.UseHealthChecks("/health");

app.MapControllers();

app.Run();

