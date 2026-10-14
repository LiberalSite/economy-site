import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev server runs inside Express (`npm run dev` → server.js --dev), so /api is served by the real backend.
export default defineConfig({
  plugins: [react()],
});
