import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

// Keep the supplied implementations auditable, independently of their wrappers.
const source = readFileSync('reactbitscode.txt', 'utf8');
const names = ['MicroSlats', 'TechText', 'GlassSurface'];
const markers = ['micro slats:', 'Tech Text:', 'Glass Surface:'];
for (let i = 0; i < names.length; i++) {
  const section = source.slice(
    source.indexOf(markers[i]),
    i < 2 ? source.indexOf(markers[i + 1]) : undefined,
  );
  let code = section
    .split(/\n[Cc]ode:\n/)[1]
    .split('\nCSS:\n')[0]
    .trim();
  if (names[i] === 'MicroSlats') {
    // Optional rendering caps keep the complete shader and pointer fluid intact.
    code = code
      .replace('  paused = false,', '  paused = false,\n  maxDpr = 2,\n  maxFps = 0,')
      .replace('window.devicePixelRatio || 1, 2,', 'window.devicePixelRatio || 1, maxDpr,')
      .replace(
        '      if (!alive) return;',
        '      if (!alive) return;\n      if (maxFps > 0 && now - last < 1000 / maxFps - 1) {\n        raf = requestAnimationFrame(frame);\n        return;\n      }',
      )
      .replace('  }, []);', '  }, [maxDpr, maxFps]);');
  }
  if (names[i] === 'GlassSurface') {
    // Multiple glass instances need stable, unique SVG IDs across Astro islands.
    code = code
      .replace("  className = '',", "  idPrefix = '',\n  className = '',")
      .replace(
        "const uniqueId = useId().replace(/:/g, '-');",
        "const uniqueId = `${idPrefix}-${useId().replace(/:/g, '-')}`;",
      );
    for (const channel of ['red', 'green', 'blue'])
      code = code.replace(` id="${channel}channel"`, '');
  }
  assert.equal(
    readFileSync(`src/components/react-bits/${names[i]}.jsx`, 'utf8').trim(),
    code,
    `${names[i]} differs from the supplied source`,
  );
  assert.equal(
    readFileSync(`src/components/react-bits/${names[i]}.css`, 'utf8').trim(),
    section.split('\nCSS:\n')[1].trim(),
    `${names[i]} CSS differs from the supplied source`,
  );
  console.log(
    `${names[i]}: matches supplied code${i === 0 ? ' + rendering caps' : i === 2 ? ' + isolated SVG IDs' : ''}`,
  );
}
