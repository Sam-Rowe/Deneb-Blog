# Deneb Blog

> **Engineering meets Science Fiction** — a blog by Sam Rowe exploring AI and technology at [deneb.co.uk](https://deneb.co.uk)

[![Deploy to GitHub Pages](https://github.com/Sam-Rowe/Deneb-Blog/actions/workflows/deploy.yml/badge.svg)](https://github.com/Sam-Rowe/Deneb-Blog/actions/workflows/deploy.yml)

---

## About

Deneb is a static blog built with [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com/). It explores AI and the world of technology through the dual lens of engineering discipline and science fiction imagination.

---

## 📝 Writing a Blog Post

### 1. Create the file

Add a new Markdown file to the `_posts/` directory. The filename **must** follow the format:

```
_posts/YYYY-MM-DD-your-post-title.md
```

For example:

```
_posts/2026-04-20-the-ai-pair-programmer.md
```

### 2. Add front matter

Every post needs a YAML front matter block at the top:

```yaml
---
layout: post
title: "Your Post Title Here"
date: 2026-04-20 09:00:00 +0000
categories: [engineering, ai]
author: Sam Rowe
excerpt: >-
  A one or two sentence summary shown on the home page post card.
---
```

**Available categories:** `engineering` · `ai` · `science-fiction` · `futures`

### 3. Write in Markdown

Write the post body below the front matter block using standard Markdown.

### 4. Push to `main`

Commit and push to `main`. The CI/CD pipeline (GitHub Actions) will automatically build and deploy the site to GitHub Pages.

---

## 🗂 Project Structure

```
_config.yml          # Site-wide settings: title, author, URLs, plugins
_layouts/
  default.html       # Base HTML layout (header, nav, footer with GitHub + LinkedIn links)
  home.html          # Home page: hero section + blog post grid
  post.html          # Individual blog post page
assets/css/
  main.scss          # All custom styles — dark space theme (inline SCSS)
_posts/              # ← Blog posts live here
index.md             # Home page (uses home layout)
about.md             # About page
.github/
  instructions/
    copilot-instructions.md   # Custom GitHub Copilot instructions
  workflows/
    deploy.yml       # CI/CD: build with Jekyll and deploy to GitHub Pages
```

---

## 🚀 CI/CD

The GitHub Actions workflow at `.github/workflows/deploy.yml`:

- **Triggers** on every push to `main` and on pull requests targeting `main`
- **Builds** the Jekyll site using the production environment
- **Deploys** to GitHub Pages automatically (push to `main` only, not PRs)

### Enable GitHub Pages

In your repository settings (**Settings → Pages**), set the source to **GitHub Actions**.

---

## 🛠 Running Locally

```bash
bundle install
bundle exec jekyll serve --livereload
```

Then open [http://localhost:4000](http://localhost:4000).

**Requirements:** Ruby ≥ 3.1, Bundler

---

## 🤖 GitHub Copilot

Custom Copilot instructions are in `.github/instructions/copilot-instructions.md`. These guide Copilot on the project's stack, conventions, writing style, and how to add posts.

---

## Author

**Sam Rowe** — [GitHub](https://github.com/Sam-Rowe) · [LinkedIn](https://www.linkedin.com/in/sam-rowe)
