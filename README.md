# Yatin Rajesh — Portfolio

A modern, high-performance personal portfolio built with Astro, React, TypeScript, and custom CSS. Features dark graphite aesthetic surfaces, fluid WebGL animations, kinetic canvas typography, and refractive liquid glass UI elements.

## Overview

This repository powers the live portfolio of Yatin Rajesh, a computer science student and software developer based in Bengaluru, India. It showcases systems projects, reverse engineering and security research, Android development, and computer vision work.

The application is architected around Astro's Island architecture, delivering pre-rendered static HTML by default while hydrating isolated, interactive React components only where needed.

## Key Technical Highlights

### 1. Micro Slats Dynamic Background (WebGL)
- Real-time procedural water-surface and slat simulation written in GLSL and rendered with OGL.
- Full pointer-fluid interaction supporting cursor swirls, wave dispersal, and touch events on mobile devices.
- Hardware acceleration check with WebGL2 context fallback to lightweight CSS gradients when WebGL is unavailable or when data-saver mode is active.
- Accessible reduced-motion support that disables fluid animations and renders static, low-power slats when `prefers-reduced-motion: reduce` is detected.
- Includes an in-browser motion toggle button to pause or resume animation at any time.

### 2. Interactive Tech Text
- Kinetic canvas-based typography engine rendering the primary hero title.
- Physics-driven spring animations allowing users to grab, drag, and kick individual letterforms with pointer or touch inputs.
- Real-time glyph boundary calculation, baseline detection, and technical metrics rendering.
- Graceful SSR fallback rendering semantic text immediately while web fonts initialize asynchronously.

### 3. Liquid Glass UI Surface
- Physical glassmorphic navigation bar and action buttons utilizing inline SVG displacement filters (`feDisplacementMap`, `feColorMatrix`, `feGaussianBlur`).
- Multi-layer chromatic aberration and light refraction effects mimicking physical glass lenses.
- Adaptive rendering: defaults to hardware-accelerated SVG filter displacement on Chromium, with progressive fallback to frosted backdrop-filter styling on browsers where custom SVG filter backdrops are restricted.
- Dynamic WebGL texture refraction on profile visuals with real-time mouse tracking.

### 4. Accessibility and Semantic Structure
- Built to satisfy WCAG 2.2 Level AA accessibility standards.
- Fully functional without JavaScript enabled: all navigation links, case study details, resume downloads, and contact channels remain accessible in static HTML.
- Dedicated skip-to-content accessibility link for keyboard navigation.
- Accessible ARIA labels, semantic landmark regions (`nav`, `main`, `section`, `footer`), and visible focus outlines.
- Automated accessibility regression testing enforced in CI via `@axe-core/playwright`.

### 5. Performance and Budget Optimization
- Strict client-side JavaScript budget enforcing a maximum threshold of 160 KB gzipped for all combined script chunks.
- Zero client-side bundle overhead for static sections.
- Self-hosted subsetted fonts (`Manrope` and `IBM Plex Mono` in WOFF2 format) with preloading for instantaneous text rendering.
- Optimized responsive image formats (WebP and AVIF).

## Technology Stack

- Framework: Astro 7
- UI Components: React 19
- Language: TypeScript 5.9
- 3D / Shader Engine: OGL 1.0
- Testing: Playwright 1.56, Axe-core Playwright 4.10
- Code Formatting: Prettier 3.9 with Prettier Plugin Astro

## Project Structure

```text
├── astro.config.mjs          # Astro and Vite configuration
├── package.json              # Project dependencies and operational scripts
├── playwright.config.ts      # End-to-end and accessibility test runner configuration
├── tsconfig.json             # TypeScript compiler settings
├── public/                   # Static assets, self-hosted fonts, and resume
│   ├── fonts/                # Subsetted WOFF2 font files
│   ├── images/               # Case study visuals and diagrams
│   └── Yatin-Rajesh-Resume.pdf # Downloadable resume document
├── src/
│   ├── components/           # Astro and React UI components
│   │   ├── react-bits/       # MicroSlats, TechText, and GlassSurface implementations
│   │   ├── Navigation.tsx    # Responsive glassmorphic header navigation
│   │   ├── HeroArt.tsx       # MicroSlats WebGL container with motion controls
│   │   ├── NameArt.tsx       # TechText typography wrapper with fallback
│   │   ├── GlassLink.tsx     # Refractive glass anchor button component
│   │   ├── GlassProfile.tsx  # WebGL optical lens profile component
│   │   ├── Layout.astro      # Master layout with metadata, JSON-LD, and skip link
│   │   └── ProjectVisual.astro # Project graphic cards and diagrams
│   ├── data/
│   │   └── portfolio.ts      # Profile, projects, stack, and contact data source
│   ├── pages/
│   │   ├── index.astro       # Main landing page
│   │   ├── 404.astro         # Not found page
│   │   └── work/[slug].astro # Dynamic case study detail pages
│   └── styles/
│       └── global.css        # Design tokens, resets, typography, and layout rules
├── scripts/
│   ├── check-budget.mjs      # Enforces 160 KB gzipped bundle budget on build output
│   └── check-react-bits.mjs  # Verifies component integrity against baseline
├── tests/
│   └── portfolio.spec.ts     # Playwright E2E and Axe accessibility test suite
└── docs/                     # Design decisions, attribution, and architecture notes
```

## Getting Started

### Prerequisites

- Node.js 22.12.0 or higher
- npm 9.6.0 or higher

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/T1n777/tinfolio.git
cd tinfolio
npm ci
```

### Development Server

Start the local development server:

```sh
npm run dev
```

The application will be accessible at `http://localhost:4321`.

### Production Build

Run type checks, build static assets, and verify bundle budgets:

```sh
npm run build
```

The production output is generated in the `dist/` directory.

### Preview Production Build

Serve the generated production build locally:

```sh
npm run preview -- --port 4322
```

The preview will be available at `http://localhost:4322`.

## Testing

The project includes an extensive Playwright test suite covering:
- Cross-device navigation across desktop and mobile viewports.
- Case study detail routes and outbound repository links.
- Resume download HTTP response verification.
- Clipboard API interaction and user feedback state.
- Animation control toggling and `prefers-reduced-motion` compliance.
- Complete navigation functionality with JavaScript disabled.
- Automated WCAG 2.2 AA accessibility evaluation via Axe.
- React Bits rendering verification (MicroSlats frame updates, TechText drag interactions, and Glass refraction).

Run tests:

```sh
npm test
```

Run component audit checks:

```sh
npm run check:react-bits
```

Run Astro and TypeScript type checks:

```sh
npm run check
```

## Deployment

The static output in `dist/` can be deployed directly to any static web host:

- Cloudflare Pages: set build command to `npm run build` and output directory to `dist`.
- Vercel: set framework to `Astro`, build command to `npm run build`, and output directory to `dist`.
- Netlify: publish directory `dist`, build command `npm run build`.
- GitHub Pages: deploy from GitHub Actions using the standard Astro GitHub Pages workflow.

## Credits and Acknowledgments

Interactive UI and animation components throughout this portfolio are powered by [React Bits](https://reactbits.dev) created by [David Haz](https://github.com/DavidHDev):

- [Micro Slats](https://reactbits.dev/backgrounds/micro-slats): Interactive WebGL slat simulation with pointer-fluid dynamics used in the hero background.
- [Tech Text](https://reactbits.dev/text-animations/tech-text): Physics-based spring typography engine with draggable glyphs and canvas metrics used for the dynamic headline art.
- [Glass Surface](https://reactbits.dev/components/glass-surface): Liquid glass displacement SVG filters and WebGL texture refraction powering the navigation bar, buttons, and profile lens.

Component licensing and provenance details are maintained in `docs/ATTRIBUTION.md` and `docs/REACT-BITS-LICENSE.md`.

## License

This project is licensed under the MIT License.

## Managing the blog

Posts live in `src/content/blog/`. Both `.md` and `.mdx` files are supported.
The filename determines the URL: `building-in-the-open.md` becomes
`/blog/building-in-the-open/`. Nested folders produce nested URLs.

### Add a post

Create a Markdown file with a lowercase, hyphenated filename and this frontmatter:

```yaml
---
title: "A new experiment"
description: "A short summary for the article list and search previews."
pubDate: 2026-10-17
draft: true
tags: ["Engineering"]
---
```

Write the article below the frontmatter. Start sections at `##` because the page
already renders the title as its `h1`. Add meaningful alt text to images and use
descriptive link text. Code fences can specify a language such as `typescript`
or `sh` for build-time syntax highlighting.

Run `npm run dev` and visit `/blog/`. Drafts appear with a Draft label locally.
Set `draft: false` (or remove the field) when ready to publish. Run
`npm run check`, `npm run build`, and `npm test` before deploying `dist/`.

### Edit, unpublish, or delete

- Edit the file directly; optionally set `updatedDate: 2026-10-18`.
- Set `draft: true` to unpublish without losing the source. Production builds
  exclude drafts from both the index and generated routes. Dev includes them.
- Delete the file to remove the post from the next build.
- Rebuild and redeploy after edits. Replace the previous deployment rather than
  copying over it, so unpublished or deleted HTML does not remain on the host.

`title`, `description`, and `pubDate` are required. `updatedDate`, `tags`, and
`readingTime` are optional; `draft` defaults to false. Dates use ISO format.
Reading time defaults to a minimum of one minute at 200 words per minute; use
`readingTime: "5 min read"` to override it. Posts sort newest first by `pubDate`.
Future dates do not schedule publication; use drafts for unpublished work.

Blog pages render static HTML, including their navigation, with no hydrated
islands. MDX components must remain server-rendered: do not add `client:*`
directives or browser scripts to posts. The blog tests check emitted pages for
client-side scripts and run Axe accessibility checks. Drafts are an editorial
convenience, not a place to store secrets in a public repository.
