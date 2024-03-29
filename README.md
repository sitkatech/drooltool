The Urban Drool Tool application is built by Sitka Technology Group (https://sitkatech.com) in partnership with Geosyntec Consultants (https://geosyntec.com) for Orange County Public Works and the Moulton-Niguel Water District. This program is free software; you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation.

Please contact support@sitkatech.com with any questions about this project.

# Developer Set-up Instructions
## Prerequisites

1. Install Visual Studio 2019
2. Install Visual Studio Code
3. Install Docker
4. Install Node.js
5. Install these extensions for Visual Studio Code:

- Angular CLI
- Debugger for Chrome
- Docker
- npm support for VS Code
- npm commands for VS Code
- npm Intellisense

## DroolTool Set-up (API)

1. Clone the git repository to your development machine
2. Create an empty database called DroolToolDB and create a user for it. Give the user the owner role.
3. Copy [repo root dir]\docker-compose\.env.template to [repo root dir]\docker-compose\.env
4. Update the values in the new .env file
5. Add an entry to your hosts file pointing RIO_WEB_URL from the .env file to 127.0.0.1
6. Open the solution in VS19 and set docker-compose as the startup project
7. Press the green "play" triangle to start the API server

## DroolTool Set-up (Web)
1. Open the drooltool-web-workspace in VSC ([repo root dir]\DroolTool.Web)
2. Open the VSC terminal and run npm install, then npm build, then npm start.
3. Press F5 to open the web app in Google Chrome. You will be able to debug JavaScript directly in VSC.
