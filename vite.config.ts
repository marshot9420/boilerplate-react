import { defineConfig } from 'vite';

// 라이브러리
import dotenv from 'dotenv';
import path from 'path';

// 플러그인
import react from '@vitejs/plugin-react';

const DEV_ENV = 'development';
const PROD_ENV = 'production';
const isDevMode = process.env.NODE_ENV !== PROD_ENV;

dotenv.config({ path: isDevMode ? '.env.development' : 'env.production' });

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_PREFIX: string = process.env.REACT_APP_API_PREFIX || '/';
const PORT = Number(process.env.REACT_APP_PORT);

const SOURCE_DIR = 'src';

const ENV: { [x: string]: string } = {
  NODE_ENV: isDevMode ? DEV_ENV : PROD_ENV,
};

for (const key in process.env) {
  if (key && key.startsWith('REACT_APP_')) {
    ENV[key] = process.env[key] || '';
  }
}

export default defineConfig({
  plugins: [react()],
  mode: isDevMode ? DEV_ENV : PROD_ENV,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, SOURCE_DIR),
    },
  },
  server: {
    open: true,
    port: PORT,
    proxy: {
      [API_PREFIX]: {
        target: API_BASE_URL,
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(new RegExp(`^${API_PREFIX}`), ''),
      },
    },
  },
});
