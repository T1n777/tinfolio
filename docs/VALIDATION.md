# Validation — 16 October 2026

Production build passed with zero TypeScript/Astro errors, warnings, or hints. Six static pages generated. Total emitted JavaScript: **104.9 KB gzip**, under the enforced 160 KB ceiling.

These results apply to the dark redesign using the supplied component code. They supersede the 14 October results.

## Component verification

`npm run check:react-bits` passes. It compares all three JSX implementations and their CSS against `reactbitscode.txt`. Only the documented Micro Slats rendering caps and Glass Surface SVG-ID isolation are allowed differences. Tech Text and all supplied CSS are unchanged.

The site retains the complete Micro Slats wave shader and pointer-fluid simulation. Its rendering is capped at DPR 1 and 30 fps. Glass buttons and navigation use SVG backdrop displacement in Chromium; the profile object uses the supplied WebGL renderer against a local texture.

## Browser checks

**10 Playwright tests passed** on desktop Chromium and emulated mobile Chromium against the production preview. Coverage includes navigation, all four project pages, repository links, the PDF response, email copying, pause/play, reduced motion and live preference changes, no-JavaScript content, overflow, runtime exceptions, and axe accessibility scans.

Effect-specific checks verify changing Micro Slats frames, Tech Text dragging on desktop and tap response on mobile, the glass SVG displacement filter and generated texture, the profile object's WebGL canvas, and unique DOM IDs across hydrated components. These tests produced no runtime exceptions.

No automated axe violations were found in the tested home/project page views for WCAG 2 A/AA, 2.1 AA, and 2.2 AA rules. Additional browser checks at widths 320, 390, 768, and 1920 pixels found no horizontal overflow on the home page or any featured project page. Desktop, mobile, and glass-object screenshots were visually reviewed.

## Lighthouse

Final local **mobile simulation** on the production build with headless Chromium and software WebGL, with no concurrent browser tests:

| Category       | Score |
| -------------- | ----: |
| Performance    |    74 |
| Accessibility  |   100 |
| Best practices |   100 |
| SEO            |   100 |

| Metric                   |   Result |
| ------------------------ | -------: |
| First contentful paint   |    1.3 s |
| Largest contentful paint |    1.9 s |
| Total blocking time      | 1,330 ms |
| Cumulative layout shift  |        0 |

The performance score is below the original ≥90 target. The full interactive shader is substantially more expensive under software WebGL than the previous simplified configuration. Rendering caps reduced the observed blocking time considerably while preserving the effects, but did not eliminate it. A hardware-accelerated mobile device check is still needed to assess actual device responsiveness. No field performance claim is made.

These are local lab measurements, not field p75 metrics. Hosting latency and real-user Core Web Vitals require a deployment and traffic. Safari and Firefox were not exercised in this environment; exact glass rendering varies with backdrop-filter support. Automated accessibility checks are not a substitute for a full screen-reader audit.

## Visual previews

- [Desktop opening](preview-desktop.png)
- [Mobile opening](preview-mobile.png)
- [Glass profile object](preview-glass.png)

The live production deployment is hosted on Cloudflare Pages at https://tinfolio.pages.dev. The local development preview runs at http://localhost:4321 and the local production preview at http://localhost:4322.
