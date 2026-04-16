# Deneb ✦

Sam Rowe's AI-native editorial tech blog — exploring the software development lifecycle through an honest, opinionated lens.

**Live site:** [blog.deneb.co.uk](https://blog.deneb.co.uk) (hosted on GitHub Pages)

---

## About

Deneb is a static site built with semantic HTML, CSS, and minimal JavaScript. No frameworks. No build tools beyond a static file server. The site follows the [design specification](docs/design-specification.md).

---

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- npm (included with Node.js)

### Setup

```bash
# Install dependencies (dev tools only — no runtime dependencies)
npm install

# Serve the site locally at http://localhost:3000
npm run serve
```

---

## Tests

Tests are written with [Playwright](https://playwright.dev/) and cover UX, navigation, and WCAG 2.1 AA accessibility.

```bash
# Install Playwright browsers (first run only)
npx playwright install --with-deps chromium firefox

# Run all tests
npm test

# Run accessibility tests only
npm run test:accessibility

# Run UX/navigation tests only
npm run test:ux

# Open the Playwright test report
npm run test:report
```

---

## Linting

```bash
# Lint HTML
npm run lint:html

# Lint CSS
npm run lint:css

# Spell-check all content
npm run spellcheck
```

---

## CI/CD

| Workflow | Trigger | Description |
|----------|---------|-------------|
| `ci.yml` | push / PR to `main` | Lint (HTML, CSS), spell-check, Playwright tests |
| `deploy.yml` | push to `main` | Runs CI, builds site artifact, deploys to GitHub Pages |

### Enabling GitHub Pages

1. Go to **Settings → Pages** in the repository.
2. Set **Source** to **GitHub Actions**.
3. The next push to `main` will trigger a deployment.

---

## Project Structure

```
deneb-blog/
├── index.html              # Landing page
├── about.html              # About page
├── posts/                  # Blog post pages
│   └── 2025-01-15-hello-deneb.html
├── assets/
│   ├── css/main.css        # All styles (design tokens + components)
│   └── js/theme.js         # Theme toggle (dark/light)
├── tests/
│   └── e2e/
│       ├── homepage.spec.js
│       ├── navigation.spec.js
│       └── accessibility.spec.js
├── docs/
│   └── design-specification.md
├── .github/workflows/
│   ├── ci.yml
│   └── deploy.yml
└── playwright.config.js
```

---

## Disclaimer

The views and opinions expressed on this blog are entirely Sam Rowe's own personal thoughts and ideas. They do not represent, reflect, or relate to the views of any current or past employers.
