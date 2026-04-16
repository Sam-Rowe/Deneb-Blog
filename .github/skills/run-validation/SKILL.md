---
name: run-validation
description: Run the Deneb Blog full local validation workflow, including linting, spellcheck, and Playwright tests, with macOS prerequisite setup when needed. Use when asked to run all checks before review, before merging, or after a larger change.
argument-hint: "[optional scope or notes]"
---

# Run Validation

Use this skill when the task is to run the repository's full local validation suite.

## Use This Skill When

- The user asks to run all checks.
- A change touches multiple parts of the site and needs end-to-end validation.
- You want a single pass before opening or updating a pull request.
- CI failures need to be reproduced locally.

## Required Workflow

1. Work from the repository root.
2. Use the checked-in npm scripts from [package.json](../../../package.json) instead of global CLI tools.
3. On macOS, verify `node` and `npm` first.
4. If `node` or `npm` is missing and Homebrew is available, run `brew install node`.
5. If Homebrew is missing, ask before installing it because that changes the local machine outside the repository.
6. If `node_modules` is missing or the local toolchain is unavailable, run `npm install`.
7. Ensure Playwright browsers are installed before running tests:
   - On macOS, run `npx playwright install chromium firefox`.
   - In Linux CI, the repository uses `npx playwright install --with-deps chromium firefox`.
8. Run the validation steps in this order:
   - `npm run lint:html`
   - `npm run lint:css`
   - `npm run spellcheck`
   - `npm test`
9. If any step fails, stop on the failing step, inspect the relevant source files, and fix the root cause before rerunning the failed command.

## Commands

```bash
pwd
command -v node
command -v npm
command -v brew
brew install node
npm install
npx playwright install chromium firefox
npm run lint:html
npm run lint:css
npm run spellcheck
npm test
```

## Repository Notes

- HTML linting uses [/.htmlhintrc](../../../.htmlhintrc).
- CSS linting uses [/.stylelintrc.json](../../../.stylelintrc.json).
- Spellcheck vocabulary and ignore paths live in [/.cspell.json](../../../.cspell.json).
- Playwright starts the site with the checked-in web server configuration in [playwright.config.js](../../../playwright.config.js).
- If port `3000` is already in use, clear the conflict before rerunning tests.

## Expected Result

- Report each validation command that ran and whether it passed.
- If a step fails, summarize the failing files or specs and fix them when possible.