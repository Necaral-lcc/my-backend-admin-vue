import { defineConfig, loadEnv } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
import { include, exclude } from "./build/optimize";
import { cwd } from "process";
import { alias, pathResolve, __APP_INFO__ } from "./build/utils";
import { getPlugins } from "./build/plugins";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const {
    VITE_APP_PORT,
    VITE_APP_URL,
    VITE_BASE_URL,
    VITE_REQUEST_API,
    VITE_REQUEST_API_2,
    VITE_REQUEST_API_3
  } = loadEnv(mode, cwd());
  return {
    plugins: getPlugins(),
    server: {
      port: Number(VITE_APP_PORT),
      open: true,
      host: "0.0.0.0",
      proxy: {
        [VITE_REQUEST_API]: {
          target: VITE_APP_URL,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${VITE_REQUEST_API}`), "")
        },
        [VITE_REQUEST_API_2]: {
          target: VITE_APP_URL,
          changeOrigin: true
        },
        [VITE_REQUEST_API_3]: {
          target: VITE_APP_URL,
          changeOrigin: true
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    },
    base: VITE_BASE_URL,
    resolve: {
      alias
    },
    optimizeDeps: {
      include,
      exclude
    },
    build: {
      outDir: "product",
      assetsDir: "assets",
      // https://cn.vitejs.dev/guide/build.html#browser-compatibility
      target: "es2015",
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve("./index.html", import.meta.url)
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  };
});
