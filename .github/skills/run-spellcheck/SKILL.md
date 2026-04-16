---
name: run-spellcheck
description: Run the Deneb Blog spell-check workflow, including local prerequisite setup on macOS. Use when asked to run cspell, validate content wording, or fix spellcheck failures before committing.
argument-hint: "[optional scope or notes]"
---

# Run Spellcheck

Use this skill when the task is to run or fix the repository spell-check step.

## Use This Skill When

- The user asks to run spellcheck.
- A change touches content, HTML, CSS, or JavaScript and needs wording validation.
- CI or a pull request reports a spell-check failure.

## Required Workflow

1. Work from the repository root.
2. Use the npm script defined in [package.json](../../../package.json) instead of a globally installed `cspell` binary.
3. On macOS, check for `node` and `npm` first.
4. If `node` or `npm` is missing and Homebrew is available, install Node.js with `brew install node`.
5. If Homebrew is missing, ask before installing it because that changes the machine outside the repository.
6. If `node_modules` is missing or the local toolchain is unavailable, run `npm install`.
7. Run `npm run spellcheck`.
8. If spellcheck fails, prefer fixing source text first. Only add words to [/.cspell.json](../../../.cspell.json) when they are legitimate project vocabulary.

## Commands

```bash
pwd
command -v node
command -v npm
command -v brew
brew install node
npm install
npm run spellcheck
```

## Repository Notes

- The spellcheck command is `cspell "**/*.{html,md,css,js}" --no-progress`.
- Ignore paths and approved project terms are maintained in [/.cspell.json](../../../.cspell.json).
- Do not bypass the npm script with a custom glob unless the user asks for a narrower check.

## Expected Result

- Report whether `npm run spellcheck` passed.
- If it failed, summarize the offending files and either fix them or explain the remaining blockers.