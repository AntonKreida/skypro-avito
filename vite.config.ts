import * as path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import checker from "vite-plugin-checker";

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
    plugins: [react(), svgr(), checker({
      typescript: true,
      eslint: {
        lintCommand: "eslint \"./**/*.{ts,tsx}\"",
      },
    })],
    preview: {
      port: +(process.env.VITE_PORT ?? '3000'),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
        "@shared": path.resolve(__dirname, "./src/shared/"),
        "@interfaces": path.resolve(__dirname, "./src/interfaces/"),
        "@components": path.resolve(__dirname, "./src/components/"),
        "@layouts": path.resolve(__dirname, "./src/layouts/"),
        "@pages": path.resolve(__dirname, "./src/pages/"),
        "@assets": path.resolve(__dirname, "./src/assets/"),
        "@context": path.resolve(__dirname, "./src/context/"),
        "@styles": path.resolve(__dirname, "./src/styles/"),
        "@hooks": path.resolve(__dirname, "./src/hooks/"),
        "@api": path.resolve(__dirname, "./src/api/"),
        "@hocs": path.resolve(__dirname, "./src/hocs/"),
        "@api-hooks": path.resolve(__dirname, "./src/api-hooks/"),
        "@lib": path.resolve(__dirname, "./src/lib/"),
        "@redux": path.resolve(__dirname, "./src/redux/"),
      },
    },
    server: {
      port: +(process.env.VITE_PORT ?? '3000'),
      host: true,
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  });
}
