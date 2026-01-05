import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import dts from 'unplugin-dts/vite';
import { defineConfig } from 'vite';

import { peerDependencies } from './package.json';

const entryPoints = ['./eslint.config.ts', './prettier.config.ts', './stylelint.config.ts'];

// trap the no more existing glob-util import / require in eslint-plugin-import
const globUtilsTrapPath = resolve(
  import.meta.dirname,
  'node_modules',
  '.cache',
  'glob-util.trap.js'
);
rmSync(globUtilsTrapPath, { force: true });
mkdirSync(dirname(globUtilsTrapPath), { recursive: true });
writeFileSync(globUtilsTrapPath, '');

export default defineConfig({
  build: {
    ssr: true,
    minify: false,
    outDir: 'dist',
    lib: {
      entry: entryPoints,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
  ssr: {
    external: Object.keys(peerDependencies),
    noExternal: true,
  },
  resolve: {
    // some imports are not resolvable, but vite--require fails on static
    // code analysis ignoring the wrapping try-catch for runtime checks
    alias: [
      {
        find: /eslint\/lib\/cli-engine\/file-enumerator/,
        replacement: resolve(
          __dirname,
          'node_modules',
          'eslint',
          'lib',
          'cli-engine',
          'file-enumerator.js'
        ),
      },
      {
        find: /eslint\/lib\/util\/glob-utils?/,
        replacement: globUtilsTrapPath,
      },
    ],
  },
  plugins: [dts({ include: [...entryPoints, './modules.d.ts'] })],
});
