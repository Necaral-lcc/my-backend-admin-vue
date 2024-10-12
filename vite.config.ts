import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import { include, exclude } from './build/optimize'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { cwd } from 'process'
import { separateEnv } from './build/utils'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const {
    VITE_APP_PORT,
    VITE_APP_TITLE,
    VITE_APP_URL,
    VITE_BASE_URL,
    VITE_REQUEST_API,
    VITE_REQUEST_API_2,
    VITE_REQUEST_API_3,
  } = separateEnv(loadEnv(mode, cwd()))
  return {
    plugins: [vue()],
    server: {
      port: VITE_APP_PORT,
      open: true,
      proxy: {
        [VITE_REQUEST_API]: {
          target: VITE_APP_URL,
          changeOrigin: true,
        },
        [VITE_REQUEST_API_2]: {
          target: VITE_APP_URL,
          changeOrigin: true,
        },
        [VITE_REQUEST_API_3]: {
          target: VITE_APP_URL,
          changeOrigin: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    base: VITE_BASE_URL,
    build: {
      outDir: 'product',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        $: path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      include,
      exclude,
    },
  }
})
