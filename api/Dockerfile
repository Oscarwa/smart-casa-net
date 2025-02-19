# Use the .NET SDK image (includes tools needed for hot reload)
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS dev
WORKDIR /app

# Install EF Core CLI globally
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Copy everything and restore dependencies
COPY . ./
WORKDIR /app/Eventapp.API
RUN dotnet restore

# Expose ports for the API and debugging
EXPOSE 8080 5001

# Run in watch mode to enable hot reload
CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:8080"]