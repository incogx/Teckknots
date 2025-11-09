import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * ------------------------------------------------------------
 * 🚀 Vite Configuration — TechKnots Academy
 * ------------------------------------------------------------
 * Framework: React + TypeScript + TailwindCSS + Supabase
 * Deployment: GitHub Pages (base path: /Teckknots/)
 *
 * Key Features:
 *  - Correct base path for GH Pages hosting
 *  - SPA routing support for React Router
 *  - Optimized build with esbuild
 *  - Local dev on port 5173 (auto opens)
 * ------------------------------------------------------------
 */

export default defineConfig({
  // ✅ MUST match your GitHub repository name exactly (case-sensitive)
  base: '/Teckknots/',

  plugins: [react()],

  // ⚙️ Dev server configuration
  server: {
    port: 5173,
    open: true,
    strictPort: true,
  },

  // ⚙️ Preview (for testing production build locally)
  preview: {
    port: 4173,
    open: true,
  },

  // ⚙️ Build optimization
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
  },

  // 🚀 Dependency optimization (speeds up dev server)
  optimizeDeps: {
    exclude: ['lucide-react'], // avoids hot-reload issues
  },

  // 🧱 Path aliases
  resolve: {
    alias: {
      '@': '/src',
    },
  },

  // 🌐 Inject React import automatically for JSX (optional quality-of-life)
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
})
