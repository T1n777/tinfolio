import { readdirSync, readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const files = readdirSync('dist/_astro').filter((file) => file.endsWith('.js'));
const total = files.reduce(
  (sum, file) => sum + gzipSync(readFileSync(join('dist/_astro', file))).length,
  0,
);
const limit = 160 * 1024;
console.log(`JavaScript budget (all chunks): ${(total / 1024).toFixed(1)} / 160 KB gzip`);
if (total > limit) {
  console.error('JavaScript budget exceeded. Review added dependencies before shipping.');
  process.exit(1);
}
