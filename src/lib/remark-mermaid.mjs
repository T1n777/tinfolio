import { visit } from 'unist-util-visit';
import { createMermaidRenderer } from 'mermaid-isomorphic';
import { existsSync } from 'node:fs';

const chromiumPath =
  process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);

let rendererPromise = null;

function getRenderer() {
  if (!rendererPromise) {
    rendererPromise = createMermaidRenderer({
      launchOptions: {
        executablePath: chromiumPath,
        args: ['--no-sandbox', '--enable-unsafe-swiftshader'],
      },
    });
  }
  return rendererPromise;
}

export default function remarkMermaid() {
  return async (tree) => {
    const instances = [];
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'mermaid' && parent && typeof index === 'number') {
        instances.push({ node, index, parent });
      }
    });

    if (instances.length === 0) return;

    const renderer = getRenderer();
    const diagrams = instances.map((item) => item.node.value);
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
          fontFamily: 'Manrope, Arial, sans-serif',
          fontSize: '13px',
        },
      },
    });

    for (let i = 0; i < instances.length; i++) {
      const res = results[i];
      const { index, parent } = instances[i];
      if (res.status === 'fulfilled' && res.value?.svg) {
        parent.children[index] = {
          type: 'html',
          value: `<figure class="blog-diagram"><div class="diagram-scroll" tabindex="0" role="region" aria-label="Diagram">${res.value.svg}</div></figure>`,
        };
      }
    }
  };
}
