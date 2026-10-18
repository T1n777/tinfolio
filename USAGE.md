# Portfolio Customization Guide (USAGE.md)

This guide provides detailed, step-by-step instructions for customizing every aspect of the portfolio to match your identity, projects, colors, and experience.

---

## Table of Contents

1. [Quick Start](#1-quick-start)
2. [Project Architecture Overview](#2-project-architecture-overview)
3. [Personal Information and Identity](#3-personal-information-and-identity)
4. [Customizing Colors and Theme](#4-customizing-colors-and-theme)
5. [Customizing the Profile Badge and Location](#5-customizing-the-profile-badge-and-location)
6. [Editing Page Copy and Text Sections](#6-editing-page-copy-and-text-sections)
7. [Adding and Managing Featured Projects (Selected Work)](#7-adding-and-managing-featured-projects-selected-work)
8. [Adding Repository Cards (Also on My Workbench)](#8-adding-repository-cards-also-on-my-workbench)
9. [Project Visuals and Custom Screenshots](#9-project-visuals-and-custom-screenshots)
10. [Replacing Résumé and Favicon](#10-replacing-résumé-and-favicon)
11. [Typography and Self-Hosted Fonts](#11-typography-and-self-hosted-fonts)
12. [Validation, Testing, and Performance Budgets](#12-validation-testing-and-performance-budgets)
13. [Deployment Instructions](#13-deployment-instructions)
14. [Writing and Managing Blogs](#14-writing-and-managing-blogs)
15. [Credits and Acknowledgments](#15-credits-and-acknowledgments)

---

## 1. Quick Start

### Prerequisites
- Node.js version 22.12.0 or higher
- npm version 9.6.5 or higher

### Local Development Commands
```bash
# Install dependencies
npm install

# Start local development server (with live reload)
npm run dev

# Run type check and template validation
npm run check

# Verify component integrity
npm run check:react-bits

# Build static production distribution
npm run build

# Run Playwright end-to-end and accessibility test suite
npm test
```

---

## 2. Project Architecture Overview

The site is built with Astro 5, React 19, and vanilla CSS:

- `src/data/portfolio.ts`: Central data store for identity, featured projects, and workbench repositories.
- `src/styles/global.css`: CSS variables, layout, typography, glassmorphism, and responsive breakpoints.
- `src/components/`: Reusable Astro and React components (navigation, hero canvas, glass buttons, visuals).
- `src/pages/index.astro`: The single-page portfolio homepage containing all primary sections.
- `src/pages/work/[slug].astro`: Dynamic case study template generated for each featured project.
- `public/`: Static files served directly at root (`resume.pdf`, `favicon.svg`, fonts, and images).

---

## 3. Personal Information and Identity

All personal metadata is managed in `src/data/portfolio.ts`.

### Modifying the Person Object

Open `src/data/portfolio.ts` and locate the `person` object at the top:

```typescript
export const person = {
  name: 'Your Name',
  monogram: 'yn',
  email: 'hello@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
};
```

Update each field:
- `name`: Your full display name (e.g. `'Alex Mercer'`).
- `monogram`: Two or three lowercase letters used for the navigation logo and profile lens (e.g. `'am'`).
- `email`: Your public contact email address (e.g. `'alex@example.com'`).
- `github`: Full URL to your GitHub profile.
- `linkedin`: Full URL to your LinkedIn profile.

### Where This Data Automatically Updates
Editing `person` automatically updates the following components without any extra code changes:
1. Navigation logo monogram (`src/components/Navigation.tsx`).
2. Interactive Hero Name Art fallback and canvas render (`src/components/NameArt.tsx`).
3. Browser `<title>`, OpenGraph meta tags, and Schema.org JSON-LD structured data (`src/components/Layout.astro`).
4. About section profile lens monogram and caption (`src/components/GlassProfile.tsx`).
5. Contact section email display, mailto link, and clipboard copy action (`src/pages/index.astro`).
6. Social links in the contact footer and bottom footer brand link (`src/components/Layout.astro`).

---

## 4. Customizing Colors and Theme

The visual design system uses CSS custom properties defined in `src/styles/global.css` along with color arguments passed to WebGL and canvas components.

### 4.1 Global CSS Palette

Open `src/styles/global.css` and locate the `:root` rule around line 15:

```css
:root {
  color-scheme: dark;
  --paper: #080b0f;      /* Page background color */
  --ink: #edf1f7;        /* Primary heading and body text */
  --muted: #a0a9b7;      /* Secondary text, subtitles, and labels */
  --line: #28313d;       /* Border lines and grid separators */
  --accent: #b9dcf6;     /* Accent highlight color (light ice blue) */
  --dark: #080b0f;       /* Dark base for cards and glass backing */
  --mono: 'IBM Plex Mono', monospace;
  --sans: Manrope, Arial, sans-serif;
  --serif: Georgia, 'Times New Roman', serif;
}
```

To adjust the theme:
- **Warm Bronze / Amber**:
  - `--paper`: `#0d0b09`
  - `--accent`: `#e6b980`
  - `--line`: `#362b22`
- **Emerald / Terminal Green**:
  - `--paper`: `#080d0a`
  - `--accent`: `#80e6ab`
  - `--line`: `#1f3829`
- **Deep Indigo / Violet**:
  - `--paper`: `#090912`
  - `--accent`: `#c3b5f7`
  - `--line`: `#252445`

### 4.2 Text Selection Highlight
In `src/styles/global.css`, locate lines 45-48:

```css
::selection {
  background: #9bbbd4;
  color: #080b0f;
}
```
Update `background` to complement your chosen `--accent` color.

### 4.3 Mobile Browser Header Theme Color
In `src/components/Layout.astro`, locate line 23:

```astro
<meta name="theme-color" content="#080b0f" />
```
Set `content` to match your `--paper` background color.

### 4.4 WebGL Hero Background Shader Colors
The top hero section renders an interactive WebGL slat canvas using OGL.

Open `src/components/HeroArt.tsx` and find the `<MicroSlats>` configuration (lines 38-68):

```tsx
<MicroSlats
  color="#91aabb"          /* Slat foreground tone */
  glintColor="#ecf7ff"     /* Specular light shimmer reflection */
  backgroundColor="#080b10"/* Canvas clear color (match your --paper) */
  /* ...other parameters */
/>
```
- Set `backgroundColor` to match your `--paper` hex color.
- Set `color` and `glintColor` to match your desired ambient light tone.

### 4.5 Interactive Name Art Canvas Colors
The interactive headline canvas in `src/components/NameArt.tsx` renders your name with particles and dashed strokes.

Open `src/components/NameArt.tsx` (lines 47-48):

```tsx
<TechText
  color="#f2f5fa"          /* Main text stroke and fill */
  accentColor="#b9dcf6"    /* Particle specks and interactive click bursts */
  /* ...other parameters */
/>
```
Update `accentColor` to match your `--accent` palette color.

---

## 5. Customizing the Profile Badge and Location

The "The Person Behind the Code" card in the About section is rendered by `src/components/GlassProfile.tsx`.

### 5.1 Profile Image / Graphic
By default, the glass lens refracts an SVG graphic located at `public/images/optical-field.svg`.

To use your own photo or custom avatar:
1. Copy your image into `public/images/avatar.webp` (or `.jpg`, `.png`).
2. Open `src/components/GlassProfile.tsx` and update the `src` attribute around line 11:
   ```tsx
   <img
     ref={image}
     src="/images/avatar.webp"
     width="520"
     height="520"
     alt="Portrait of Alex Mercer"
     className="profile-backdrop"
   />
   ```

### 5.2 Geographic Coordinates
1. Open `src/components/GlassProfile.tsx` and update line 48:
   ```tsx
   <span className="profile-coordinate" aria-hidden="true">
     40.71° N &nbsp; 74.00° W
   </span>
   ```
2. Open `src/pages/index.astro` and update the hero topline location tag at line 21:
   ```astro
   <span class="eyebrow hero-coordinate">NEW YORK, NY ↗</span>
   ```
3. Update the experience location tags in `src/pages/index.astro` (lines 263 and 277) to match where your roles took place.

---

## 6. Editing Page Copy and Text Sections

All homepage text sections live in `src/pages/index.astro`.

### 6.1 Hero Intro Section (Lines 18-38)
```astro
<div class="hero-topline">
  <span class="eyebrow">
    <span class="status-dot"></span> A CURIOUS MIND. A HANDS-ON BUILDER.
  </span>
  <span class="eyebrow hero-coordinate">SAN FRANCISCO, CA ↗</span>
</div>
...
<div class="hero-intro">
  <p>
    I like knowing how things work.
    <br />
    <span>I like building them even more.</span>
  </p>
  <p class="hero-description">
    Computer science and software engineering.
    <br />
    Exploring systems, architecture, and the software in between.
  </p>
</div>
```
Modify the tagline, status eyebrow, and introductory sentences.

### 6.2 About Section Bio & Education (Lines 172-196)
```astro
<div class="about-copy">
  <h2 id="about-title">
    Understand it.
    <br />
    Take it apart.
    <br />
    <span class="muted-word">Build something.</span>
  </h2>
  <p>
    Your narrative paragraph 1...
  </p>
  <p>
    Your narrative paragraph 2...
  </p>
  <div class="education-note">
    <span class="eyebrow">CURRENTLY</span>
    <p>
      B.S. in Computer Science <span>University Name · 2022–2026</span>
    </p>
  </div>
</div>
```

### 6.3 Technical Toolkit Groups (Lines 198-225)
Customize the skills list by editing each category block in `src/pages/index.astro`:
```astro
<div class="toolkit-groups">
  <div>
    <span class="toolkit-label">01 / LANGUAGES</span>
    <p>
      Rust · TypeScript · Go<br />
      Python · SQL · C++
    </p>
  </div>
  <div>
    <span class="toolkit-label">02 / SYSTEMS</span>
    <p>
      Linux · Kubernetes · Docker<br />
      AWS · Cloudflare · Git
    </p>
  </div>
  <div>
    <span class="toolkit-label">03 / FRAMEWORKS & TOOLS</span>
    <p>
      Next.js · Astro · React<br />
      Tailwind CSS · PostgreSQL
    </p>
  </div>
</div>
```

### 6.4 Experience and Community Section (Lines 249-279)
Each work experience or community milestone is represented by an `<article class="experience-row">`.

To add, edit, or remove an experience entry:
```astro
<article class="experience-row">
  <div class="experience-date">
    MAY — AUG 2025<span>INTERNSHIP</span>
  </div>
  <div>
    <h3>Software Engineer Intern</h3>
    <p class="experience-org">Company Name · Infrastructure Team</p>
    <p>
      Description of what you built, technical challenges you solved,
      and quantifiable impact achieved during the role.
    </p>
  </div>
  <span class="experience-location">REMOTE</span>
</article>
```

---

## 7. Adding and Managing Featured Projects (Selected Work)

Featured projects appear in the "01 / SELECTED WORK" grid on the homepage and each project automatically receives an interactive case study page at `/work/[slug]/`.

### 7.1 Project Data Schema
In `src/data/portfolio.ts`, each project satisfies the `Project` interface:

```typescript
export interface Project {
  slug: string;             // URL path: /work/{slug}/
  number: string;           // Display index: '01', '02', etc.
  name: string;             // Display name
  category: string;         // Header category tag (e.g. 'SYSTEMS / CLOUD')
  year: string;             // Year created (e.g. '2026')
  role: string;             // Your role (e.g. 'Lead Developer')
  summary: string;          // 1-2 sentence overview for cards and case header
  stack: string[];          // List of technologies used
  repo: string;             // GitHub repository URL
  live?: string;            // Optional live production URL
  visual: 'server' | 'security' | 'wifi' | 'motion'; // Visual diagram type
  note: string;             // Diagram caption note
  problem: string;          // In-depth problem statement for case study
  approach: string[];       // Array of 3-4 bullet points detailing approach
  outcome: string;          // In-depth outcome paragraph
  highlights: {             // Key metrics or callouts displayed on case study
    value: string;
    label: string;
  }[];
}
```

### 7.2 Adding a New Featured Project
Add an entry to the `projects` array in `src/data/portfolio.ts`:

```typescript
{
  slug: 'hyper-cache',
  number: '05',
  name: 'Hyper Cache',
  category: 'DISTRIBUTED SYSTEMS / STORAGE',
  year: '2026',
  role: 'Systems Engineer',
  summary: 'In-memory distributed key-value store with raft consensus and sub-millisecond replication.',
  stack: ['Go', 'Raft', 'gRPC', 'Docker'],
  repo: 'https://github.com/yourusername/hyper-cache',
  live: 'https://hypercache.example.com',
  visual: 'server',
  note: 'CONSENSUS & REPLICATION PIPELINE',
  problem:
    'Scaling transactional cache invalidation across distributed edge nodes required predictable consensus without latency spikes.',
  approach: [
    'Implemented the Raft consensus algorithm in Go with custom heartbeats.',
    'Optimized serialisation using protocol buffers over multiplexed gRPC streams.',
    'Benchmarked memory allocation patterns and eliminated hot-path garbage collection overhead.',
  ],
  outcome:
    'Achieved sustained 120,000 requests per second throughput with 99th-percentile latencies below 1.5ms.',
  highlights: [
    { value: '120k', label: 'requests / sec' },
    { value: '<1.5 ms', label: 'p99 latency' },
    { value: 'Raft', label: 'strict consensus' },
  ],
},
```

Once saved:
- A card will appear on the homepage under "Selected Work".
- The case study will automatically render at `/work/hyper-cache/`.
- The case study "Next project" button will automatically link to the subsequent project.

---

## 8. Adding Repository Cards (Also on My Workbench)

Beneath the featured projects on the homepage is the "Also on my workbench" table. This section is ideal for open-source utilities, tools, libraries, and experiments that do not need a full case study page.

### 8.1 Data Structure
In `src/data/portfolio.ts`, locate the `otherProjects` array:

```typescript
export const otherProjects = [
  {
    name: 'Log Stream',
    category: 'NETWORKING',
    description: 'High-throughput UDP log aggregator with SDN priority queues for mission-critical events.',
    stack: 'Python / AsyncIO / Mininet',
    href: 'https://github.com/yourusername/log-stream',
  },
  {
    name: 'Code Study App',
    category: 'EDUCATION',
    description: 'Interactive computer science learning platform with live code playgrounds and flashcards.',
    stack: 'React / TypeScript / Vite',
    href: 'https://github.com/yourusername/code-study-app',
    live: 'https://example.com', // Optional live demo link
  },
];
```

### 8.2 Adding an Entry
To add a new repository row:
```typescript
{
  name: 'dotfiles',
  category: 'DEV ENVIRONMENT',
  description: 'Custom Arch Linux Hyprland configuration with automated deployment scripts and keybindings.',
  stack: 'Bash / Wayland / Lua',
  href: 'https://github.com/yourusername/dotfiles',
},
```

---

## 9. Project Visuals and Custom Screenshots

Project cards and case studies render graphic previews via `src/components/ProjectVisual.astro`.

### 9.1 Existing SVG Visual Presets
The template includes four built-in visual modes selectable via the `visual` property in `src/data/portfolio.ts`:
- `'server'`: Terminal window frame containing a system telemetry graphic.
- `'security'`: Control flow analysis and pattern recognition pipeline diagram.
- `'wifi'`: Mobile device illustration with network authentication waves.
- `'motion'`: Skeletal computer vision keyframe motion diagram.

### 9.2 Adding Custom Project Screenshots
To display real screenshots or mockups instead of SVG diagrams:

1. Place your project screenshot in `public/images/my-project.webp`.
2. Open `src/components/ProjectVisual.astro`.
3. Add a condition matching your project's visual name or slug:

```astro
{project.slug === 'hyper-cache' && (
  <div class="custom-screenshot-wrapper">
    <img
      src="/images/my-project.webp"
      alt={`Screenshot of ${project.name}`}
      width="1200"
      height="675"
      loading="lazy"
      decoding="async"
      style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;"
    />
  </div>
)}
```

---

## 10. Replacing Résumé and Favicon

### 10.1 Résumé
1. Export your résumé as a PDF file named `resume.pdf`.
2. Replace `public/resume.pdf` with your file.
3. All download links on the homepage (Hero, Experience section, Contact footer, and Case Study pages) link directly to `/resume.pdf`.

### 10.2 Favicon
The favicon is located at `public/favicon.svg`.
Open `public/favicon.svg` in a text editor to update the monogram letters or replace the file with your own SVG / ICO icon.

---

## 11. Typography and Self-Hosted Fonts

All fonts are self-hosted in `public/fonts/` for privacy, speed, and zero external network requests:
- **Display and Body**: `Manrope` (variable weights 200–800) -> `public/fonts/manrope-latin.woff2`
- **Monospace and Eyebrows**: `IBM Plex Mono` (400 weight) -> `public/fonts/ibm-plex-mono-latin.woff2`

### Using Different Fonts
1. Place your `.woff2` font files into `public/fonts/`.
2. In `src/styles/global.css`, update the `@font-face` blocks (lines 1-14):
   ```css
   @font-face {
     font-family: 'YourFont';
     src: url('/fonts/yourfont-latin.woff2') format('woff2');
     font-weight: 400 700;
     font-display: swap;
   }
   ```
3. Update `--sans` or `--mono` in the `:root` block:
   ```css
   :root {
     --sans: 'YourFont', sans-serif;
   }
   ```
4. If you change the primary display font, also update `fontFamily="YourFont"` in `src/components/NameArt.tsx` (line 43).

---

## 12. Validation, Testing, and Performance Budgets

This template includes strict performance and accessibility checks.

### 12.1 JavaScript Budget Check
Astro builds run `node scripts/check-budget.mjs` automatically during `npm run build`.
- The total gzipped size of all client-side JavaScript chunks must remain under **160 KB gzip**.
- If you install heavy client-side npm libraries, run `npm run build` to verify you do not exceed the budget.

### 12.2 Automated Tests (Playwright)
Run the test suite with:
```bash
npm test
```
The test suite in `tests/portfolio.spec.ts` verifies:
- Main navigation links and smooth scroll anchors.
- Accessibility compliance across WCAG 2.2 Level A and AA standards using Axe Core.
- Case study generation and slug links.
- Clipboard copy button functionality.
- Motion toggle button (pause and resume animations).

*Note: If you change the project names or the default contact email, update the matching string assertions in `tests/portfolio.spec.ts` so the tests continue to pass.*

---

## 13. Deployment Instructions

### Cloudflare Pages (Recommended)
1. In Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select your repository.
3. Configure settings:
   - **Production branch**: `main` (or your preferred branch)
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Expand **Environment variables (advanced)** and ensure Node 22 is used:
   - Variable: `NODE_VERSION`
   - Value: `22`
   *(The repository also includes `.node-version` and `.nvmrc` files specifying `22`)*.
5. Click **Save and Deploy**.

### Vercel
1. In Vercel, click **Add New** > **Project** and import your repository.
2. Framework Preset will auto-detect as **Astro**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Click **Deploy**.

---

## 14. Writing and Managing Blogs

The portfolio includes an Astro Content Collection for technical articles and notes located at `src/content/blog/`. Both Markdown (`.md`) and MDX (`.mdx`) are supported.

### 14.1 Adding a New Blog Post
1. Create a new `.md` or `.mdx` file in `src/content/blog/` using a hyphenated slug (e.g., `src/content/blog/systems-architecture.md`). The filename becomes the URL slug (`/blog/systems-architecture/`).
2. Include the required frontmatter at the top of the file:
```yaml
---
title: "Understanding Systems Architecture"
description: "A deep dive into distributed systems resilience and zero-latency caching."
pubDate: 2026-10-18
tags: ["Systems", "Architecture", "Engineering"]
draft: false
---
```
3. Write your post below the frontmatter using standard Markdown:
   - Use `##` (H2) and `###` (H3) for subheadings (the post title is automatically rendered as `H1`).
   - Use triple backticks with a language tag (e.g. ```` ```typescript ````) for syntax-highlighted code blocks.
   - Use `>` for blockquotes, `-` for bullet lists, and standard markdown links.

### 14.2 Frontmatter Fields
- `title` *(string, required)*: The title of the article.
- `description` *(string, required)*: Summary shown in search previews and on the `/blog/` index.
- `pubDate` *(date, required)*: Publication date (ISO format `YYYY-MM-DD`).
- `updatedDate` *(date, optional)*: Last updated date.
- `draft` *(boolean, optional, default: false)*: Draft status.
- `tags` *(array of strings, optional)*: Tags displayed on post cards and article headers.
- `readingTime` *(string, optional)*: Custom reading duration (e.g. `"4 min read"`). If omitted, reading time is calculated automatically based on word count.

### 14.3 Hiding and Unpublishing (Drafts)
- Set `draft: true` in the frontmatter.
- When `draft: true` is set:
  - During local development (`npm run dev`), the post remains visible with a subtle "Draft" badge for review.
  - During production builds (`npm run build`), drafts are automatically excluded from both the `/blog/` listing and static route generation.

### 14.4 Editing or Deleting a Post
- **To edit**: Modify the `.md` or `.mdx` file directly. You can add `updatedDate: YYYY-MM-DD` to display an update timestamp.
- **To delete**: Remove the `.md` file from `src/content/blog/`. On the next build, the page is completely removed.

### 14.5 Performance & Accessibility
All blog pages render 100% static HTML without client-side JavaScript islands, keeping the site well under the 160 KB JavaScript performance budget.

---

## 15. Credits and Acknowledgments

The interactive animated elements in this portfolio are powered by [React Bits](https://reactbits.dev) created by [David Haz](https://github.com/DavidHDev):

- [Micro Slats](https://reactbits.dev/backgrounds/micro-slats): Interactive WebGL slat simulation with pointer-fluid dynamics used in the hero background.
- [Tech Text](https://reactbits.dev/text-animations/tech-text): Physics-based spring typography engine with draggable glyphs and canvas metrics used for dynamic headline art.
- [Glass Surface](https://reactbits.dev/components/glass-surface): Displacement SVG filters and WebGL texture refraction powering the navigation bar, buttons, and profile lens.

Licensing terms and upstream references are documented in `docs/ATTRIBUTION.md` and `docs/REACT-BITS-LICENSE.md`.

