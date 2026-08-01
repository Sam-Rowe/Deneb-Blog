// @ts-check
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');

const postsDirectory = path.resolve(__dirname, '../../posts');
const htmlPosts = fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.html'));

test.describe('LLM-friendly content', () => {
  test('lists every Markdown post in llms.txt', async ({ request }) => {
    const response = await request.get('/llms.txt');
    const llmsTxt = await response.text();

    expect(response.ok()).toBeTruthy();
    for (const htmlPost of htmlPosts) {
      expect(llmsTxt).toContain(`/posts/${htmlPost.replace(/\.html$/, '.md')}`);
    }
  });

  for (const htmlPost of htmlPosts) {
    const markdownPost = htmlPost.replace(/\.html$/, '.md');

    test(`${htmlPost} has a Markdown alternative`, async ({ page, request }) => {
      await page.goto(`/posts/${htmlPost}`);
      await expect(page.locator('link[rel="alternate"][type="text/markdown"]')).toHaveAttribute('href', markdownPost);

      const response = await request.get(`/posts/${markdownPost}`);
      expect(response.ok()).toBeTruthy();
      await expect(response.text()).resolves.toMatch(/^# .+/);
    });
  }
});
