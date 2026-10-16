# Attribution and provenance

## React Bits

Micro Slats, Tech Text, and Glass Surface by David Haz / React Bits. On 16 October 2026, the previous implementations were replaced with the complete JSX and CSS supplied by the user in `reactbitscode.txt`:

- https://reactbits.dev/backgrounds/micro-slats
- https://reactbits.dev/text-animations/tech-text
- https://reactbits.dev/components/glass-surface
- Upstream project: https://github.com/DavidHDev/react-bits

Copyright and terms are retained in `REACT-BITS-LICENSE.md` (MIT + Commons Clause). The components are incorporated into this portfolio website, not offered as a separate component product.

Local adaptations are deliberately limited and checked by `npm run check:react-bits`:

- Micro Slats adds optional `maxDpr` and `maxFps` rendering caps. Their defaults retain the supplied behavior; this site uses DPR 1 and 30 fps to reduce the GPU workload. All shaders, intro animation, wave settings, pointer-fluid simulation, and the original 4.5-million-pixel ceiling remain intact.
- Tech Text JSX and CSS are unchanged. Wrappers configure its typography, reveal, selection, labels, dragging, click response, and sweep.
- Glass Surface adds an `idPrefix` prop and removes unused repeated channel IDs so SVG filters stay unique across independently hydrated Astro islands. Its SVG displacement and WebGL refraction implementations are retained.
- All three CSS files are unchanged. Typed declarations sit alongside the supplied JSX. Site wrappers add reduced-motion handling, pause/play controls, accessible semantic text, and static fallbacks. The supplied Glass Surface fallback handles browsers without its preferred backdrop-filter mode.

## Fonts

Manrope by the Manrope Project Authors and IBM Plex Mono by IBM, sourced from Google Fonts’ repository and self-hosted. Original source TTFs are in `font-sources/`. The website serves Latin subset WOFF2 files. The respective OFL licenses are retained alongside this file.

- https://github.com/google/fonts/tree/main/ofl/manrope
- https://github.com/google/fonts/tree/main/ofl/ibmplexmono

## Project visuals

- Server preview screenshot: optimized and encoded as WebP for this portfolio.
- SpectreFlow, PESU WiFi, Kinemation: custom SVG/CSS explanatory illustrations, labeled as concepts on the site. They are not screenshots, live telemetry, or recorded experimental outputs.
- `optical-field.svg`: an original decorative ring graphic used as the explicit backdrop texture for the WebGL Glass Surface profile object.

## Content sources

Project data, biography, and profile links are configurable in `src/data/portfolio.ts`.

