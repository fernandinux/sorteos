import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: "./", // Configuración para usar rutas relativas en lugar de absolutas
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
