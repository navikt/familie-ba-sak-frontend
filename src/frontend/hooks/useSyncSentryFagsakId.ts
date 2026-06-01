import { useEffect } from 'react';

import * as Sentry from '@sentry/browser';
import { erDefinert } from '@utils/commons';

const FAGSAK_ID_TAG_KEY = 'fagsakId';

export function useSyncSentryFagsakId(fagsakId?: number) {
    useEffect(() => {
        if (!erDefinert(fagsakId)) {
            Sentry.setTag(FAGSAK_ID_TAG_KEY, undefined);
            return;
        }

        Sentry.setTag(FAGSAK_ID_TAG_KEY, String(fagsakId));

        return () => {
            Sentry.setTag(FAGSAK_ID_TAG_KEY, undefined);
        };
    }, [fagsakId]);
}
