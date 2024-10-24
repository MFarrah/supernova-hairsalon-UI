import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Run your frontend on port 3000
    open: true,  // Open the app in the browser automatically
  },
});
