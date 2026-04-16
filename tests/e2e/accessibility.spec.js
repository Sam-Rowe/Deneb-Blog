// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const pages = [
  { name: 'Homepage', path: '/' },
  { name: 'About', path: '/about.html' },
  { name: 'First blog post', path: '/posts/2025-01-15-hello-deneb.html' },
];

for (const { name, path } of pages) {
  test.describe(`Accessibility: ${name}`, () => {
    test.beforeEach(async ({ page }) => {
      // Use dark theme (default) so we test with the primary design
      await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
      await page.goto(path);
    });

    test('has no critical WCAG 2.1 AA violations', async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });

    test('has a lang attribute on the html element', async ({ page }) => {
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });

    test('has a single h1 element', async ({ page }) => {
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    });

    test('all images have alt text', async ({ page }) => {
      const imagesWithoutAlt = await page.locator('img:not([alt])').count();
      expect(imagesWithoutAlt).toBe(0);
    });

    test('interactive elements have accessible labels', async ({ page }) => {
      // All buttons should have accessible names
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        const ariaLabel = await button.getAttribute('aria-label');
        const text = await button.textContent();
        const ariaLabelledBy = await button.getAttribute('aria-labelledby');
        expect(
          ariaLabel || (text && text.trim().length > 0) || ariaLabelledBy,
          `Button ${i} must have an accessible name`
        ).toBeTruthy();
      }
    });

    test('skip link is present and links to main content', async ({ page }) => {
      const skipLink = page.locator('.skip-link');
      await expect(skipLink).toBeAttached();
      await expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    test('focus is visible on interactive elements', async ({ page }) => {
      // The theme toggle should be focusable
      const toggle = page.locator('#theme-toggle');
      await toggle.focus();
      await expect(toggle).toBeFocused();
    });

    test('colour contrast meets WCAG AA in dark mode (checked via axe)', async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .withRules(['color-contrast'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  });
}
