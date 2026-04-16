// @ts-check
const { test, expect } = require('@playwright/test');

const pages = [
  { name: 'Homepage', path: '/' },
  { name: 'About', path: '/about.html' },
  { name: 'First blog post', path: '/posts/2025-01-15-hello-deneb.html' },
];

for (const { name, path } of pages) {
  test.describe(`Navigation: ${name}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto(path);
    });

    test('site header is present', async ({ page }) => {
      await expect(page.locator('.site-header')).toBeVisible();
    });

    test('site footer is present', async ({ page }) => {
      await expect(page.locator('.site-footer')).toBeVisible();
    });

    test('main content landmark exists', async ({ page }) => {
      await expect(page.locator('#main-content')).toBeAttached();
    });

    test('skip link targets main content', async ({ page }) => {
      const skipLink = page.locator('.skip-link');
      await expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    test('logo links back to homepage', async ({ page }) => {
      const logo = page.locator('.nav-logo');
      const href = await logo.getAttribute('href');
      // Accept either index.html or ../index.html depending on depth
      expect(href).toMatch(/index\.html/);
    });

    test('GitHub social link is present in footer', async ({ page }) => {
      const link = page.locator('.site-footer a[href*="github.com/Sam-Rowe"]');
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    });

    test('LinkedIn social link is present in footer', async ({ page }) => {
      const link = page.locator('.site-footer a[href*="linkedin.com"]');
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    });

    test('employer disclaimer is in footer', async ({ page }) => {
      await expect(page.locator('.footer-disclaimer')).toContainText('employers');
    });
  });
}

test.describe('Navigation flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
  });

  test('can navigate from homepage to about page', async ({ page }) => {
    await page.goto('/');
    await page.locator('.nav-links a[href="about.html"]').click();
    // The static server may serve about.html as /about (clean URLs)
    await expect(page).toHaveURL(/about/);
    await expect(page.locator('h1')).toContainText('About Deneb');
  });

  test('can navigate from homepage to first blog post', async ({ page }) => {
    await page.goto('/');
    await page.locator('.post-card__title a').first().click();
    await expect(page).toHaveURL(/posts|hello-deneb/);
    await expect(page.locator('h1')).toContainText('Hello, Deneb');
  });

  test('can navigate back from blog post to homepage', async ({ page }) => {
    await page.goto('/posts/2025-01-15-hello-deneb.html');
    await page.locator('.article-footer .btn-primary').click();
    // Accept / or /index.html
    // Accept / or /index.html without hard-coding the origin
    await expect(page).toHaveURL(/\/(?:index\.html)?$/);
  });

  test('active nav item is marked with aria-current', async ({ page }) => {
    await page.goto('/');
    const homeLink = page.locator('nav[aria-label="Main navigation"] a[aria-current="page"]');
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toContainText('Home');
  });
});
