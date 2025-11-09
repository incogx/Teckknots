import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * ------------------------------------------------------------
 * 🚀 Vite Configuration — TechKnots Academy (Vercel)
 * ------------------------------------------------------------
 * Framework: React + TypeScript + TailwindCSS + Supabase
 * Deployment: Vercel / Netlify (served from root, not subpath)
 *
 * Key Features:
 *  - Correct root base for modern hosting
 *  - SPA routing support for React Router
 *  - Optimized production build with esbuild
 *  - Local dev server on port 5173
 * ------------------------------------------------------------
 */

export default defineConfig({
  // ✅ Serve from root (for Vercel, Netlify, Cloudflare Pages)
  base: './',

  plugins: [react()],

  // ⚙️ Dev server configuration
  server: {
    port: 5173,
    open: true,
    strictPort: true,
  },

  // ⚙️ Preview (for local production testing)
  preview: {
    port: 4173,
    open: true,
  },

  // ⚙️ Production build optimization
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
  },

  // 🚀 Dependency optimization
  optimizeDeps: {
    exclude: ['lucide-react'], // prevents hot-reload lag
  },

  // 🧱 Aliases
  resolve: {
    alias: {
      '@': '/src',
    },
  },

  // 🌐 Inject React automatically for JSX
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
})
