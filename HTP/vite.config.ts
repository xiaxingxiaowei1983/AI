import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: './',
  envPrefix: 'VITE_', // 保留之前的配置，适配.env的VITE_前缀变量
  server: {
    port: 5174,
    open: true,
    proxy: {
      // 代理后端API请求
      '/api/htp': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
