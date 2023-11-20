#  Voting-center-automation-tests

## Table of Contents

-   [Description](#description)
-   [Prerequisites](#prerequisites)
-   [How to clone repo](#how-to-clone-repo)
-   [How to run UI tests](#how-to-run-ui-tests)
-   [How to run all API tests](#how-to-run-all-api-tests)

---

## Description

This repo contains automation tests (UI and API) for GVC

---

## Prerequisites

**Node v14.x^**

- Install Node modules, run:

  ```
  npm i
  ```

- Check if you already have Node installed, run:

  ```
  node -v
  ```

**NPM v6.x^**

- Check if you already have npm installed, run:

  ```
  npm -v
  ```
- **GoogleChrome** and **Chromedriver** must be same versions

- Only on v108 of Google Chome and Chrome driver, running tests works without running Chrome driver in a separate terminal

---

## How to clone repo

- Clone repo `gvc`, run:

  ```
  git clone https://github.com/input-output-hk/gvc.git
  ```

- Navigate to voting center automation folder, run:

  ```
  cd voting-center-automation
  ```

- To install all dependencies, run:

  ```
  npm install
  ```
  
---

## How to run UI tests

- `env` should be `dev` or `qa`

  Note: Currently `qa` env is down
  
- To run all UI tests on local machine:
  
  ```
  ENV=dev|qa npm run ui-test
  ```

- To run SMOKE test, run command:
  
   ```
   ENV=dev|qa npm run smoke-ui-test
   ```
   
-  To run REGRESSION test, run command:

   ```
   ENV=dev|qa npm run regression-ui-test
   ```

---
  
## How to run all API tests
  - Create database in PostgreSQL server
  - Add DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD variables values to ./voting-center-backend/.env - see ./voting-center-backend/readme.md "Environment variables" section
  - In terminal, navigate to ./voting-center-backend 
  - Run `npm install`
  - In the same folder run `npm run develop`. Backend should be running and DB migrations will be executed successfully.
  - Navigate to ./voting-center-automation
  - Create .env file
  - Add env variable `ENV=dev` to .env file
  - Run `npm run api-test`
- To run single API test:
  `npm run api-test-single '<the_name_of_the_test>'`
  - Example: `npm run api-test-single 'Register user test.'`
- To run single API test suite:
    `npm run '<the_name_of_the_suite>'`
    - Example: `npm run api-test-dreps`