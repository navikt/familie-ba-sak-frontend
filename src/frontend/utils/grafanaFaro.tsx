import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';

type TelemetryCollectorURL =
    | 'https://telemetry.nav.no/collect'
    | 'https://telemetry.ekstern.dev.nav.no/collect'
    | 'http://localhost:12347';

const getTelemetryCollectorURL = (): TelemetryCollectorURL => {
    if (process.env.NODE_ENV === 'production') {
        return 'https://telemetry.nav.no/collect';
    }

    if (process.env.NODE_ENV === 'development') {
        return 'https://telemetry.ekstern.dev.nav.no/collect';
    }

    return 'http://localhost:12347';
};

export function initGrafanaFaro() {
    process.env.NODE_ENV !== 'local' &&
        initializeFaro({
            isolate: true,
            url: getTelemetryCollectorURL(),
            app: {
                name: 'familie-ba-sak-frontend',
            },
            instrumentations: [
                ...getWebInstrumentations({
                    captureConsole: false,
                }),
            ],
        });
}
