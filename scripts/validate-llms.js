const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const expectedPosts = [
  'posts/2026-08-01-the-end-of-the-free-internet.html',
  'posts/2026-07-16-when-the-map-runs-out.html',
  'posts/2026-06-29-supply-chain-security-in-age-of-ai.html',
  'posts/2026-05-24-right-tool-right-clock-cost-of-delay-in-an-ai-world.html',
  'posts/2026-05-08-the-repo-of-the-future-has-no-code-in-it.html',
  'posts/2026-05-03-prompt-engineering-as-a-craft-skill-the-organisational-angle.html',
  'posts/2026-05-01-prompt-engineering-as-a-craft-skill.html',
  'posts/2026-04-23-building-a-game-with-my-daughter.html',
  'posts/2026-04-18-boundaries-first.html',
  'posts/2026-04-16-multiple-anchor-points.html',
  'posts/2025-01-15-hello-deneb.html',
];

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file: ${path.relative(root, filePath)}`);
  }
  return fs.readFileSync(filePath, 'utf8');
}

const llms = read(path.join(root, 'llms.txt'));
const llmsFull = read(path.join(root, 'llms-full.txt'));

if (!llms.includes('## Main posts')) {
  throw new Error('llms.txt is missing the main posts section.');
}

for (const post of expectedPosts) {
  if (!llms.includes(post)) {
    throw new Error(`llms.txt is missing ${post}.`);
  }
  if (!llmsFull.includes(post)) {
    throw new Error(`llms-full.txt is missing ${post}.`);
  }
}

if (llms.trim() !== llmsFull.trim()) {
  throw new Error('llms-full.txt must match llms.txt for now.');
}

for (const file of ['index.html', 'about.html', ...expectedPosts]) {
  const contents = read(path.join(root, file));
  if (!contents.includes('href="/llms.txt"')) {
    throw new Error(`${file} is missing the llms alternate link.`);
  }
  if (!contents.includes('href="/llms/index.md"')) {
    throw new Error(`${file} is missing the markdown mirror link.`);
  }
  if (!contents.includes('rel="describedby" href="/llms.txt"')) {
    throw new Error(`${file} is missing the llms describedby link.`);
  }
}

console.log('llms validation passed');
