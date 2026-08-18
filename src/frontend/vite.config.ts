import reactPlugin from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    try {
        return {
            build: {
                outDir: '../../dist_frontend/',
                sourcemap: true,
                emptyOutDir: true,
            },
            envDir: '../../',
            define: {
                global: 'window',
            },
            server: {
                hmr: {
                    port: 24678,
                },
                port: 8000,
            },
            resolve: {
                tsconfigPaths: true,
            },
            plugins: [reactPlugin()],
        };
    } catch (e) {
        console.error('Vite define config feilet', e);
        throw e;
    }
});
