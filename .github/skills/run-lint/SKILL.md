---
name: run-lint
description: Run the Deneb Blog HTML and CSS lint workflows, including local prerequisite setup on macOS. Use when asked to lint the site, validate markup or styles, or investigate CI lint failures.
argument-hint: "[html|css|all] [optional notes]"
---

# Run Lint

Use this skill when the task is to run or fix repository linting.

## Use This Skill When

- The user asks to run linting.
- HTML or CSS files were edited and need validation.
- CI or a pull request reports HTMLHint or Stylelint failures.

## Required Workflow

1. Work from the repository root.
2. Prefer the npm scripts in [package.json](../../../package.json): `lint:html` and `lint:css`.
3. On macOS, verify `node` and `npm` first.
4. If `node` or `npm` is missing and Homebrew is available, run `brew install node`.
5. If Homebrew is missing, ask before installing it.
6. If `node_modules` is missing or the local toolchain is unavailable, run `npm install`.
7. Run the required lint commands:
   - `npm run lint:html`
   - `npm run lint:css`
8. Fix lint issues in source files instead of weakening [/.htmlhintrc](../../../.htmlhintrc) or [/.stylelintrc.json](../../../.stylelintrc.json) unless the user explicitly wants a rules change.

## Commands

```bash
pwd
command -v node
command -v npm
command -v brew
brew install node
npm install
npm run lint:html
npm run lint:css
```

## Repository Notes

- HTML linting covers `**/*.html` and ignores `node_modules/**`.
- CSS linting targets `assets/css/**/*.css`.
- Playwright tests depend on a clean static site, so keep lint fixes minimal and semantic.

## Expected Result

- Report which lint commands were run.
- If one or more commands fail, summarize the file-level failures and fix them when possible.