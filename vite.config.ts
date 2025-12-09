import { defineConfig } from 'vite';

import { dependencies, peerDependencies } from './package.json';

const entryPoints = ['./eslint.config.ts', './prettier.config.ts', './stylelint.config.ts'];

export default defineConfig({
  build: {
    ssr: true,
    minify: false,
    outDir: 'dist',
    lib: {
      entry: entryPoints,
      formats: ['es', 'cjs'],
    },
  },
  ssr: {
    external: Object.keys(peerDependencies),
    noExternal: Object.keys(dependencies),
  },
  // plugins: [dts({ include: entryPoints })],
});
