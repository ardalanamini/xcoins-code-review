# XCoins Code Review

XCoins code review repository.

## Table of Contents

- [Code Review](#code-review)
  - [Issues](#issues)

## Code Review

This section includes the issues, changes & improvements I've made, with the thought process (explanation) behind them.

### Issues

- Issues related to `package.json`:
  - Missing `package-lock.json` file.
    > Without the `package-lock.json` file, we can't keep track of the installed dependencies,
    > meaning there could be completely different versions of each package installed on each developer machines and the production server.
    > This could cause problems both in development & production environments
    > as it makes it difficult to debug & avoid possible incompatibility & security issues in dependencies.
  - Missing `"private": true` property:
    > This property will avoid accidental publication of the repository.
