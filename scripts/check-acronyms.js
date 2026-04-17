#!/usr/bin/env node
'use strict';

/**
 * check-acronyms.js
 *
 * Scans every HTML content page (any file containing a `class="article-body"` section)
 * and verifies that each known acronym is expanded on its first use within that page.
 *
 * Example of a passing first use:  SDLC (Software Development Life Cycle)
 * Example of a failing first use:  at every stage of the SDLC.
 *
 * To add a new acronym, append an entry to REQUIRED_ACRONYMS below.
 */

const fs   = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Acronyms that must be expanded on their first use in each content page.
// `pattern`  – matches the bare acronym (word-boundary anchored).
// `expanded` – matches the acronym immediately followed by a parenthetical.
// `name`     – human-readable label used in error messages.
// `hint`     – suggested expansion shown in error messages.
// ---------------------------------------------------------------------------
const REQUIRED_ACRONYMS = [
  {
    pattern:  /\bSDLC\b/,
    expanded: /\bSDLC\b\s*\([^)]+\)/,
    name:     'SDLC',
    hint:     'SDLC (Software Development Life Cycle)',
  },
  {
    pattern:  /\bADRs?\b/,
    expanded: /\bADRs?\b\s*\([^)]+\)/,
    name:     'ADR/ADRs',
    hint:     'ADR (Architecture Decision Record)',
  },
];

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Characters of surrounding text shown in error context snippets. */
const CONTEXT_CHARS_BEFORE = 40;
const CONTEXT_CHARS_AFTER  = 60;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Recursively collect all .html files under `dir`, skipping hidden dirs and node_modules. */
function findHtmlFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findHtmlFiles(full));
    } else if (entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Extract a plain-text representation of an HTML file, stripping tags,
 * scripts, styles, and HTML comments.
 *
 * Note: entity decoding is intentionally limited to the most common HTML
 * entities (&lt; &gt; &quot; &#39; &nbsp; &amp;).  Rare or numeric entities
 * are left as-is; they do not affect acronym detection in practice.
 * `&amp;` is decoded last to avoid double-unescaping sequences like
 * `&amp;lt;` (which should decode to `&lt;`, not `<`).
 */
function extractText(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script\s*>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style\s*>/gi,   ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g,   '<')
    .replace(/&gt;/g,   '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g,  "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g,  '&') // must be last to avoid double-unescaping
    .replace(/\s+/g,    ' ')
    .trim();
}

/**
 * Return the index of the first bare (unexpanded) use of an acronym, or
 * null if the acronym is not present or its first use is already expanded.
 *
 * Accepts two valid first-use patterns:
 *   • Acronym-first:    SDLC (Software Development Life Cycle)
 *   • Full-form-first:  Architecture decision records (ADRs)
 */
function findUnexpandedFirstUse(text, { pattern, expanded }) {
  // Find the first occurrence of the acronym (bare or expanded form).
  const firstBare = pattern.exec(text);
  if (!firstBare) return null; // Acronym not used in this file — nothing to check.

  // Case 1 — acronym-first with parenthetical expansion immediately following.
  // e.g. "SDLC (Software Development Life Cycle)"
  const firstExpanded = expanded.exec(text);
  if (firstExpanded && firstExpanded.index === firstBare.index) return null;

  // Case 2 — full-form-first, acronym introduced inside parentheses.
  // e.g. "Architecture decision records (ADRs)"
  // The opening parenthesis immediately precedes the acronym AND a closing
  // parenthesis immediately follows it, confirming this is a proper expansion.
  if (firstBare.index > 0 && text[firstBare.index - 1] === '(') {
    const afterAcronym = text.slice(firstBare.index + firstBare[0].length);
    if (/^\s*\)/.test(afterAcronym)) return null;
  }

  return firstBare.index;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const projectRoot = path.resolve(__dirname, '..');
const htmlFiles   = findHtmlFiles(projectRoot);
let   hasErrors   = false;

for (const filePath of htmlFiles) {
  const html    = fs.readFileSync(filePath, 'utf8');

  // Only check content pages — skip listing/navigation pages that have no
  // article body (e.g. index.html uses tag labels, not prose acronyms).
  if (!html.includes('article-body')) continue;

  const text    = extractText(html);
  const relPath = path.relative(projectRoot, filePath);

  for (const acronym of REQUIRED_ACRONYMS) {
    const errorIndex = findUnexpandedFirstUse(text, acronym);
    if (errorIndex === null) continue;

    const snippetMatch = text.slice(errorIndex).match(acronym.pattern);
    const matchedLength = snippetMatch && snippetMatch.index === 0
      ? snippetMatch[0].length
      : acronym.name.length;

    const snippet = text.substring(
      Math.max(0, errorIndex - CONTEXT_CHARS_BEFORE),
      errorIndex + matchedLength + CONTEXT_CHARS_AFTER,
    );

    console.error(`✗  ${relPath}`);
    console.error(`   "${acronym.name}" is used without expansion on its first occurrence.`);
    console.error(`   Suggested fix: ${acronym.hint}`);
    console.error(`   Context: "...${snippet.trim()}..."\n`);
    hasErrors = true;
  }
}

if (!hasErrors) {
  console.log('✓  All acronyms are expanded on their first use.');
}

process.exit(hasErrors ? 1 : 0);
