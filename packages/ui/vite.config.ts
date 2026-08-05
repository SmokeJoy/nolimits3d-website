import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { esmExternalRequirePlugin } from 'rolldown/plugins';

// @base-ui/utils bundles use-sync-external-store's CJS shim, which calls
// require("react") at runtime. Rolldown can't statically rewrite a require()
// against an external module unless that module is externalized through this
// plugin specifically (a plain rollupOptions.external entry isn't enough) —
// see https://rolldown.rs/in-depth/bundling-cjs#require-external-modules.
// Without it, the require() call survives into the browser bundle and throws
// because there is no global `require`.
const PEER_EXTERNALS = ['react', 'react-dom', 'react/jsx-runtime'];

export default defineConfig({
  plugins: [react(), tailwindcss(), esmExternalRequirePlugin({ external: PEER_EXTERNALS })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AtlasUI',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // PEER_EXTERNALS must NOT also be listed here: Rolldown skips the
      // plugin's conversion for anything already external at the top level,
      // which is exactly how this bug shipped in Wave C2.
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'styles.css';
          }
          return '[name].[ext]';
        },
      },
    },
  },
});
