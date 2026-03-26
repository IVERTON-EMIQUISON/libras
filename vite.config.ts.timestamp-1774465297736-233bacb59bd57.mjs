// vite.config.ts
import react from "file:///D:/projrto-libras/libras-ai/node_modules/@vitejs/plugin-react-swc/index.js";
import { defineConfig } from "file:///D:/projrto-libras/libras-ai/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig(({ mode }) => {
  let build, esbuild, define;
  if (mode === "development") {
    build = {
      minify: false,
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: void 0
        }
      }
    };
    esbuild = {
      jsxDev: true,
      keepNames: true,
      minifyIdentifiers: false
    };
    define = {
      "process.env.NODE_ENV": '"development"',
      "__DEV__": "true"
    };
  }
  return {
    plugins: [react()],
    build,
    esbuild,
    define,
    resolve: {
      alias: {
        "@": "/src"
      }
    },
    optimizeDeps: {
      exclude: ["lucide-react"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qcnRvLWxpYnJhc1xcXFxsaWJyYXMtYWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb2pydG8tbGlicmFzXFxcXGxpYnJhcy1haVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcHJvanJ0by1saWJyYXMvbGlicmFzLWFpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBsZXQgYnVpbGQ6IFVzZXJDb25maWdbJ2J1aWxkJ10sIGVzYnVpbGQ6IFVzZXJDb25maWdbJ2VzYnVpbGQnXSwgZGVmaW5lOiBVc2VyQ29uZmlnWydkZWZpbmUnXVxuXG4gIGlmIChtb2RlID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgYnVpbGQgPSB7XG4gICAgICBtaW5pZnk6IGZhbHNlLFxuICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBtYW51YWxDaHVua3M6IHVuZGVmaW5lZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfVxuXG4gICAgZXNidWlsZCA9IHtcbiAgICAgIGpzeERldjogdHJ1ZSxcbiAgICAgIGtlZXBOYW1lczogdHJ1ZSxcbiAgICAgIG1pbmlmeUlkZW50aWZpZXJzOiBmYWxzZSxcbiAgICB9XG5cbiAgICBkZWZpbmUgPSB7XG4gICAgICAncHJvY2Vzcy5lbnYuTk9ERV9FTlYnOiAnXCJkZXZlbG9wbWVudFwiJyxcbiAgICAgICdfX0RFVl9fJzogJ3RydWUnLFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW3JlYWN0KCldLFxuICAgIGJ1aWxkLFxuICAgIGVzYnVpbGQsXG4gICAgZGVmaW5lLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogJy9zcmMnLFxuICAgICAgfVxuICAgIH0sXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICAgIH0sXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBRzdCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLE1BQUksT0FBNEIsU0FBZ0M7QUFFaEUsTUFBSSxTQUFTLGVBQWU7QUFDMUIsWUFBUTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFVBQ04sY0FBYztBQUFBLFFBQ2hCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxjQUFVO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxtQkFBbUI7QUFBQSxJQUNyQjtBQUVBLGFBQVM7QUFBQSxNQUNQLHdCQUF3QjtBQUFBLE1BQ3hCLFdBQVc7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxJQUNqQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLFNBQVMsQ0FBQyxjQUFjO0FBQUEsSUFDMUI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
