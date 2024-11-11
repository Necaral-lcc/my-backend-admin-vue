import vue from "@vitejs/plugin-vue";
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import { pathResolve } from "./utils";
import checker from "vite-plugin-checker";
import inspector from "vite-plugin-vue-inspector";
import removeNoMatch from "vite-plugin-router-warn";
// import svgLoader from "vite-svg-loader";
import compressChunk from "vite-plugin-compression";
import removeConsole from "vite-plugin-remove-console";
import { visualizer } from "rollup-plugin-visualizer";

export const getPlugins = (isCompress: boolean = false) => {
  const lifecycle = process.env.npm_lifecycle_event;

  return [
    vue(),
    vueJsxPlugin(),
    VueI18nPlugin({
      include: [pathResolve("../local-lang/**")]
    }),
    checker({
      typescript: true,
      eslint: {
        lintCommand: `eslint ${pathResolve(
          "../{src,build}/**/*.{vue,js,ts,tsx}"
        )}`,
        useFlatConfig: true
      },
      terminal: false,
      enableBuild: false
    }),
    inspector(),
    removeNoMatch(),
    compressChunk({
      threshold: 1024 * 10, //单位 byte
      disable: isCompress
    }),
    removeConsole(),
    lifecycle === "report"
      ? visualizer({ open: true, brotliSize: true, filename: "report.html" })
      : []
  ];
};
