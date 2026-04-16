---
name: run-tests
description: Run the Deneb Blog Playwright test workflows, including local prerequisite setup on macOS. Use when asked to run end-to-end tests, accessibility checks, or investigate test failures.
argument-hint: "[all|accessibility|ux] [optional notes]"
---

# Run Tests

Use this skill when the task is to run or fix Playwright-based validation.

## Use This Skill When

- The user asks to run tests.
- A change could affect navigation, layout, or accessibility.
- CI or a pull request reports Playwright failures.

## Required Workflow

1. Work from the repository root.
2. Use the npm scripts in [package.json](../../../package.json) instead of calling Playwright with ad hoc arguments unless the user requests a targeted run.
3. On macOS, verify `node` and `npm` first.
4. If `node` or `npm` is missing and Homebrew is available, run `brew install node`.
5. If Homebrew is missing, ask before installing it.
6. If `node_modules` is missing or the local toolchain is unavailable, run `npm install`.
7. Ensure Playwright browsers are installed before the first run:
   - On macOS, run `npx playwright install chromium firefox`.
   - In Linux CI, the repository uses `npx playwright install --with-deps chromium firefox`.
8. Run the requested test command:
   - `npm test`
   - `npm run test:accessibility`
   - `npm run test:ux`
9. If tests fail, inspect [playwright.config.js](../../../playwright.config.js) and the relevant files under [tests/e2e](../../../tests/e2e) before changing test behavior.

## Commands

```bash
pwd
command -v node
command -v npm
command -v brew
brew install node
npm install
npx playwright install chromium firefox
npm test
npm run test:accessibility
npm run test:ux
```

## Repository Notes

- Playwright starts the local site with `npx serve . -l 3000` through the checked-in configuration in [playwright.config.js](../../../playwright.config.js).
- The test suite covers Chromium and Firefox.
- If port `3000` is already in use, clear the conflict before rerunning tests.

## Expected Result

- Report which test command ran and whether it passed.
- If it failed, summarize the failing spec names and the likely root cause.