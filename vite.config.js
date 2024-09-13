import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL),
      'process.env.BUBBLE_IMAGE_PATH': JSON.stringify(env.BUBBLE_IMAGE_PATH),
      'process.env.CHART_DATA_URL': JSON.stringify(env.CHART_DATA_URL),
      'process.env.CRYPTO_NEWS_URL': JSON.stringify(env.CRYPTO_NEWS_URL)
    },
    plugins: [react()],
  }
})