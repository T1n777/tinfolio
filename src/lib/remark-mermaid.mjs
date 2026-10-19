import { visit } from 'unist-util-visit';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const cacheFile = join(process.cwd(), 'src/lib/diagram-cache.json');
let cache = {};

try {
  if (existsSync(cacheFile)) {
    cache = JSON.parse(readFileSync(cacheFile, 'utf8'));
  }
} catch {
  cache = {};
}

const chromiumPath =
  process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);

let rendererPromise = null;

async function getRenderer() {
  if (!chromiumPath) return null;
  if (!rendererPromise) {
    try {
      const { createMermaidRenderer } = await import('mermaid-isomorphic');
      rendererPromise = createMermaidRenderer({
        launchOptions: {
          executablePath: chromiumPath,
          args: ['--no-sandbox', '--enable-unsafe-swiftshader'],
        },
      });
    } catch {
      return null;
    }
  }
  return rendererPromise;
}

export default function remarkMermaid() {
  return async (tree) => {
    const instances = [];
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'mermaid' && parent && typeof index === 'number') {
        const code = node.value.trim();
        const hash = createHash('sha256').update(code).digest('hex');
        instances.push({ node, index, parent, code, hash });
      }
    });

    if (instances.length === 0) return;

    const uncached = instances.filter((item) => !cache[item.hash]);

    if (uncached.length > 0) {
      try {
        const renderer = await getRenderer();
        if (renderer) {
          const diagrams = uncached.map((item) => item.code);
          const results = await renderer(diagrams, {
            mermaidConfig: {
              theme: 'base',
              themeVariables: {
                darkMode: true,
                background: '#0d1219',
                mainBkg: '#151e29',
                nodeBorder: '#384759',
                textColor: '#edf1f7',
                lineColor: '#b9dcf6',
                primaryColor: '#151e29',
                primaryTextColor: '#edf1f7',
                primaryBorderColor: '#384759',
                secondaryColor: '#0d1219',
                secondaryTextColor: '#edf1f7',
                secondaryBorderColor: '#384759',
                tertiaryColor: '#1a2533',
                tertiaryTextColor: '#edf1f7',
                tertiaryBorderColor: '#384759',
                clusterBkg: '#0d1219',
                clusterBorder: '#28313d',
                edgeLabelBackground: '#0d1219',
                fontFamily: 'Arial, sans-serif',
                fontSize: '13px',
              },
            },
          });

          let cacheUpdated = false;
          for (let i = 0; i < uncached.length; i++) {
            const res = results[i];
            if (res.status === 'fulfilled' && res.value?.svg) {
              cache[uncached[i].hash] = res.value.svg;
              cacheUpdated = true;
            }
          }

          if (cacheUpdated) {
            try {
              writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
            } catch {
              // ignore cache write errors in read-only environments
            }
          }
        }
      } catch (err) {
        console.warn('remarkMermaid: live rendering failed, falling back:', err?.message || err);
      }
    }

    for (const item of instances) {
      const svg = cache[item.hash];
      if (svg) {
        item.parent.children[item.index] = {
          type: 'html',
          value: `<figure class="blog-diagram"><div class="diagram-scroll" tabindex="0" role="region" aria-label="Diagram">${svg}</div></figure>`,
        };
      }
    }
  };
}
