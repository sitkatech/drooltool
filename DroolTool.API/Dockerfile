FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /src

COPY ./DroolTool.Models ./DroolTool.Models
COPY ./DroolTool.EFModels ./DroolTool.EFModels
COPY ./DroolTool.API ./DroolTool.API

RUN dotnet publish ./DroolTool.API/DroolTool.API.csproj -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app /app
EXPOSE 80
ENTRYPOINT ["dotnet", "DroolTool.API.dll"]
