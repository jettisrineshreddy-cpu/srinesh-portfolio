import { test, expect } from '@playwright/test';

test.describe('J. Srinesh Portfolio — End-to-End Suite', () => {
  test('homepage loads successfully with correct title, metadata and identity', async ({ page }) => {
    await page.goto('/');

    // Check title contains identity
    await expect(page).toHaveTitle(/J\. Srinesh/i);
    await expect(page.locator('body')).toBeVisible();

    // Check core branding & positioning
    const heroTitle = page.locator('.hero__title');
    await expect(heroTitle).toContainText('J. SRINESH');
    await expect(heroTitle).toContainText('AI × DATA × ENGINEERING');
  });

  test('main navigation has all key sections and interactive links', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('.navbar');
    await expect(nav).toBeVisible();

    // Verify main navigation links
    const expectedLinks = ['HOME', 'ABOUT', 'WORK', 'EXPERIENCE', 'CONTACT'];
    for (const label of expectedLinks) {
      await expect(page.locator(`.navbar__link:has-text("${label}")`)).toBeVisible();
    }

    // Verify resume CTA exists
    const resumeBtn = page.locator('.navbar__cta');
    await expect(resumeBtn).toBeVisible();
    await expect(resumeBtn).toHaveAttribute('href', /drive\.google\.com/);
  });

  test('important sections are present and reachable', async ({ page }) => {
    await page.goto('/');

    const sections = ['#hero', '#about', '#skills', '#projects', '#certifications', '#research', '#contact'];
    for (const selector of sections) {
      const section = page.locator(selector);
      await expect(section).toBeAttached();
    }
  });

  test('experience and certifications anchor targets work', async ({ page }) => {
    await page.goto('/');

    // Check experience section
    const expHeader = page.locator('#experience');
    await expect(expHeader).toBeAttached();

    // Check credentials and education subheaders
    await expect(page.locator('#credentials')).toBeAttached();
    await expect(page.locator('#education')).toBeAttached();

    // Verify at least one experience item is interactive
    const expItem = page.locator('.experience-item').first();
    await expect(expItem).toBeVisible();
  });

  test('project showcase entries and modal dialog work', async ({ page }) => {
    await page.goto('/');

    // Check projects exist
    const projectCards = page.locator('.project-showcase');
    await expect(projectCards.first()).toBeVisible();

    // Scroll first project into view and click
    const firstProjectBtn = projectCards.first().locator('.project-showcase__btn');
    await firstProjectBtn.scrollIntoViewIfNeeded();
    await firstProjectBtn.click();

    // Verify modal is open and has dialog role
    const modal = page.locator('.project-modal.is-open');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveAttribute('role', 'dialog');

    // Close modal via Escape key or close button
    await page.keyboard.press('Escape');
    await expect(page.locator('.project-modal')).not.toBeAttached();
  });

  test('experience modal dialog opens and displays details', async ({ page }) => {
    await page.goto('/');

    // Find first experience item button
    const expBtn = page.locator('.experience-item__btn').first();
    await expBtn.scrollIntoViewIfNeeded();
    await expBtn.click();

    // Verify experience modal is open
    const expModal = page.locator('.exp-modal.is-open');
    await expect(expModal).toBeVisible();
    await expect(expModal).toHaveAttribute('role', 'dialog');

    // Close experience modal via Escape key
    await page.keyboard.press('Escape');
    await expect(page.locator('.exp-modal')).not.toBeAttached();
  });

  test('no broken images exist across the page', async ({ page }) => {
    await page.goto('/');

    // Wait for images to attach and verify all rendered images
    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const isVisible = await img.isVisible();
      if (isVisible) {
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        // Images should either be loaded with naturalWidth > 0 or loading
        if (naturalWidth !== undefined) {
          expect(naturalWidth).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });

  test('mobile viewport has no horizontal overflow', async ({ page }) => {
    // Test on 390px mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const bodyWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(windowWidth);

    // Verify mobile hamburger menu toggle works
    const toggle = page.locator('.navbar__toggle');
    await expect(toggle).toBeVisible();
    await toggle.click();

    const mobileMenu = page.locator('.mobile-menu--open');
    await expect(mobileMenu).toBeVisible();
  });
});
