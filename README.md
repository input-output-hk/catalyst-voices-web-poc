
# Catalyst Voices - Web based Voting Center - POC

Welcome to the Catalyst Voices - Web based Voting Center - Proof of Concept.

Please see [Catalyst Voices](https://github.com/input-output-hk/catalyst-voices) for further developments.

- [Catalyst Voices - Web based Voting Center - POC](#catalyst-voices---web-based-voting-center---poc)
  - [Prerequisites](#prerequisites)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Tech Stack](#tech-stack)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [Installation](#installation)
  - [Building the Project](#building-the-project)
  - [Dockerization](#dockerization)
    - [Prerequisites](#prerequisites-1)
    - [Running the Application](#running-the-application)
    - [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
    - [Backend](#backend-2)
      - [Example](#example)
    - [Frontend](#frontend-2)
      - [Example](#example-1)
  - [Running Locally](#running-locally)
    - [Running the Backend Locally](#running-the-backend-locally)
    - [Running the Application Locally](#running-the-application-locally)
  - [Connecting a Wallet](#connecting-a-wallet)
  - [API Docs](#api-docs)

## Prerequisites

### Backend

Before starting, please ensure you have the following:

- Node.js and npm - You can download them from [here](https://nodejs.org/en/download/).
- PostgresSQL - You can download it from [here](https://www.postgresql.org/).

To operate the backend, you need a local or cloud-based PostgreSQL database. Once the database is set up, you must provide the required variables for its configuration to the backend via the .env file located in the backend directory (`HOST`, `PORT`, `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`).

### Frontend

Before starting, please ensure you have the following:

- Node.js and npm - You can download them from [here](https://nodejs.org/en/download/).
- Nufi or Eternl wallet extension - These can be installed from their respective websites or browser extension stores.

## Tech Stack

### Backend

- Server: [Node](https://nodejs.org/en/about/), [Strapi](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html)
- Database: [PostgreSQL](https://www.postgresql.org/)
- Container: [Docker](https://docs.docker.com/get-started/)

### Frontend

- [React](https://react.dev/)

## Installation

To get started with the project, clone this repository to your local machine. Navigate into the project's root directory in your terminal and run the following command to install all the necessary dependencies:

```sh
npm install
```

## Building the Project

To build the project, run the following command:

```sh
npm run build
```

This will initiate the build process. The script builds the application in production mode, optimizes it for the best performance, and outputs the build files into the build folder. The build is minified and the filenames include hashes.

## Dockerization

[Docker](https://docs.docker.com/get-started/) provides an open platform for developing, shipping, and running applications, enabling you to separate your applications from your infrastructure to deliver software rapidly.

### Prerequisites

Ensure Docker is installed on your machine. If not, you can find the installation guide [here](https://docs.docker.com/get-docker/).

### Running the Application

The Catalyst Voting Center application can be run in Docker containers for both the frontend and backend. This can be achieved with a single command:

```sh
docker compose up
```

This command will simultaneously start both frontend and backend services as defined in the Docker Compose configuration.

### Configuration

The Docker Compose configuration can be found in the [`docker-compose.yaml`](./docker-compose.yaml) file.

The Docker configuration for the individual services is defined in their respective Dockerfiles. You can find the Dockerfile for this service [here](./voting-center-backend/Dockerfile). Adjustments to the Docker configurations can be made in these files.

## Environment Variables

### Backend

These are the important environment variables that are required for the project to run properly:

```sh
HOST={project_host}
PORT={project_port}
DATABASE_HOST={database_host}
DATABASE_PORT={database_port}
DATABASE_NAME={database_name}
DATABASE_USERNAME={database_username}
DATABASE_PASSWORD={database_password}
APP_KEYS={project_app_keys}
API_TOKEN_SALT={project_api_token_salt}
ADMIN_JWT_SECRET={project_admin_jwt_secret}
JWT_SECRET={project_jwt_secret}
NODE_ENV={node_env}
SENTRY_DSN={sentry_dsn} // Optional for development
BLOCKFROST_KEY={project_blockfrost_api_key} // Needed for transaction validation
BLOCKFROST_URL={blockfronst_url}
CATALYST_CORE_API_URL={catalyst_core_api_url}
```

#### Example

```sh
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

### Frontend

These are the important environment variables that are required for the project to run properly:

```sh
FAST_REFRESH=false
REACT_APP_BASE_URL={backend_url}
REACT_APP_CATALYST_CORE_API_URL={catalyst_core_api_url}
REACT_APP_AUTH_TOKEN={backend_full_access_token}
REACT_APP_SHARETHIS_PROPERTY_ID={your_sharethis_id} // optional for development
REACT_APP_SENTRY_DSN={your_sentry_dsn} // optional for development
REACT_APP_CARDANOSCAN_BASE_URL={cardanoscan_url}
REACT_APP_FRONTEND_URL={frontend_url}
```

#### Example

```sh
FAST_REFRESH=false
REACT_APP_BASE_URL=http://localhost:1337
REACT_APP_CATALYST_CORE_API_URL=https://api.dev.projectcatalyst.io/
REACT_APP_AUTH_TOKEN=000e721ab4e32917c33c1228888e986c903b936106944a22009cf6f3e685c1a138cc7ea01568902bb3105c42d4aab2cfeae4bdd1f61c864610f298f32d1ccf5bebc343fd932cd2332657973ef60d51f61d7d14c5beb42117924d562e3d62df88e4e48ad3b0b9df402733423988d66d54f77cb9ad60b36e12a14ab9610e9386b1
REACT_APP_SHARETHIS_PROPERTY_ID=111112222333334444455555
REACT_APP_CARDANOSCAN_BASE_URL=https://preprod.cardanoscan.io/
REACT_APP_FRONTEND_URL=http://localhost:3000
```

## Running Locally

### Running the Backend Locally

To start the project in development mode (editing of collection types is enabled) and `autoReload` server enabled, run:

```sh
npm run develop
```

To start the backend, which is not in development mode, run:

```sh
npm run start
```

Upon starting the backend (<http://localhost:1337/>), an admin dashboard is automatically generated. It's crucial to create an admin user who will have complete control over this dashboard. Within the `settings` collection, it's necessary to configure the `event_id`, which corresponds to the id of the event for which you want to view proposals.

### Running the Application Locally

To start the application in your local environment, run:

```sh
npm start
```

This command starts the application in development mode. Open <http://localhost:3000> to view it in your browser.

## Connecting a Wallet

After the application has been opened, you will be prompted to connect your Nufi or Eternl wallet.
Please ensure you've already installed the corresponding wallet extension in your browser.

## API Docs

We use [Redoc](https://redocly.com/docs/redoc/quickstart/) and `yaml` files for describing our API.
The link to access the documentation is **{baseURL}/api-docs**.

- Main file for changing and updating docs is [`gvc-api.yaml`](./public/api-docs/gvc-api.yaml)
- [OpenAPI Specification v3.0.0](https://swagger.io/specification/) is used for describing the API
- Redoc is imported as a script and is optimized well, as it is.
