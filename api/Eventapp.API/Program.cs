
using Microsoft.AspNetCore.Identity;
using Eventapp.Model;
using Eventapp.Model.Entities;
using Eventapp.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<UserManager<User>>();
builder.Services.AddScoped<SignInManager<User>>();

builder.Services.RegisterModels(builder.Configuration);
builder.Services.RegisterServices(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseHttpsRedirection();
}

app.UseRouting();
app.UseAuthorization();
app.UseAuthentication();

app.UseHealthChecks("/health");

app.MapControllers();

app.Run();

