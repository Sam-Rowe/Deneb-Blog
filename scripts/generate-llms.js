#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const pages = [
  'index.html',
  'about.html',
  ...fs.readdirSync(path.join(projectRoot, 'posts'))
    .filter((filename) => filename.endsWith('.html'))
    .sort(),
];

function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripTags(value) {
  return decodeHtmlEntities(
    value
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
}

function extractTagContent(html, tagPattern) {
  const match = html.match(tagPattern);
  if (!match) return '';
  return stripTags(match[1] || match[0]);
}

function extractMetaDescription(html) {
  const match = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  return match ? decodeHtmlEntities(match[1].trim()) : '';
}

function extractTitle(html) {
  const article = html.match(/<h1\s+class=["']article-title["'][^>]*>([\s\S]*?)<\/h1>/i);
  if (article) return stripTags(article[1]);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i);
  return title ? stripTags(title[1]) : 'Deneb';
}

function extractDate(html) {
  const match = html.match(/<time\s+datetime=["']([^"']+)["'][^>]*>/i);
  return match ? match[1].trim() : 'n/a';
}

function convertInline(html) {
  let text = html;

  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/?strong>/gi, '**');
  text = text.replace(/<\/?b>/gi, '**');
  text = text.replace(/<\/?em>/gi, '*');
  text = text.replace(/<\/?i>/gi, '*');
  text = text.replace(/<code[^>]*>/gi, '`');
  text = text.replace(/<\/code>/gi, '`');
  text = text.replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => `[${stripTags(label)}](${href})`);
  text = decodeHtmlEntities(text);
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

function convertBody(bodyHtml) {
  let body = bodyHtml;

  body = body.replace(/<h2\s*[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n');
  body = body.replace(/<h3\s*[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n');
  body = body.replace(/<blockquote\s*[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner) => {
    const quote = convertInline(inner).replace(/\n/g, '\n> ');
    return `\n\n> ${quote}\n`;
  });
  body = body.replace(/<ul\s*[^>]*>([\s\S]*?)<\/ul>/gi, (_, inner) => {
    const items = [...inner.matchAll(/<li\s*[^>]*>([\s\S]*?)<\/li>/gi)].map((item) => `- ${convertInline(item[1])}`);
    return `\n\n${items.join('\n')}\n`;
  });
  body = body.replace(/<p\s*[^>]*>([\s\S]*?)<\/p>/gi, (_, inner) => `\n\n${convertInline(inner)}\n`);
  body = body.replace(/<li\s*[^>]*>([\s\S]*?)<\/li>/gi, '\n- ' + convertInline('$1'));

  body = decodeHtmlEntities(body);
  body = body.replace(/<[^>]+>/g, ' ');
  body = body.replace(/\n{3,}/g, '\n\n');
  body = body.replace(/\s+\n/g, '\n');
  body = body.trim();

  return body;
}

function extractArticleBody(html) {
  const match = html.match(/<div\s+class=["']article-body["'][^>]*>([\s\S]*?)<\/div>/i);
  if (!match) return '';
  return match[1];
}

function relativeLink(fromFile, toFile) {
  const fromDir = path.dirname(fromFile);
  const relative = path.relative(fromDir, toFile);
  return relative.split(path.sep).join('/');
}

function ensureMetaTag(html, pagePath, markdownPath) {
  const markdownHref = relativeLink(pagePath, markdownPath);
  const llmsHref = relativeLink(pagePath, 'llms.txt');

  if (!html.includes('rel="alternate" type="text/markdown"')) {
    const marker = '</head>';
    const insertion = `  <link rel="alternate" type="text/markdown" href="${markdownHref}">\n  <link rel="describedby" href="${llmsHref}">\n`;
    if (html.includes(marker)) {
      return html.replace(marker, `${insertion}${marker}`);
    }
  }

  const alternateHref = markdownHref;
  const hasAlternate = html.includes(`href="${alternateHref}"`) && html.includes('type="text/markdown"');
  const hasDescribedBy = html.includes(`href="${llmsHref}"`) && html.includes('rel="describedby"');

  if (hasAlternate && hasDescribedBy) {
    return html;
  }

  let updated = html;
  if (!hasAlternate) {
    updated = updated.replace('</head>', `  <link rel="alternate" type="text/markdown" href="${alternateHref}">\n</head>`);
  }
  if (!hasDescribedBy) {
    updated = updated.replace('</head>', `  <link rel="describedby" href="${llmsHref}">\n</head>`);
  }
  return updated;
}

function pageSummary(filePath, html) {
  const match = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const summary = match ? decodeHtmlEntities(match[1].trim()) : 'Deneb blog content.';
  const title = extractTitle(html);
  const date = extractDate(html);

  return { title, summary, date, filePath };
}

function buildMarkdownForPage(filePath, html) {
  const title = extractTitle(html);
  const summary = extractMetaDescription(html) || 'Deneb blog content.';
  const date = extractDate(html);
  const articleBody = extractArticleBody(html);

  const content = articleBody ? convertBody(articleBody) : 'Deneb is an AI-native editorial tech blog exploring the software development lifecycle and the practical realities of building with AI.';

  const lines = [
    `# ${title}`,
    '',
    `> ${summary}`,
    '',
    `**Published:** ${date}`,
    '**Author:** Sam Rowe',
    '',
    content,
    '',
  ];

  return lines.join('\n');
}

function buildLlmsFile() {
  const entries = pages.map((page) => {
    const fullPath = path.join(projectRoot, page);
    const html = fs.readFileSync(fullPath, 'utf8');
    const title = extractTitle(html);
    const summary = extractMetaDescription(html);
    const relativePath = page.includes('/') ? page : page;
    const mdHref = page === 'index.html' ? 'index.html.md' : page.endsWith('.html') ? `${page}.md` : `${page}.md`;
    return { title, summary, href: mdHref };
  });

  const intro = [
    '# Deneb',
    '',
    '> Deneb is Sam Rowe\'s AI-native editorial tech blog about the software development lifecycle, AI engineering, and the honest realities of building with AI.',
    '',
    '## About',
    '- [About Deneb](about.html.md): An overview of the blog, its author, and the mission behind it.',
    '- [Homepage](index.html.md): The latest posts and the editorial overview for the site.',
    '',
    '## Posts',
  ];

  const postEntries = entries
    .filter((entry) => entry.href !== 'index.html.md' && entry.href !== 'about.html.md')
    .map((entry) => `- [${entry.title}](${entry.href}): ${entry.summary || 'AI-native editorial commentary on software, engineering, and modern work.'}`);

  return [...intro, ...postEntries].join('\n') + '\n';
}

function main() {
  const generated = [];

  for (const page of pages) {
    const fullPath = path.join(projectRoot, page);
    const html = fs.readFileSync(fullPath, 'utf8');
    const markdownPath = path.join(projectRoot, page.endsWith('.html') ? `${page}.md` : `${page}.md`);
    const markdown = buildMarkdownForPage(fullPath, html);
    fs.writeFileSync(markdownPath, markdown + '\n', 'utf8');
    generated.push({ page, markdownPath });

    const updatedHtml = ensureMetaTag(html, page, markdownPath.replace(projectRoot + path.sep, ''));
    if (updatedHtml !== html) {
      fs.writeFileSync(fullPath, updatedHtml, 'utf8');
    }
  }

  fs.writeFileSync(path.join(projectRoot, 'llms.txt'), buildLlmsFile(), 'utf8');

  console.log(`Generated ${generated.length} markdown pages and llms.txt.`);
}

main();
