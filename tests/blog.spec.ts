import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

test('all generated blog pages contain no client scripts or islands', () => {
  function check(directory: string) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) check(path);
      else if (entry.name.endsWith('.html')) {
        const html = readFileSync(path, 'utf8');
        expect(html).not.toMatch(/<astro-island\b/);
        const scripts = html.match(/<script\b[^>]*>/g) ?? [];
        expect(scripts.every((script) => script.includes('application/ld+json'))).toBe(true);
      }
    }
  }
  check('dist/blog');
});

test('blog navigation, prose, narrow layout and accessibility', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Blog', exact: true }).click();
  await expect(page).toHaveTitle(/^Blog — /);
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Blog' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await page.getByRole('link', { name: 'Building in the open', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Building in the open');
  await expect(page.locator('.blog-prose pre.astro-code')).toHaveCount(2);
  await expect(page.locator('.blog-prose blockquote')).toBeVisible();
  for (const url of ['/blog/', '/blog/building-in-the-open/']) {
    await page.goto(url);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      results.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  }
  await page.getByRole('link', { name: '← All articles' }).click();
  await expect(page).toHaveURL(/\/blog\/$/);
});

test('blog works without JavaScript at 320px', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 800 },
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/blog/');
  await page.getByRole('link', { name: 'Building in the open', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Building in the open');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('link', { name: '← All articles' }).click();
  await expect(page).toHaveURL(/\/blog\/$/);
  await context.close();
});
