# Tinfolio — Developer Portfolio Template

A modern, high-performance personal portfolio template built with Astro, React, TypeScript, and custom CSS. Designed with dark graphite surfaces, interactive WebGL fluid animations, kinetic canvas typography, and refractive liquid glass UI components.

This repository (`main` branch) contains the clean, customizable template version ready to be cloned and personalized.

## Features

### 1. Interactive Micro Slats (WebGL)
- Procedural water-surface slat simulation written in GLSL and rendered with OGL.
- Pointer-fluid interaction responding to cursor movement, velocity, and touch drag on mobile screens.
- WebGL2 hardware check with automatic fallback to CSS gradients when acceleration is unavailable or data-saver mode is active.
- Accessible reduced-motion mode rendering static, non-animated slats when `prefers-reduced-motion: reduce` is enabled.
- Integrated interactive pause/play motion control button.

### 2. Kinetic Tech Text
- Canvas-rendered dynamic typography engine for the primary hero title.
- Physics-based spring animations allowing individual glyphs to be dragged, thrown, or kicked on click/tap.
- Real-time bounding box calculation, baseline detection, and technical metrics rendering.
- Zero layout shift with immediate SSR fallback typography rendered while fonts load.

### 3. Liquid Glass UI Components
- Glassmorphic navigation bar and action buttons powered by SVG displacement filters (`feDisplacementMap`, `feColorMatrix`, `feGaussianBlur`).
- Light refraction and chromatic aberration effects replicating physical glass lenses.
- Adaptive rendering pipeline: hardware-accelerated SVG filter displacement on Chromium, with progressive fallback to frosted backdrop-filter styling on browsers where custom SVG filter backdrops are restricted.
- Dynamic WebGL texture refraction on profile visuals with real-time mouse tracking.

### 4. Accessibility and Semantic Standards
- Built to satisfy WCAG 2.2 Level AA accessibility criteria.
- Full functionality without JavaScript: static HTML delivers all navigation routes, case study content, resume downloads, and contact channels.
- Keyboard accessible with skip-to-content link and high-contrast focus rings.
- Automated accessibility regression tests powered by `@axe-core/playwright`.

### 5. Performance and Budget Standards
- Strict client-side JavaScript budget enforcing a maximum threshold of 160 KB gzipped across all combined script chunks.
- Zero client-side JavaScript overhead for static pages and non-interactive sections.
- Self-hosted subsetted fonts (`Manrope` and `IBM Plex Mono` in WOFF2 format) preloaded in document head.
- Optimized responsive image delivery (WebP and AVIF).

## Technology Stack

- Framework: Astro 7
- UI Components: React 19
- Language: TypeScript 5.9
- 3D / Shaders: OGL 1.0
- Testing: Playwright 1.56, Axe-core Playwright 4.10
- Code Formatting: Prettier 3.9 with Prettier Plugin Astro

## Project Structure

```text
├── astro.config.mjs          # Astro and Vite build settings
├── package.json              # Project dependencies and operational scripts
├── playwright.config.ts      # Test suite runner configuration
├── tsconfig.json             # TypeScript compiler settings
├── public/                   # Static assets, fonts, and resume
│   ├── fonts/                # Subsetted WOFF2 font files
│   ├── images/               # Project diagrams and visual assets
│   └── resume.pdf            # Your downloadable resume document
├── src/
│   ├── components/           # Astro and React UI components
│   │   ├── react-bits/       # MicroSlats, TechText, and GlassSurface components
│   │   ├── Navigation.tsx    # Responsive glassmorphic navigation bar
│   │   ├── HeroArt.tsx       # MicroSlats WebGL container with motion controls
│   │   ├── NameArt.tsx       # TechText typography wrapper with fallback
│   │   ├── GlassLink.tsx     # Refractive glass link button component
│   │   ├── GlassProfile.tsx  # WebGL optical lens profile component
│   │   ├── Layout.astro      # Master HTML layout, metadata, and JSON-LD schema
│   │   └── ProjectVisual.astro # Project graphic cards and diagrams
│   ├── data/
│   │   └── portfolio.ts      # Core configuration: your name, bio, projects, and links
│   ├── pages/
│   │   ├── index.astro       # Main landing page
│   │   ├── 404.astro         # Custom 404 error page
│   │   └── work/[slug].astro # Dynamic case study detail routes
│   └── styles/
│       └── global.css        # Design tokens, color themes, resets, and layout
├── scripts/
│   ├── check-budget.mjs      # Enforces 160 KB gzipped client bundle budget
│   └── check-react-bits.mjs  # Audits component implementations against baseline
├── tests/
│   └── portfolio.spec.ts     # Playwright E2E and Axe accessibility test suite
└── docs/                     # Design decisions, attribution, and architecture notes
```

## How to Customize for Yourself

For a comprehensive, step-by-step walkthrough covering every customization option (adding names, changing copy, adjusting color palettes, adding repo cards, custom screenshots, and typography), see [USAGE.md](USAGE.md).

### 1. Update Personal Information and Projects

Open `src/data/portfolio.ts` to configure your profile:

```typescript
export const person = {
  name: 'Your Name',
  monogram: 'yn',
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
};
```

Update the `projects` array with your featured projects:
- `slug`: URL slug for the case study route (`/work/[slug]/`).
- `name`: Display name of the project.
- `summary`: One-sentence deck description.
- `stack`: Array of technologies used.
- `repo`: GitHub repository link.
- `live`: Optional live deployment URL.
- `visual`: Visual archetype (`server`, `security`, `wifi`, `motion`).
- `problem`, `approach`, `outcome`, `highlights`: Detailed case study breakdown.

Update `otherProjects` with additional repositories to display in the workbench table.

### 2. Replace Your Resume

Place your PDF resume at `public/resume.pdf`. All resume download buttons and navigation links reference this path.

### 3. Customize Colors and Styling

Adjust CSS variables in `src/styles/global.css`:

```css
:root {
  --paper: #080b0f;
  --ink: #edf1f7;
  --muted: #a0a9b7;
  --line: #28313d;
  --accent: #b9dcf6;
}
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

Open `http://localhost:4321` in your browser.

### Production Build

Run Astro diagnostics, compile static files, and verify JavaScript bundle budgets:

```sh
npm run build
```

The production output will be generated in `dist/`.

### Preview Production Build

Preview the compiled production build locally:

```sh
npm run preview -- --port 4322
```

Navigate to `http://localhost:4322`.

## Verification and Testing

Run the full end-to-end and accessibility test suite:

```sh
npm test
```

Run component integrity checks:

```sh
npm run check:react-bits
```

Run TypeScript and Astro type checks:

```sh
npm run check
```

## Deployment Options

Deploy the static output directory `dist/` to any static hosting platform:

### Cloudflare Pages
- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `dist`

### Vercel
- Framework preset: `Astro`
- Build command: `npm run build`
- Output directory: `dist`

### Netlify
- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages
Deploy using the official Astro GitHub Actions deployment workflow. Ensure `site` is configured in `astro.config.mjs` with your GitHub Pages URL.

## Credits and Acknowledgments

Interactive UI and animation components throughout this project are powered by [React Bits](https://reactbits.dev) created by [David Haz](https://github.com/DavidHDev):

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

