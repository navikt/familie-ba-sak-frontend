import { useEffect } from 'react';

import * as Sentry from '@sentry/browser';
import { erDefinert } from '@utils/commons';

const BEHANDLING_ID_TAG_KEY = 'behandlingId';

export function useSyncSentryBehandlingId(behandlingId?: number) {
    useEffect(() => {
        if (!erDefinert(behandlingId)) {
            Sentry.setTag(BEHANDLING_ID_TAG_KEY, undefined);
            return;
        }

        Sentry.setTag(BEHANDLING_ID_TAG_KEY, String(behandlingId));

        return () => {
            Sentry.setTag(BEHANDLING_ID_TAG_KEY, undefined);
        };
    }, [behandlingId]);
}
