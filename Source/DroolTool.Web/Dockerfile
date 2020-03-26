FROM mcr.microsoft.com/dotnet/core/aspnet:3.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /src

ENV NODE_VERSION 12.16.1
ENV NODE_DOWNLOAD_SHA 4fe8c3454f9bee5bbe72d44aa25cd931859b3037b7a9473081b3b2bd1b465b95

RUN curl -SL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz" --output nodejs.tar.gz \
    && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
    && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
    && rm nodejs.tar.gz \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs

    
COPY DroolTool.Web/                        ./DroolTool.Web

RUN dotnet restore DroolTool.Web/DroolTool.Web.csproj

RUN dotnet build ./DroolTool.Web/DroolTool.Web.csproj -c Release -o /app
WORKDIR /src/DroolTool.Web/

RUN npm cache clean --force
RUN npm uninstall   -g angular-cli
RUN npm install     -g @angular/cli@8.3.9
RUN npm install

ARG env
RUN npm run build-${env}

FROM build AS publish
RUN dotnet publish DroolTool.Web.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "DroolTool.Web.dll"]
