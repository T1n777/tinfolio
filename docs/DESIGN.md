# Design and implementation decisions

## Direction

The current direction is graphite, silver, and restrained ice-blue accents: large sans-serif typography, fine technical labels, dark project surfaces, and physical-looking refractive glass. This replaces the original paper/olive scheme at the user's request on 16 October 2026. Glass is concentrated in navigation, action buttons, and a single personal object; longer project and experience content sits on calm, readable backgrounds.

The hero carries the strongest visual effects. The project and experience sections prioritize reading. Instead of identical screenshot placeholders, Tinarchy uses its actual public dashboard screenshot; SpectreFlow gets a pipeline diagram; PESU WiFi gets a clearly labeled concept illustration; Kinemation gets a clearly labeled pose sequence. Illustrations are not represented as live product interfaces or experimental results.

## Assumptions and targets

The user delegated framework and design choices. These are implementation assumptions rather than answers supplied by the user:

1. Primary audience: mobile and desktop visitors. Both receive the requested effects; touch visitors can interact with Tech Text and Micro Slats.
2. Field targets at p75: LCP < 2,500 ms, INP < 200 ms, CLS < 0.1. Local lab results cannot establish real-world p75 or INP.
3. Static generation: content is public and changes infrequently; no authentication or runtime data service is needed.
4. JavaScript budget: 160 KB gzip for **all emitted chunks combined**, enforced during build. This deliberately allows the requested React effects; a zero-JavaScript portfolio would not satisfy the brief.
5. Searchable public content: the page text and links are generated as HTML.
6. Design source of truth: CSS custom properties and shared components in this repository; Yatin owns future design/content changes.
7. Accessibility: WCAG 2.2 AA target. Codex owns the implementation checks for this delivery; future maintenance belongs to the site owner. Automated checks do not constitute full accessibility certification.

Lab targets: Lighthouse mobile performance ≥90 and accessibility ≥95. The complete interactive effects are more expensive than the previous implementation; the current software-WebGL performance result is below the performance target. Measured results and limitations are in `docs/VALIDATION.md`, and supersede the earlier redesign's scores.

## Why Astro + React + TypeScript

Astro emits static HTML and hydrates only the effects and navigation. React integrates the actual requested components without rewriting their rendering systems. TypeScript keeps the project content and component boundaries consistent. Custom CSS provides a small, coherent design system without a template or UI framework. There is no need for a persistent Node server, database, or full-page client-side router.

Official references: [Astro islands](https://docs.astro.build/en/concepts/islands/), [Astro React integration](https://docs.astro.build/en/guides/integrations-guide/react/).

## React Bits placement

- Micro Slats: the opening hero's full animated slat field, with pointer-fluid interaction, glints, swell, and intro intact. Rendering is capped at DPR 1 and 30 fps. A pause control stops the slats and Tech Text; reduced motion uses static presentations. A CSS texture remains if WebGL is unavailable or data saving is enabled.
- Tech Text: the name wordmark and Selected Work heading. Desktop visitors can grab and drag letters; touch interaction is enabled too. Selection outlines, metric labels, and sweep are configured from the supplied implementation. Semantic headings exist independently of the canvases, and static words remain without JavaScript or with reduced motion.
- Glass Surface: floating navigation and action buttons use actual SVG backdrop displacement where supported. The tilted About profile object uses the supplied WebGL renderer with an explicit local image backdrop. Navigation has stronger blur and smaller color offsets than the buttons to keep links readable over scrolling content. Filter IDs are namespaced across Astro islands.

## Content decisions

- The résumé’s internship dates are January–April 2026, so it is described in the past tense.
- Hackerspace membership uses the résumé’s August 2025–present dates.
- Kinemation and PESU WiFi link to their canonical shared repositories and identify collaborative involvement.
- All four résumé projects are represented, alongside the additional substantive public projects. Forks, configuration-only repositories, and the profile README are not presented as original major projects.
- Email and the supplied downloadable résumé are available. The phone number is not duplicated into the page layout.
- Source documentation is preserved in links, not fetched at runtime.
- No unsupported employment, availability status, project adoption numbers, or invented impact metrics.

## Deployment boundary

The working site is local and the output is ready for static hosting. Publishing, choosing a domain, adding analytics, and modifying GitHub were not necessary to build the requested site and have not been done.
