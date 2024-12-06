import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';

import { erDev, erProd } from './miljø';

type TelemetryCollectorURL =
    | 'https://telemetry.nav.no/collect'
    | 'https://telemetry.ekstern.dev.nav.no/collect'
    | 'http://localhost:12347';

const getTelemetryCollectorURL = (): TelemetryCollectorURL => {
    if (erProd()) {
        return 'https://telemetry.nav.no/collect';
    }

    if (erDev()) {
        return 'https://telemetry.ekstern.dev.nav.no/collect';
    }

    return 'http://localhost:12347';
};

export function initGrafanaFaro() {
    if (erDev() || erProd()) {
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
}
