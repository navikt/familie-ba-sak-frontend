import * as Sentry from '@sentry/browser';

const environment = window.location.hostname;

export function initSentry() {
    try {
        Sentry.init({
            dsn: 'https://10239ce4baed4db79d080d85f08b5878@sentry.gc.nav.no/26',
            environment,
            integrations: [Sentry.browserTracingIntegration()],
            tracesSampleRate: 0.2,
        });
    } catch (e) {
        console.error('Sentry feilet ved initialisering', e);
    }
}
