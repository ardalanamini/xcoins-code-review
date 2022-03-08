# XCoins Code Review

XCoins code review repository.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Usage](#usage)
  - [Build](#build)
  - [Test](#test)
  - [Code Style](#code-style)
  - [Config](#config)
    - [Common](#common-config)
    - [Server](#server-config)
    - [Database](#database-config)
    - [Sentry](#sentry-config)
  - [Start](#start)
  - [Docker](#docker)
  - [Documents](#documents)
    - [Code](#code-documents)
    - [API](#api-documents)
- [Directory Layout](#directory-layout)
- [Versioning](#versioning)
- [Code Review](#code-review)
  - [Issues](#issues)
  - [Improvements](#improvements)

## Prerequisites

- _Node.js_[^NODE_JS_FOOTNOTE] (`v16.14.0` or higher)
- _MongoDB_[^MONGODB_FOOTNOTE] (`v5`)

## Usage

First install the dependencies:

```shell
npm i
```

### Build

Build the project. (Using _TypeScript_[^TYPESCRIPT_FOOTNOTE])

```shell
npm run build
```

Watch for changes and rebuild automatically.

```shell
npm run build:watch
```

### Test

Test the project. (Using _Jest_[^JEST_FOOTNOTE])

```shell
npm test
```

Test with code coverage report.

```shell
npm run test:coverage
```

Test in ci.

```shell
npm run test:ci
```

### Code Style

Check for code style issues in the project. (Using _ESLint_[^ESLINT_FOOTNOTE])

```shell
npm run lint
```

Fix code style issues in the project.

```shell
npm run lint:fix
```

### Config

First create the `.env` file:

```shell
cp .env.example .env
```

#### Common Config

|    Name    |               Type                |    Default    |                                     Description                                      |
|:----------:|:---------------------------------:|:-------------:|:------------------------------------------------------------------------------------:|
| `NODE_ENV` | `production`,`development`,`test` | `development` | Node.js environment (`test` will be provided by the testing framework automatically) |

#### Server Config

| Name           |  Type   |         Default         |                    Description                    |
|----------------|:-------:|:-----------------------:|:-------------------------------------------------:|
| `SERVER_PORT`  | integer |         `3000`          |              Express.js server port               |
| `CORS_ORIGINS` | string  | `http://localhost:3000` | Comma separated list of acceptable origin servers |

#### Database Config

| Name           |  Type  | Default |          Description          |
|----------------|:------:|:-------:|:-----------------------------:|
| `DATABASE_URI` | string |    -    | MongoDB connection string uri |

#### Sentry Config

| Name         |  Type  | Default |       Description        |
|--------------|:------:|:-------:|:------------------------:|
| `SENTRY_DSN` | string |    -    | Sentry project DSN value |

### Start

Start the API.

```shell
npm start
```

Watch for changes and restart automatically.

```shell
npm run dev
```

### Docker

Start the _Docker_[^DOCKER_FOOTNOTE] compose services:

```shell
docker-compose up -d --build --remove-orphans
```

Stop the docker compose services:

```shell
docker-compose down
```

### Documents

#### Code Documents

Generate the Code documents to be served statically. (Using _TypeDoc_[^TYPEDOC_FOOTNOTE])

```shell
npm run docs:code
```

After running this command, open `docs/code/index.html` in your preferred browser.

#### API Documents

Generate the API documents to be served statically. (Using _Swagger_[^SWAGGER_FOOTNOTE])

```shell
npm run docs:swagger
```

Generate & serve the API documents. (The documents' server address will be printed in the terminal)

```shell
npm run docs:api
```

## Directory Layout

```
.
├── .build           # Project (TypeScript) build directory
├── __tests__        # Test files
│   ├── controllers  # API controller integration tests
│   ├── jest         # Test utilities
│   ├── lib          # Library unit tests
│   └── utils        # Utility unit tests
├── docs             # Static documents
│   ├── api          # API documents
│   └── code         # Code documents
└── src              # Source files
    ├── constants    # Constant values
    ├── controllers  # API controllers
    ├── lib          # 3rd party libraries (initialized/extended etc)
    ├── models       # Database models
    ├── routes       # API endpoints
    ├── scripts      # Project scripts
    └── utils        # Project utilities
```

> Note: `__mocks__` directories are used by `Jest` to mock certain modules.

## Versioning

This project uses _SemVer_[^SEMVER_FOOTNOTE] for versioning. For the versions & changelogs available, see the releases
on this repository.

## Code Review

This section includes the issues, changes & improvements I've made, with the thought process (explanation) behind them.

### Issues

- No unit/integration tests.
- Missing documents.
  - No usage document is provided in the `README.md` file.
  - No comments or documents are provided for the project. (e.g. `jsdoc`, `tsdoc`, `typedoc`)
  - No API documents are provided for the project. (e.g. `swagger`)
- Missing `.gitignore` file.
  > Could cause unintended files to be pushed to the `git` server accidentally.
- Issues related to `package.json`:
  - Missing `package-lock.json` file.
    > Without the `package-lock.json` file, we can't keep track of the installed dependencies,
    > meaning there could be completely different versions of each package installed on each developer machines and the production server.
    > This could cause problems both in development & production environments
    > as it makes it difficult to debug & avoid possible incompatibility & security issues in dependencies.
  - Missing `"private": true` property:
    > This property will avoid accidental publication of the repository.
  - `main` property pointing to a non-existing file.
  - `devDependencies` being wrongly included in `dependencies`:
    > This will result to unnecessary packages being installed in the production server.
    > This can increase production project size (e.g. Docker image).
    > Related dependencies: `@types/cors`, `@types/express`, `@types/express-handlebars`, `ts-node`, `ts-node-dev`,
    > `typescript`
  - Unused dependencies.
    > Related dependencies: `chart.js`, `express-handlebars`, `lodash`, `luxon`, `@types/express-handlebars`,
    > `eslint-plugin-react`, `ts-node`
  - Outdated dependencies.
    > Related dependencies: `body-parser`, `dotenv`, `express`, `mongoose`, `@types/cors`, `@types/express`,
    > `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint`, `ts-node-dev`, `typescript`
  - Not using exact versions for dependencies.
    > This issue has somewhat similar effects as the `package-lock.json` issue,
    > as `^version` will allow any semver compatible version to be installed.
- Missing `eslint` config.
  > The `eslint` config allows to enforce the desired code style among all the contributors.
- Issues in the `src` directory:
  - Unused imports. (e.g. unused `lodash` import in the `src/scripts/seed.ts`)
  - Wrong values passed to the database models to be created based on the provided database model schemas.
    (e.g. `name`, `start_date`, `check_date`, `divisa`, `Crypto_price_start` & `Crypto_price_check` fields for
    the `Simulator` model in the `src/scripts/seed.ts` file)
  - Using `var` to define variables.
    > This way the variable would be defined/redefined globally which could cause problems.
    > Instead of `var`, it's best to use `let` or `const`.
  - Database models weren't typed.
    > I added the missing interfaces that can be modified easily if needed.
  - Database model fields were all optional & lacked the information about other required validations.
  - Database model fields lacked consistency. (e.g. some used `snake-case` format & some `camel-case` such
    as `dateRecorded` in the `Simulator` model)
  - Monetary values were stored as `Number` in the database.
    > This can cause problems as it doesn't have precision safety required to do the math.
    > I used `Decimal128` as suggested in [this](https://docs.mongodb.com/manual/tutorial/model-monetary-data) official `MongoDB` document.
    > For mathematical calculations in the project we can use [bignumber.js](https://www.npmjs.com/package/bignumber.js),
    > to handle the precision appropriately.
  - Unused/Redundant usage of `express()` & `cors()` in the `src/routes/simulator.router.ts` file.
  - Redundant `/api` prefix used in the routes. I instead used a more useful `/v{major}` prefix. (`/v1`)
    > Using `/v{major}` route prefix allows to possibility of deploying breaking changes without loosing backward compatibility.
  - Unuseful `console.log` usage. for logging purposes, it's better use a proper logging library or service such
    as `Sentry`.
  - Inconsistent API response format.
    > Some controllers directly send the database record(s) as the response, some send them wrapped inside an object.
  - No request validation was in place for any of the controllers.
  - The `seed` script was creating a database records using different fields than the fields in the models. (
    e.g. `Simulator` record)
  - The `seed` script was not awaiting database connection/disconnection.

### Improvements

- Added `Dockerfile` & `docker-compose.yml`.
  > The `docker-compose.yml` will be used for development environment,
  > so that the developers won't have to set up the dependant services.
  > The `Dockerfile` will be used for production deployment. (e.g. Kubernetes)
- Improvements related to `TypeScript`:
  - Changed `target` from `es5` to `esnext` to avoid polyfill overhead & possibly improve performance.
  - Changed `outDir` from `dist` to `.build` as it's not supposed to be manually modified. (personal preference)
  - Enabled `incremental` to improve build times.
  - Enabled `removeComments` to avoid emitting comments unnecessarily & improve production size (Very small improvement,
    but still an improvement 😁).
  - Enabled `inlineSources` to improve source mapping for usage in services such as `Sentry`.
  - Added `paths` to improve code quality and avoid long relative imports.
    > for this purpose, I used `imports` property in `package.json` to avoid using unnecessary third-party application,
    > which improves both the startup time and security, due to the fact that `Node.js` will only apply these path aliases to the current package,
    > meaning no installed dependency can use these path aliases (which could cause security issues as well)
- Improvements in the `src` directory:
  - Added the `src/models/index.ts` file to provide easier & cleaner access to all database models throughout the entire
    project.
    > I didn't use `export default` for the models, because in the `index.ts` I wanted to be able to easily use `export * from "some-model"`.
  - Added the `src/constants` directory to move all constant values there instead of being scattered all over the
    project.
    > This ensures that the project is using the same consistent values everywhere.
    > `MODEL` & `COLLECTION` constants are also added, due to the fact that they can be useful in scenarios such as `$lookup` aggregation stages.
    > Also In case of need to change the said values, it just needs to be updated in one places only.
  - Added the `src/routes/index.ts` file to provide cleaner api endpoint management.
    > I exported the routes as `default` in this case, due to only having one job, which is exporting the express `Router`.
  - Renamed the router filenames. The `.router` part of the name was redundant, since they're already under the `routes`
    directory.
  - Moved the controllers to the `controllers` directory & each controller to be in a separate file.
    > This makes code cleaner and easier to maintain. not the directory `routes` only manages the routing &
    > the `controllers` directory manages route behaviors.
    > By putting controllers in separate files, it will become easier to detect which dependencies are used in which controller
    > and the number of controllers won't affect the readability of the code, thus easier to improve, debug & maintain.
  - Added the `wrapController` utility.
    > `express` doesn't catch async errors properly, so I added this utility to wrap the controllers before passing them
    > to the `Router` instance.
  - Added pagination to the endpoints that were listing records.
  - Added `Sentry` to track issues in the production environment.
  - Added graceful shutdown.

<!-- Footnotes -->

[^NODE_JS_FOOTNOTE]: [Node.js](https://nodejs.org/en)

[^TYPESCRIPT_FOOTNOTE]: [TypeScript](https://www.typescriptlang.org)

[^JEST_FOOTNOTE]: [Jest](https://jestjs.io)

[^ESLINT_FOOTNOTE]: [ESLint](https://eslint.org)

[^MONGODB_FOOTNOTE]: [MongoDB](https://www.mongodb.com)

[^DOCKER_FOOTNOTE]: [Docker](https://www.docker.com)

[^TYPEDOC_FOOTNOTE]: [TypeDoc](https://typedoc.org)

[^SWAGGER_FOOTNOTE]: [Swagger](https://swagger.io)

[^SEMVER_FOOTNOTE]: [SemVer](http://semver.org)
