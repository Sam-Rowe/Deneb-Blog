// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
  });

  test('has the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Deneb/);
  });

  test('displays the site logo', async ({ page }) => {
    const logo = page.locator('.nav-logo');
    await expect(logo).toBeVisible();
    await expect(logo).toContainText('Deneb');
  });

  test('displays main navigation links', async ({ page }) => {
    const navLinks = page.locator('.nav-links');
    await expect(navLinks.locator('a[href="index.html"]')).toBeVisible();
    await expect(navLinks.locator('a[href="about.html"]')).toBeVisible();
  });

  test('has a working skip link', async ({ page }) => {
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeAttached();
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
  });

  test('main content landmark is present', async ({ page }) => {
    await expect(page.locator('#main-content')).toBeAttached();
  });

  test('displays the hero section with a heading', async ({ page }) => {
    const hero = page.locator('section.hero');
    await expect(hero).toBeVisible();
    await expect(hero.locator('h1')).toBeVisible();
    await expect(hero.locator('h1')).toContainText('Hello, Deneb');
  });

  test('hero section has a call-to-action link', async ({ page }) => {
    const cta = page.locator('.hero .btn-primary');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /posts\//);
  });

  test('posts grid shows at least one post card', async ({ page }) => {
    const cards = page.locator('.post-card');
    await expect(cards).not.toHaveCount(0);
  });

  test('post card has a linked title', async ({ page }) => {
    const cardTitle = page.locator('.post-card__title a').first();
    await expect(cardTitle).toBeVisible();
    await expect(cardTitle).toHaveAttribute('href', /posts\//);
  });

  test('footer displays GitHub link', async ({ page }) => {
    const githubLink = page.locator('a[href*="github.com/Sam-Rowe"]').first();
    await expect(githubLink).toBeVisible();
  });

  test('footer displays LinkedIn link', async ({ page }) => {
    const linkedinLink = page.locator('a[href*="linkedin.com"]').first();
    await expect(linkedinLink).toBeVisible();
  });

  test('footer contains employer disclaimer', async ({ page }) => {
    const disclaimer = page.locator('.footer-disclaimer');
    await expect(disclaimer).toBeVisible();
    await expect(disclaimer).toContainText('employers');
  });

  test('theme toggle button is present and labelled', async ({ page }) => {
    const toggle = page.locator('#theme-toggle');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-label', /theme/i);
  });

  test('theme toggle switches theme', async ({ page }) => {
    const toggle = page.locator('#theme-toggle');
    const html = page.locator('html');

    // emulateMedia sets dark, so page should start dark
    await expect(html).toHaveAttribute('data-theme', 'dark');

    // Click to switch to light
    await toggle.click();
    await expect(html).toHaveAttribute('data-theme', 'light');

    // Click again to switch back to dark
    await toggle.click();
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('AI badge is visible', async ({ page }) => {
    const badge = page.locator('.ai-badge').first();
    await expect(badge).toBeVisible();
  });
});
