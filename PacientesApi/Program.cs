var builder = WebApplication.CreateBuilder(args);

// Habilitamos CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Añadimos controladores
builder.Services.AddControllers();

// Swagger (solo visible en desarrollo)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware de desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // Esto te habilita http://localhost:xxxx/swagger
}

app.UseCors("AllowFrontend");

// app.UseHttpsRedirection(); // ❌ Desactívala si no usas HTTPS en local
app.UseAuthorization();

app.MapControllers();

app.Run();
