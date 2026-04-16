# 🧠 AI-Native Editorial Tech Blog — Design Specification

## 1. Design Thesis

**Shorthand:**
**Editorial tech + humane accessibility + inspectable AI**

### Non-negotiables

* Feels like a curated publication, not a template
* Works without JavaScript (progressive enhancement first)
* AI is visible, inspectable, and grounded (not magical)

---

## 2. Visual System

### 2.1 Typography

**Constraints**

* Maximum: 2 font families
* Maximum: 5 type sizes

**Roles**

* **Display font (headlines only):** expressive, distinctive
* **Body font:** highly readable, neutral

**Scale**

* H1: 2.2–2.8rem (bold, tight line-height)
* H2: 1.6–2.0rem
* H3: 1.2–1.4rem
* Body: 16–18px (1rem–1.125rem)
* Meta: 0.8–0.9rem

**Line height**

* Body: 1.6–1.8
* Headings: 1.2–1.3

---

### 2.2 Colour System

**Principle:** Mostly neutral + one accent

**Tokens**

```css
:root {
  --bg-primary: #0f1115;
  --bg-secondary: #161a21;
  --text-primary: #e6e8eb;
  --text-secondary: #9aa3ad;
  --accent: #4cc2ff; /* single accent */
  --border-subtle: #232831;
}
```

**Rules**

* Accent used for: links, highlights, focus states
* No gradients unless subtle and rare
* No multiple competing colours

---

### 2.3 Layout Principles

* Grid-based foundation (12-column or CSS grid)
* One **intentional break** per section:

  * offset hero
  * oversized card
  * staggered layout

**Rule**

> If everything is symmetrical → it feels templated

---

## 3. Component System

### 3.1 Core Layout Components

* Header (navigation + theme toggle)
* Hero (featured post or thesis statement)
* Post grid (card system)
* Article page
* Footer

---

### 3.2 Card System

**Base Card**

* Title
* Description
* Metadata (date, read time)
* Optional AI signal

**Variants**

* Featured (2x width)
* Standard
* Compact (list style)

---

### 3.3 Article Page Structure

```
[Title]
[Metadata: date · read time · tags]

[Intro / Hook]

[Content blocks]

[AI Insight Callouts]

[Conclusion]

[Related Posts]
```

---

## 4. AI-Native Interface Patterns

### 4.1 Core Principle

AI is presented as **a system with states**, not magic.

---

### 4.2 AI Components

#### Prompt Bar

* Positioned at top or inline
* Used for:

  * “Ask a question about this post”
  * “Explore this idea further”

---

#### Response Pane

* Styled differently from main content
* Contains:

  * Answer
  * Confidence indicator
  * Optional sources

---

#### Insight Callout

Inline block inside articles:

```
Insight
This section summarises the core idea in simpler terms.
Confidence: High
```

---

#### AI States (visible)

* Drafting
* Comparing
* Summarising
* Citing

**Example UI label**

```
[ Summarising… ]
```

---

#### Diff / Comparison Blocks

```
Before → After
Option A vs Option B
Human vs AI interpretation
```

---

### 4.3 AI Signals (lightweight, not intrusive)

* Confidence badge
* “AI-assisted” label
* Version notes (v1, refined, updated)

---

## 5. Interaction & Motion

### Principles

* Motion explains structure, not decoration
* Fast, subtle, purposeful

### Allowed

* Fade-in on scroll
* Hover elevation (cards)
* Smooth theme transitions

### Avoid

* Floating elements
* Parallax gimmicks
* Over-animated UI

---

## 6. Accessibility Requirements

### Must-haves

* Semantic HTML (`<article>`, `<nav>`, `<section>`)
* Proper heading hierarchy (H1 → H2 → H3)
* Keyboard navigation (tab order, focus states)
* Skip links
* High contrast ratios (WCAG AA minimum)

### Content rules

* No meaning conveyed by colour alone
* All images require alt text
* Links must be descriptive

---

## 7. Performance Constraints

* Minimal JavaScript (enhancement only)
* No heavy frameworks required
* Inline critical CSS
* Lazy-load images
* Avoid render-blocking assets

---

## 8. SPA / Site Architecture

### Pages

* Home
* Article
* About
* Optional: AI / Explore page

---

### Homepage Layout

```
[Hero / Featured Post]

[Grid: Featured + Standard cards]

[Section Break]

[Recent Posts]

[Optional: AI Insight Section]
```

---

### Navigation

* Simple top nav
* Sticky but non-intrusive
* Includes:

  * Home
  * About
  * Theme toggle

---

## 9. Design Tokens (CSS Foundation)

```css
:root {
  /* spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 32px;
  --space-xl: 64px;

  /* radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;

  /* shadows */
  --shadow-soft: 0 4px 20px rgba(0,0,0,0.2);
}
```

---

## 10. Content Style Guidelines

### Tone

* Opinionated but grounded
* Clear over clever
* Structured thinking

### Patterns

* Strong opening hook
* Scannable sections
* Insight summaries
* Occasional AI-assisted breakdowns

---

## 11. Anti-Patterns (Do Not Do)

* Blue/purple AI gradients
* Glassmorphism everywhere
* Perfectly symmetrical layouts
* Overuse of animation
* Tiny, low-contrast text
* Hover-only interactions

---

## 12. Final Design Formula

> **Neutral foundation + one accent + one expressive font + one layout break + one visible AI pattern**

---

## 13. Build Strategy (Recommended)

1. Start with static HTML + CSS (no framework)
2. Build:

   * Article page first
   * Then card system
   * Then homepage layout
3. Add JS only for:

   * Theme toggle
   * AI interaction (optional)
4. Iterate visually after structure is solid

---

## 14. Success Criteria

The design is “done” when:

* It feels like a **publication, not a template**
* It is **fast without optimisation work**
* It is **usable without JavaScript**
* The AI elements feel **informative, not gimmicky**

---
