#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const postsDir = path.join(projectRoot, 'posts');

function ensure(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function scanPages() {
  const pages = ['index.html', 'about.html'];
  const postFiles = fs.readdirSync(postsDir)
    .filter((name) => name.endsWith('.html'))
    .sort();
  return [...pages, ...postFiles.map((name) => path.join('posts', name))];
}

function main() {
  const llmsPath = path.join(projectRoot, 'llms.txt');
  ensure(fs.existsSync(llmsPath), 'llms.txt is missing at the site root.');

  const llms = fs.readFileSync(llmsPath, 'utf8');
  ensure(/# Deneb/i.test(llms), 'llms.txt is missing the required site title.');
  ensure(/\[.*\]\(.*\.html\.md\)/.test(llms), 'llms.txt does not include markdown links for content pages.');

  const pages = scanPages();
  const missing = [];
  const badLinks = [];

  for (const page of pages) {
    const fullPath = path.join(projectRoot, page);
    const html = fs.readFileSync(fullPath, 'utf8');
    const markdownPath = path.join(projectRoot, `${page}.md`);
    if (!fs.existsSync(markdownPath)) {
      missing.push(`${page}.md`);
      continue;
    }

    const alternate = `${page}.md`;
    const describedby = 'llms.txt';
    const hasAlternate = html.includes(`href="${alternate}"`) && html.includes('type="text/markdown"');
    const hasDescribedBy = html.includes(`href="${describedby}"`) && html.includes('rel="describedby"');

    if (!hasAlternate) badLinks.push(`Missing alternate markdown link on ${page}`);
    if (!hasDescribedBy) badLinks.push(`Missing describedby link on ${page}`);
  }

  ensure(missing.length === 0, `Missing markdown mirrors: ${missing.join(', ')}`);
  ensure(badLinks.length === 0, badLinks.join('; '));

  console.log(`✓ llms.txt and ${pages.length} markdown mirrors are present and linked correctly.`);
}

try {
  main();
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exit(1);
}
