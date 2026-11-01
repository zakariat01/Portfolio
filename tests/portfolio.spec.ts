import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { mkdir } from 'node:fs/promises'

test('the recruiter journey: navigation, empty work, CV download, and contact', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Zakaria Toura', exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'Explore work' }).click()
  await expect(page).toHaveURL(/#work$/)
  await expect(page.locator('#work article')).toHaveCount(3)
  await expect(page.getByText('Project details coming soon.', { exact: true })).toHaveCount(3)
  await expect(page.locator('#work article a')).toHaveCount(0)
  await expect(page.locator('#work img, #work video')).toHaveCount(0)

  const cv = page.getByRole('link', { name: 'Download CV (French)' })
  const downloadPromise = page.waitForEvent('download')
  await cv.click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('Zakaria-Toura-CV-FR.pdf')
  const response = await page.request.get('/cv/Zakaria-Toura-CV-FR.pdf')
  expect(response.status()).toBe(200)
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')

  await page.getByRole('link', { name: 'Contact', exact: true }).click()
  await expect(page).toHaveURL(/#contact$/)
  await expect(page.getByRole('link', { name: 'Email Zakaria Toura', exact: true })).toHaveAttribute('href', 'mailto:zikotour129@gmail.com')
  await expect(page.getByRole('link', { name: 'Visit Zakaria Toura on GitHub' })).toHaveAttribute('href', 'https://github.com/zakariat01')
  expect(errors).toEqual([])
})

test('language switching preserves the section, updates metadata and remembers the choice', async ({ page }) => {
  await page.goto('/')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.locator('#work').evaluate((element) => element.scrollIntoView())
  const before = await page.locator('#work').evaluate((element) => element.getBoundingClientRect().top)
  // Trigger while scrolled so the test covers position restoration without scrolling the header into view.
  await page.getByRole('button', { name: 'Français', exact: true }).evaluate((element: HTMLButtonElement) => element.click())
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
  expect(Math.abs(await page.locator('#work').evaluate((element) => element.getBoundingClientRect().top) - before)).toBeLessThan(4)
  await expect(page.getByRole('heading', { name: 'La suite prend forme.' })).toBeVisible()
  await expect(page.locator('#work article h3').first()).toHaveText('Projet 01')
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'fr_FR')
  await expect(page).toHaveTitle('Zakaria Toura — Développeur full-stack')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
  await expect(page.getByRole('button', { name: 'Français', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: 'English', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('link', { name: 'Download CV (French)' })).toBeVisible()
})

test('monogram works with keyboard and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main')).toBeFocused()
  const control = page.getByRole('button', { name: 'Zoom into the monogram' })
  await control.focus()
  await page.keyboard.press('Enter')
  await expect(control).toHaveAttribute('aria-pressed', 'true')
  await page.keyboard.press('ArrowRight')
  await expect(control.locator('img')).toHaveCSS('transform', /matrix/)
  await page.keyboard.press('Escape')
  await expect(control).toHaveAttribute('aria-pressed', 'false')
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
})

test('a French deep link works with storage disabled', async ({ browser }) => {
  const context = await browser.newContext()
  await context.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage unavailable') } }))
  const page = await context.newPage()
  await page.goto('/?lang=fr#about')
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
  await page.getByRole('button', { name: 'English', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page).toHaveURL(/lang=en#about$/)
  await context.close()
})

test('essential identity and contact remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Zakaria Toura' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'zikotour129@gmail.com' })).toHaveAttribute('href', 'mailto:zikotour129@gmail.com')
  await expect(page.getByRole('link', { name: /Download CV/ })).toBeVisible()
  await context.close()
})

for (const viewport of [{ width: 1440, height: 1024 }, { width: 834, height: 1194 }, { width: 390, height: 844 }, { width: 320, height: 740 }]) {
  test(`responsive layout and accessibility at ${viewport.width}px in both languages`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    for (const locale of ['en', 'fr']) {
      if (locale === 'fr') await page.getByRole('button', { name: 'Français', exact: true }).click()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
      expect(results.violations.map((issue) => ({ id: issue.id, nodes: issue.nodes.map((node) => node.target) }))).toEqual([])
      for (const link of await page.locator('header a, header button').all()) {
        const box = await link.boundingBox()
        expect(box?.width).toBeGreaterThan(20)
        expect(box?.height).toBeGreaterThanOrEqual(34)
      }
    }
  })
}

test('capture the rendered design and animation states', async ({ page }) => {
  await mkdir('docs/verification', { recursive: true })
  await page.setViewportSize({ width: 946, height: 1663 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.locator('.name')).toHaveCSS('transform', 'none')
  await page.screenshot({ path: 'docs/verification/desktop-reference-viewport.png', fullPage: true })
  await page.screenshot({ path: 'docs/verification/desktop-reference-frame.png' })
  await page.locator('.hero').screenshot({ path: 'docs/verification/hero.png' })
  const control = page.getByRole('button', { name: 'Zoom into the monogram' })
  await control.hover({ position: { x: 50, y: 50 } })
  await expect.poll(async () => control.locator('img').evaluate((image) => getComputedStyle(image).transform)).not.toBe('none')
  await control.click()
  await expect(control).toHaveAttribute('aria-pressed', 'true')
  await page.screenshot({ path: 'docs/verification/monogram-detail.png' })
  await control.press('Escape')
  await page.setViewportSize({ width: 1440, height: 1024 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'docs/verification/desktop-1440.png', fullPage: true, animations: 'disabled' })
  await page.setViewportSize({ width: 834, height: 1194 })
  await page.screenshot({ path: 'docs/verification/tablet-834.png', fullPage: true, animations: 'disabled' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({ path: 'docs/verification/mobile-390.png', fullPage: true, animations: 'disabled' })
  await page.getByRole('button', { name: 'Français', exact: true }).click()
  await page.screenshot({ path: 'docs/verification/mobile-fr-390.png', fullPage: true, animations: 'disabled' })
})
