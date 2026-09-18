// Builds the complete website into dist/.
//   dist/                     landing page (index.html, page.js, scrub-engine.js, styles.css)
//   dist/roadmap/             roadmap page + bundled React app
//   dist/tower-overview/      tower overview page + bundled React/Three.js app
//   dist/shared/              navigation bar shared by every page
//   dist/assets/              brand, favicon and landing-page media
//   dist/data/                roadmap, tower and anatomy content loaded at runtime
//   dist/ATTRIBUTION.md, dist/HUMAN-ATLAS-LICENSE.txt  licences that must ship with the site
import { build } from 'esbuild';
import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');
const copy = (from, to) => cp(path.join(root, from), path.join(dist, to), { recursive: true });

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

// Static files.
await copy('src/landing', '.');
await copy('src/shared/site-nav.css', 'shared/site-nav.css');
await copy('src/shared/site-nav.js', 'shared/site-nav.js');
await copy('src/shared/theme.css', 'shared/theme.css');
await copy('src/shared/smooth-scroll.js', 'shared/smooth-scroll.js');
await copy('src/roadmap/index.html', 'roadmap/index.html');
await copy('src/tower-overview/index.html', 'tower-overview/index.html');
await copy('assets', 'assets');
await copy('content/roadmaps', 'data/roadmaps');
await copy('content/towers', 'data/towers');
await copy('content/anatomy', 'data/anatomy');
await copy('licenses/ATTRIBUTION.md', 'ATTRIBUTION.md');
await copy('licenses/HUMAN-ATLAS-LICENSE.txt', 'HUMAN-ATLAS-LICENSE.txt');

// React applications.
const shared = {
  absWorkingDir: root,
  bundle: true,
  splitting: true,
  format: 'esm',
  jsx: 'automatic',
  minify: true,
  target: ['es2022'],
  legalComments: 'linked',
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'info',
};
await build({ ...shared, entryPoints: { roadmap: path.join(src, 'roadmap/main.tsx') }, outdir: path.join(dist, 'roadmap/assets') });
await build({ ...shared, entryPoints: { 'tower-overview': path.join(src, 'tower-overview/main.tsx') }, outdir: path.join(dist, 'tower-overview/assets') });

console.log('Built the website in dist/. Run "npm start" to open it locally.');
