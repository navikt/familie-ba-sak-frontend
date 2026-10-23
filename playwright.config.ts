import { defineConfig, devices } from '@playwright/test';

const port = 8100;
const baseURL = `http://localhost:${port}`;
const byggMappe = '../../playwright/.bygg';
const erCI = !!process.env.CI;

export default defineConfig({
    testDir: './playwright/tester',
    outputDir: './playwright/resultater',
    fullyParallel: true,
    forbidOnly: erCI,
    retries: erCI ? 2 : 0,
    workers: erCI ? 1 : undefined,
    reporter: [[erCI ? 'github' : 'list'], ['html', { outputFolder: './playwright/rapport', open: 'never' }]],
    use: {
        baseURL,
        locale: 'nb-NO',
        timezoneId: 'Europe/Oslo',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: [
            `pnpm exec vite build src/frontend --mode playwright --outDir ${byggMappe} --emptyOutDir --logLevel error`,
            `pnpm exec vite preview src/frontend --mode playwright --outDir ${byggMappe} --port ${port} --strictPort`,
        ].join(' && '),
        url: baseURL,
        reuseExistingServer: !erCI,
        timeout: 120_000,
    },
});
