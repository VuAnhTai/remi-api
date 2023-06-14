## Prerequisites

- Node >= 16
- PostgreSQL (Or docker + docker-compose)

We use framework NESTJS
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Database Setup

You need to make sure that you have postgres running locally. You can use Docker to do this easily or you can also use homebrew.

**docker**:

```bash
docker run -d  -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password123 -e POSTGRES_DB=remi -p 5432:5432 --name docker-postgres postgres
```

once you have postgres running locally you need to make sure that you have a

`.env` file with the following properties.

To generate file .env, you can run script
`./scripts/generate-env.ts`
or
`npm run generate-env`

## Installation

```bash
$ npm install
```

## Running the app

Rename `.env.example` to `.env` and update all variables in this file

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Process github

```bash
#1. Checkout branch develop and pull latest
`git checkout develop`
`git pull origin develop`
#2. Create new branch
`git checkout -b "<name>[<numberticket>]<title>"`
#3. Commit
`git commit -m "<type>[#<numberticket>] <Message>"`
type     | Mean
-------- | --------
feat     | Introduces a new feature to the codebase.
fix      | Patches a bug in your codebase.
docs     | Introduces changes to the documentation.
chore    | Introduces a small change of the tools, script no production code change.
test     | Usually adding missing tests, refactoring tests; no production code change.
style    | Usually using for format code no production code change.
refactor | Refactoring production code, eg. renaming a variable name of meet.
release  | Release the changes to production.
#4. Create PR + add teamate reivew (Michael, doanlecong, tina or tai)
```
