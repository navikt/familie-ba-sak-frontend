import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { erPreprod, erProd } from '@utils/miljø';

type TelemetryCollectorURL =
    | 'https://telemetry.nav.no/collect'
    | 'https://telemetry.ekstern.dev.nav.no/collect'
    | 'http://localhost:12347';

function getTelemetryCollectorURL(): TelemetryCollectorURL {
    if (erProd()) {
        return 'https://telemetry.nav.no/collect';
    }
    if (erPreprod()) {
        return 'https://telemetry.ekstern.dev.nav.no/collect';
    }
    return 'http://localhost:12347';
}

export function initGrafanaFaro() {
    try {
        if (erPreprod() || erProd()) {
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
    } catch (e) {
        console.error('Grafana Faro feilet ved initialisering', e);
    }
}
