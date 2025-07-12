import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

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
    })
  ],
  base: '/', // Importante per GitHub Pages con dominio personalizzato
  resolve: {
    dedupe: ['react', 'react-dom', 'react-reconciler']
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
      }
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
    host: true,
    port: 5173
  }
});
