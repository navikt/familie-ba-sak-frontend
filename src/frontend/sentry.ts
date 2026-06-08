import { apiClient } from '@api/client/apiClient';
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

        apiClient.addResponseInterceptor({
            onRejected: error => {
                Sentry.captureException(error, {
                    extra: {
                        response: {
                            callId: error.response?.headers['nav-call-id'],
                            status: error.response?.status,
                            statusText: error.response?.statusText,
                        },
                    },
                });
                return Promise.reject(error);
            },
        });
    } catch (e) {
        console.error('Sentry feilet ved initialisering', e);
    }
}

export function showSentryReportDialog(eventId?: string) {
    const user = Sentry.getCurrentScope().getUser();
    Sentry.showReportDialog({
        eventId: eventId,
        title: 'En feil har oppstått i vedtaksløsningen',
        subtitle: '',
        subtitle2: 'Teamet har fått beskjed. Dersom du ønsker å hjelpe oss, si litt om hva som skjedde.',
        user: {
            name: user?.username ?? 'Ukjent navn',
            email: user?.email ?? 'Ukjent e-post',
        },
        labelName: 'NAVN',
        labelComments: 'HVA SKJEDDE?',
        labelClose: 'Lukk',
        labelSubmit: 'Send inn rapport',
        successMessage: 'Rapport er innsendt',
    });
}
