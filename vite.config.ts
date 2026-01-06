import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import dts from 'unplugin-dts/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

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
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        exports: 'named',
        entryFileNames: '[name].js',
      },
    },
    // commonjsOptions: {
    //   transformMixedEsModules: true,
    //   include: [/node_modules/],
    //   ignoreDynamicRequires: true,
    // },
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
  plugins: [
    //     {
    //       name: 'esm-shim',
    //       renderChunk(code, chunk, { format }) {
    //         if (chunk.isEntry && format === 'es') {
    //           return `
    // import { createRequire as _createRequireShim } from 'node:module';
    // const require = _createRequireShim(import.meta.url);
    // const __dirname = new URL(\`\${import.meta.url}/..\`).pathname;
    // ${code}
    //           `;
    //         }
    //         return null;
    //       },
    //     },
    viteStaticCopy({
      targets: [{ src: './node_modules/eslint-plugin-prettier/worker.mjs', dest: '.' }],
    }),
    dts({ include: [...entryPoints, './modules.d.ts'] }),
  ],
});
