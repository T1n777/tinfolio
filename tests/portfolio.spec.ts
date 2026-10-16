import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('portfolio navigation, case studies, résumé, and mobile layout work', async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Yatin Rajesh');
  await page.getByRole('link', { name: 'Explore my work' }).click();
  await expect(page).toHaveURL(/#work$/);
  for (const name of ['Tinarchy', 'SpectreFlow', 'PESU WiFi', 'Kinemation']) {
    await page.getByRole('link', { name: `Explore ${name}`, exact: true }).click();
    await expect(page.getByRole('heading', { level: 1 })).toContainText(name);
    await expect(page.getByRole('link', { name: 'View repository' })).toHaveAttribute(
      'href',
      /^https:\/\/github.com\//,
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.getByRole('link', { name: '← Selected work' }).click();
  }
  const resume = await request.get('/Yatin-Rajesh-Resume.pdf');
  expect(resume.status()).toBe(200);
  expect(resume.headers()['content-type']).toContain('application/pdf');
  await page.getByRole('link', { name: 'Let’s talk' }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByRole('link', { name: 'yatinrajesh123@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:yatinrajesh123@gmail.com',
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('motion control, clipboard feedback, and accessible page structure', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  const pause = page.getByRole('button', { name: 'Pause motion' });
  await expect(pause).toBeVisible({ timeout: 15000 });
  await pause.click();
  await expect(page.getByRole('button', { name: 'Play motion' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.getByRole('status')).toHaveText('Copied!');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'yatinrajesh123@gmail.com',
  );
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(
    results.violations.map((item) => ({
      id: item.id,
      nodes: item.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
});

test('reduced motion is respected and case studies are accessible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.micro-slats canvas')).toBeVisible({ timeout: 15000 });
  await expect(page.locator('.motion-control')).toHaveCount(0);
  await expect(page.locator('.name-art-hero .name-fallback')).toBeVisible();
  await expect(page.locator('.tech-text canvas')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.getByRole('button', { name: 'Pause motion' })).toBeVisible();
  await page.goto('/work/tinarchy/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(
    results.violations.map((item) => ({
      id: item.id,
      nodes: item.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
});

test('core content and navigation remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/');
  await expect(page.locator('.name-art-hero .name-fallback')).toBeVisible();
  await page.getByRole('link', { name: 'Explore Tinarchy', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Tinarchy.');
  await context.close();
});

test('React Bits renders animated slats, interactive text, and refractive glass', async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  const slats = page.locator('.micro-slats canvas');
  const text = page.locator('.name-art-hero .tech-text');
  await expect(slats).toBeVisible();
  await expect(text.locator('canvas')).toBeVisible();
  await page.waitForTimeout(1800);
  const before = await slats.screenshot();
  await page.waitForTimeout(250);
  expect((await slats.screenshot()).equals(before)).toBe(false);

  const box = await text.boundingBox();
  if (!box) throw new Error('Tech Text has no layout box');
  if (isMobile) {
    const beforeTap = await text.screenshot();
    await page.touchscreen.tap(box.x + box.width * 0.3, box.y + box.height * 0.5);
    expect((await text.screenshot()).equals(beforeTap)).toBe(false);
  } else {
    // Move into the visible stroke of the first letter, then drag it.
    await page.mouse.move(box.x + box.width * 0.12, box.y + box.height * 0.4);
    await expect(text).toHaveCSS('cursor', 'grab');
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.15, box.y + box.height * 0.35, { steps: 5 });
    await expect(text).toHaveCSS('cursor', 'grabbing');
    await page.mouse.up();
  }
  const glass = page.locator('.hero-actions .glass-surface').first();
  await expect(glass).toHaveClass(/glass-surface--svg/);
  expect(await glass.evaluate((el) => getComputedStyle(el).backdropFilter)).toContain('url(');
  await expect(glass.locator('feDisplacementMap').first()).toHaveAttribute('scale', '-180');
  expect(await glass.locator('feImage').evaluate((el) => el.getAttribute('href'))).toMatch(
    /^data:image\/svg\+xml/,
  );
  await page.locator('.glass-profile').scrollIntoViewIfNeeded();
  await expect(page.locator('.profile-lens .glass-surface--webgl canvas')).toBeVisible();
  const duplicateIds = await page
    .locator('[id]')
    .evaluateAll((els) => els.map((el) => el.id).filter((id, i, ids) => ids.indexOf(id) !== i));
  expect(duplicateIds).toEqual([]);
  expect(errors).toEqual([]);
});
