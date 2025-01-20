
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { VitePWA } from 'vite-plugin-pwa'

// Load environment variables based on the mode (development or production)
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE');
  dotenv.config({ path: `.env.${mode}` });

  return {
    plugins: [react(),
      VitePWA({
        // only enable in production
        devOptions: { enabled: false },
        registerType: 'autoUpdate',
        manifest: {
          /* your manifest here */
        }
      })
    ],
    optimizeDeps: {
    },
    define: {
      'process.env': env,
    },
  };
});

