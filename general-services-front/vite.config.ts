import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/generalservicesplatform/ws': {
        target: 'http://localhost:8080', // Redirige las conexiones WebSocket a tu servidor backend
        ws: true, // Asegura que las conexiones WebSocket sean proxyadas
        changeOrigin: true, // Cambia el origen de la solicitud para que coincida con el backend
      },
    },
  },
  define: {
    global: {},
  },
});
