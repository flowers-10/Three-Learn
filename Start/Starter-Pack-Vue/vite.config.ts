import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    //设置路径别名
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsDir: 'static'
  },
  server: {
    port: 8848,
  },
});
