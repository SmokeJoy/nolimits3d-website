import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
import compression from 'vite-plugin-compression';
import critical from 'rollup-plugin-critical';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has('webp')) {
          return new URLSearchParams('format=webp&quality=80');
        }
        if (url.searchParams.has('w')) {
          return new URLSearchParams();
        }
        return new URLSearchParams('format=webp&quality=80');
      }
    }),
    compression({ algorithm: "brotliCompress" })
  ],
  base: '/', // Importante per GitHub Pages con dominio personalizzato
  resolve: {
    dedupe: ['react', 'react-dom', 'react-reconciler', 'three'],
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      three: path.resolve(__dirname, 'node_modules/three')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'react-medium-image-zoom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          utils: ['uuid', 'html2pdf.js']
        },
        // Assicurati che i file JS abbiano l'estensione corretta
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
      plugins: [
        critical({
          inline: true,           // inietta nel <head>
          extract: false,
          criticalPages: [] // Imposta esplicitamente a un array vuoto
        })
      ]
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'react-reconciler',
      'html2pdf.js',
      'uuid'
    ],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  define: {
    global: 'globalThis',
  },
  // Configurazione server per sviluppo
  server: {
    historyApiFallback: true,
    host: true,
    port: 5173
  }
});
