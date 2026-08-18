import { apiClient } from '@api/client/apiClient';
import { captureException, init } from '@nais/apm';

export function initApm() {
    init({ tracing: true });

    apiClient.addResponseInterceptor({
        onRejected: error => {
            captureException(error, {
                context: {
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
}
