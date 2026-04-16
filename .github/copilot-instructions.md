# GitHub Copilot Custom Instructions — Deneb Blog

## Project Overview

This is the source repository for **blog.deneb.co.uk** — an AI-native editorial tech blog hosted on **GitHub Pages**. The site explores the use of AI in modern technology, with a particular focus on the **software development lifecycle (SDLC)**.

The blog is part sci-fi and part reality: thought leadership content that lives at the intersection of futurism and practical engineering. It is curated by **Sam-Rowe** as the main author, with content refined and brought to life by AI.

## Design & Architecture

All design decisions must follow the project's design specification:

📄 **[docs/design-specification.md](../docs/design-specification.md)**

### Key Principles

- **Custom-built** using semantic HTML, CSS, and minimal JavaScript — no heavy frameworks.
- **Performance-first**: minimal load times, inline critical CSS, lazy-loaded images, no render-blocking assets.
- **Progressive enhancement**: the site must be fully usable without JavaScript.
- **Accessible**: WCAG AA minimum, semantic HTML (`<article>`, `<nav>`, `<section>`), proper heading hierarchy, keyboard navigation, skip links, descriptive alt text.
- **AI is visible and inspectable**, not magical — presented as a system with states (drafting, summarising, comparing, citing).

### Visual Identity

- Dark space theme with a neutral foundation and a single accent colour (`#4cc2ff`).
- Maximum 2 font families, 5 type sizes.
- Grid-based layouts with one intentional asymmetric break per section to avoid a templated feel.
- No blue/purple AI gradients, no glassmorphism, no parallax gimmicks, no overuse of animation.

## Content & Tone

- **Opinionated but grounded** — clear over clever, structured thinking.
- Part sci-fi futurism, part real-world engineering insight.
- Strong opening hooks, scannable sections, insight summaries.
- AI-assisted content is labelled transparently (e.g. "AI-assisted", confidence badges, version notes).
- The site should feel like a **curated publication, not a template**.

## Technology Stack

- Static site hosted on **GitHub Pages**.
- Built with **HTML, CSS, and minimal JavaScript** (enhancement only).
- JS is used only for theme toggle and optional AI interactions.
- No heavy frameworks or build tools required.

## Validation Workflow

- Prefer the workspace skills in `.github/skills/` for routine validation tasks:
	- `/run-spellcheck`
	- `/run-lint`
	- `/run-tests`
- Always use the npm scripts in `package.json` for validation instead of global CLI tools.
- On macOS, if `node` or `npm` is missing, prefer `brew install node` before attempting validation.
- If Homebrew is missing, ask before installing it because that changes the local machine outside the repository.
- If Playwright browsers are missing locally, install them before testing.

## When Generating Code

- Use semantic HTML elements (`<article>`, `<nav>`, `<section>`, `<header>`, `<footer>`).
- Follow the CSS design tokens defined in the design specification (spacing, radius, shadows, colour variables).
- Keep JavaScript minimal — only for progressive enhancement.
- Ensure all interactive elements are keyboard-accessible with visible focus states.
- Provide descriptive `alt` text for all images.
- Prefer inline critical CSS and avoid render-blocking assets.
- Motion should be fast, subtle, and purposeful — fade-in on scroll and hover elevation are acceptable; parallax and floating elements are not.

## When Generating Content

- Write in an opinionated but grounded tone.
- Use strong opening hooks and scannable section structures.
- Include AI insight callouts where appropriate.
- Mark AI-assisted or AI-generated content transparently.
- Maintain the blog's identity: funky, futuristic, and accessible to both people and AI.
