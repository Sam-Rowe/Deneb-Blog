---
applyTo: "**"
---

# Deneb Blog — GitHub Copilot Instructions

## About This Project

Deneb is a static blog for [deneb.co.uk](https://deneb.co.uk) built with **Jekyll** and hosted on **GitHub Pages**. It is authored by Sam Rowe and explores AI and technology through the dual lens of engineering discipline and science fiction imagination.

## Technology Stack

- **Static Site Generator**: Jekyll 4.x
- **Hosting**: GitHub Pages (deployed via GitHub Actions)
- **Language**: Liquid templates, Markdown (Kramdown), SCSS
- **Plugins**: `jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap`

## Project Structure

```
_config.yml          — Site-wide configuration (title, author, URLs, plugins)
_layouts/
  default.html       — Base HTML layout (header, nav, footer)
  home.html          — Home page layout (hero + post grid)
  post.html          — Individual blog post layout
assets/css/
  main.scss          — All custom styles (dark space theme, inline SCSS)
_posts/              — Blog posts (see "Adding Blog Posts" below)
index.md             — Home page (uses home layout)
about.md             — About page
```

## Design Principles

- **Dark space theme**: deep navy backgrounds (`#0a0e1a`), blue accent (`#4fa8e8`), purple accent (`#a78bfa`)
- **Clean and readable**: prioritise legibility over decoration
- **Responsive**: mobile-first layouts
- **Minimal dependencies**: avoid adding npm, webpack, or build-chain complexity — keep it Jekyll

## Coding Conventions

- Use **Liquid** templating — avoid inline JavaScript unless genuinely necessary
- CSS variables (`--accent`, `--bg`, `--text`, etc.) are defined in `assets/css/main.scss` — always use them rather than hard-coding colours
- Keep layouts in `_layouts/`, partials in `_includes/` (create as needed)
- Markdown for content, never raw HTML in posts unless essential
- Posts use front matter: `layout`, `title`, `date`, `categories`, `author`, `excerpt`
- Category slugs are lowercase: `engineering`, `ai`, `science-fiction`, `futures`

## Writing Style (for AI-assisted drafting)

- Tone: thoughtful, curious, technically informed but accessible
- Voice: first-person, direct — Sam Rowe's perspective
- Theme: the intersection of engineering and science fiction; AI as a civilisational force
- Avoid hype; prefer honest, grounded analysis
- British English spelling (e.g. "colour", "behaviour", "analyse")

## Adding Blog Posts

1. Create a file in `_posts/` named `YYYY-MM-DD-post-title-slug.md`
2. Add front matter at the top:
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   date: YYYY-MM-DD HH:MM:SS +0000
   categories: [engineering, ai]
   author: Sam Rowe
   excerpt: >-
     A one or two sentence summary for the post card on the home page.
   ---
   ```
3. Write the post body in Markdown below the front matter
4. Commit and push — the CI/CD pipeline will build and deploy automatically

## Do Not

- Do not add npm/node dependencies or a `package.json` unless explicitly requested
- Do not change the colour scheme without discussion
- Do not edit `_config.yml` `url` or `baseurl` without understanding the deployment target
- Do not add JavaScript frameworks (React, Vue, etc.) — this is intentionally a static site
