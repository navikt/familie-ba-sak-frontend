import { defineConfig } from 'vitest/config';

export default defineConfig({
    root: import.meta.dirname,
    test: {
        globals: true,
        environment: 'node',
        passWithNoTests: true, // Kan fjernes hvis man legger til en test for backend
    },
});
