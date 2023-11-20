<img src="./public/uploads/logo.png" width='80px' />

# Catalyst Voting Center - Backend

Welcome to the official repository for the Catalyst Voting Center.

## Table of content:

- [Prerequisites](#prerequisites)
- [Tech stack](#tech-stack)
- [Installation](#installation)
- [Building the project](#building-the-project)
- [Dockerization](#dockerization)
- [API Docs](#api-docs)
- [Environment variables](#environment-variables)
- [Running the backend locally](#running-the-backend-locally)

## Prerequisites

Before starting, please ensure you have the following:

1. Node.js and npm - You can download them from [here](https://nodejs.org/en/download/).
2. PostgresSQL - You can download them from [here](https://www.postgresql.org/).

To operate the backend, you need a local or cloud-based PostgreSQL database. Once the database is set up, you must provide the required variables for its configuration to the backend via the .env file located in the backend directory (`HOST`, `PORT`, `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`).

## Tech stack:

**Server:** [Node](https://nodejs.org/en/about/), [Strapi](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html)

**Database:** [PostgreSQL](https://www.postgresql.org/)

**Container:** [Docker](https://docs.docker.com/get-started/)

## Installation

To get started with the project, clone this repository to your local machine. Navigate into the project's root directory in your terminal and run the following command to install all necessary dependencies:

```
npm install
```

## Building the project

To build the project, run the following command:

```
npm run build
```

This will initiate the build process. The script builds the application in production mode, optimizes it for the best performance, and outputs the build files into the build folder. The build is minified and the filenames include hashes.

## Dockerization

[Docker](https://docs.docker.com/get-started/) provides an open platform for developing, shipping, and running applications, enabling you to separate your applications from your infrastructure to deliver software rapidly.

#### Prerequisites

Ensure Docker is installed on your machine. If not, you can find the installation guide [here](https://docs.docker.com/get-docker/).

#### Running the application

The Catalyst Voting Center application can be run in Docker containers for both the frontend and backend. This can be achieved with a single command:

```
docker compose up
```

This command will simultaneously start both frontend and backend services as defined in the Docker Compose configuration.

#### Configuration

The Docker Compose configuration can be found in the
[`docker-compose.yaml`](../docker-compose.yaml) file.

The Docker configuration for the individual services is defined in their respective Dockerfiles. You can find the Dockerfile for this service [here](./Dockerfile). Adjustments to the Docker configurations can be made in these files.

## API Docs

We use [Redoc](https://redocly.com/docs/redoc/quickstart/) and `yaml` files for describing our API. The link to access the documentation is
**{baseURL}/api-docs**.

- Main file for changing and updating docs is [`gvc-api.yaml`](./public/api-docs/gvc-api.yaml)

- [OpenAPI Specification v3.0.0](https://swagger.io/specification/) is used for describing the API

- Redoc is imported as a script and is optimized well, as it is.

## Environment variables

These are the important environment variables that are required for the project to run properly:

```
HOST={project_host}
PORT={project_port}
DATABASE_HOST={database_host}
DATABASE_PORT={databse_port}
DATABASE_NAME={databse_name}
DATABASE_USERNAME={databse_username}
DATABASE_PASSWORD={databse_password}
APP_KEYS={project_app_keys}
API_TOKEN_SALT={project_api_token_salt}
ADMIN_JWT_SECRET={proejct_admin_jwt_secret}
JWT_SECRET={project_jwt_secret}
NODE_ENV={node_env}
SENTRY_DSN={sentry_dsn} // Optional for development
BLOCKFROST_KEY={project_blockfrost_api_key} // Needed for transaction validation
BLOCKFROST_URL={blockfronst_url}
CATALYST_CORE_API_URL={catalyst_core_api_url}

```

### Example of environment variables

```
HOST=0.0.0.0
PORT=1337
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=gvcDB
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
APP_KEYS=oHALYxehalk5k02qBZcTbg==,iGa6t2cysUfm+X3F+fdgNQ==,DBF+oC+F3NzIOWEYNG81iA==,NzoFHf+LKaodqYjEpUs0Fw==
API_TOKEN_SALT=Mda37Yk/R5CqywOygvaZ4Q==
ADMIN_JWT_SECRET=kEdxKbjGcR0fqzRKQop0gA==
JWT_SECRET=zniSMBNuX91kZznZZm9s4g==
NODE_ENV=development
BLOCKFROST_KEY=preprodjJHjJNknknkllknlkNlnLn
BLOCKFROST_URL=https://cardano-preprod.blockfrost.io/api/
CATALYST_CORE_API_URL=https://api.dev.projectcatalyst.io
```

## Running the backend locally

To start the project in development mode (editing of collection types is enabled) and `autoReload` server
enabled, run:

```
npm run develop
```

To start the backend, which is not in development mode, run:

```
npm run start
```

Upon starting the backend (http://localhost:1337/), an admin dashboard is automatically generated. It's crucial to create an admin user who will have complete control over this dashboard. Within the `settings` collection, it's necessary to configure the `event_id`, which corresponds to the id of the event for which you want to view proposals.
