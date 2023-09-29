# Issue Tracker

## Description

Efficient Issue managing api built with Node.js, TypeScript, TypeORM, MySQL, Docker and Jest

## Why to use it? Because it has many advantages:

• <b>Modular Architecture:</b> Allows developers to break down the application into reusable modules like controllers, services, and entities, enhances code reusability and maintainability.

• <b>Dependency Injection:</b> Impoves code organization, testability, and the ability to manage dependencies efficiently.

• <b>Full E2E Testing:</b> Supports comprehensive end-to-end (E2E) testing with a dedicated database for thorough system validation.

• <b>Input Validation:</b> Validates inputs using decorators ensures data integrity and security.

• <b>TypeScript Support:</b> Uses TypeScript, which offers static typing and better code quality.

## Installation
```bash
# if you don't have a yarn
$ npm install --global yarn
```

```bash
$ yarn install
```

## Database setup

```bash
# running database for development
$ docker-compose --env-file .env.dev up -d

# build the app
$ yarn build

# running migration
$ yarn migration:run
```

## Running the app

```bash
# development
$ yarn start

or

# watch mode
$ yarn start:dev
```

## Test

```bash
# running database for tests
$ docker-compose -f docker-compose.test.yaml --env-file .env.test up -d

# e2e tests
$ yarn test:e2e
```
