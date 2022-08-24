/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      ...commonjs({
        transformMixedEsModules: true,
        dynamicRequireTargets: [
          "node_modules/react-native-paper/lib/module/components/*.js",
          "node_modules/react-native-vector-icons/*.js",
        ],
        include: ["node_modules/react-native-paper/lib/module/components/*.js"],
        ignoreTryCatch: false,
      }),
      apply: "serve",
    },

    react({ jsxRuntime: "classic" }),
  ],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    deps: {
      registerNodeLoader: true,
      inline: [
        "react-native-web",
        "react-native-paper",
        "react-native-vector-icons",
      ],
    },
  },
  resolve: {
    // This will only alias the exact import "react-native"
    mainFields: ["module", "main"],
    alias: {
      "react-native": "react-native-web",
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [
      ".web.js",
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".web.ts",
      ".web.tsx",
      ".web.jsx",
    ],
  },
});
