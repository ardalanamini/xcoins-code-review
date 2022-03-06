# XCoins Code Review

XCoins code review repository.

## Table of Contents

- [Code Review](#code-review)
  - [Issues](#issues)
  - [Improvements](#improvements)

## Code Review

This section includes the issues, changes & improvements I've made, with the thought process (explanation) behind them.

### Issues

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
  - Using `var` to define variables.
    > This way the variable would be defined/redefined globally which could cause problems.
    > Instead of `var`, it's best to use `let` or `const`. 

### Improvements

- Improvements related to `TypeScript`:
  - Changed `target` from `es5` to `esnext` to avoid polyfill overhead & possibly improve performance.
  - Changed `outDir` from `dist` to `.build` as it's not supposed to be manually modified. (personal preference)
  - Enabled `incremental` to improve build times.
  - Enabled `removeComments` to avoid emitting comments unnecessarily & improve production size (Very small improvement, but still an improvement 😁).
  - Enabled `inlineSources` to improve source mapping for usage in services such as `Sentry`.
  - Added `paths` to improve code quality and avoid long relative imports.
    > for this purpose, I used `imports` property in `package.json` to avoid using unnecessary third-party application,
    > which improves both the startup time and security, due to the fact that `Node.js` will only apply these path aliases to the current package,
    > meaning no installed dependency can use these path aliases (which could cause security issues as well)
