import { init } from '@nais/apm';

export function initApm() {
    init({ tracing: true });
}
