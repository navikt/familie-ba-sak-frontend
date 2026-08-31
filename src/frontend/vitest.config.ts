import { defineConfig } from 'vitest/config';

export default defineConfig({
    root: import.meta.dirname,
    test: {
        setupFiles: ['./vitest.setup.ts'],
        globals: true,
        environment: 'jsdom',
    },
    resolve: {
        tsconfigPaths: true,
    },
});
