# XCoins Code Review

XCoins code review repository.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Usage](#usage)
  - [Build](#build)
  - [Code Style](#code-style)
  - [Start](#start)
  - [Docker](#docker)
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

### Code Style

Check for code style issues in the project. (Using _ESLint_[^ESLINT_FOOTNOTE])

```shell
npm run lint
```

Fix code style issues in the project.

```shell
npm run lint:fix
```

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

## Directory Layout

```
.
├── .build           # Project (TypeScript) build directory
└── src              # Source files
    ├── constants    # Constant values
    ├── models       # Database models
    ├── routes       # API endpoints
    └── scripts      # Project scripts
```

## Versioning

This project uses _SemVer_[^SEMVER_FOOTNOTE] for versioning. For the versions & changelogs available, see the releases on this
repository.

## Code Review

This section includes the issues, changes & improvements I've made, with the thought process (explanation) behind them.

### Issues

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
    >
    > Note: As of this moment, the latest `typescript` version
    > officially supported by the `@typescript-eslint/typescript-estree` is `4.5.5`
  - Not using exact versions for dependencies.
    > This issue has somewhat similar effects as the `package-lock.json` issue,
    > as `^version` will allow any semver compatible version to be installed.
- Missing `eslint` config.
  > The `eslint` config allows to enforce the desired code style among all the contributors.
- Issues in the `src` directory:
  - Unused imports. (e.g. unused `lodash` import in the `src/scripts/seed.ts`)
  - Using `var` to define variables.
    > This way the variable would be defined/redefined globally which could cause problems.
    > Instead of `var`, it's best to use `let` or `const`.
  - Database models weren't typed.
    > I added the missing interfaces that can be modified easily if needed.

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
  - Added the `src/models/index.ts` file to provide easier & cleaner access to all database models
    throughout the entire project.
  - Added the `src/constants` directory to move all constant values there instead of being scattered all over the project.
    > This ensures that the project is using the same consistent values everywhere.
    > `MODEL` & `COLLECTION` constants are also added, due to the fact that they can be useful in scenarios such as `$lookup` aggregation stages.
    > Also In case of need to change the said values, it just needs to be updated in one places only.

<!-- Footnotes -->

[^NODE_JS_FOOTNOTE]: [Node.js](https://nodejs.org/en)

[^TYPESCRIPT_FOOTNOTE]: [TypeScript](https://www.typescriptlang.org)

[^ESLINT_FOOTNOTE]: [ESLint](https://eslint.org)

[^MONGODB_FOOTNOTE]: [MongoDB](https://www.mongodb.com)

[^DOCKER_FOOTNOTE]: [Docker](https://www.docker.com)

[^SEMVER_FOOTNOTE]: [SemVer](http://semver.org)
