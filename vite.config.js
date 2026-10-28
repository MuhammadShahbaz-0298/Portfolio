// Vite config: React + Tailwind CSS v4 plugins. Nothing else needed.
// To change build output or base path, edit here (see README deploy section).
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
