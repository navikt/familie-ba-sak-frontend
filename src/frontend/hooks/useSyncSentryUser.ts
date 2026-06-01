import { useEffect } from 'react';

import * as Sentry from '@sentry/browser';
import type { Saksbehandler } from '@typer/saksbehandler';

interface Props {
    saksbehandler?: Saksbehandler;
}

export function useSyncSentryUser({ saksbehandler }: Props) {
    useEffect(() => {
        if (!Sentry.isEnabled()) {
            return;
        }

        if (!saksbehandler) {
            Sentry.setUser(null);
            return;
        }

        Sentry.setUser({
            username: saksbehandler.displayName,
            email: saksbehandler.email,
        });

        return () => {
            Sentry.setUser(null);
        };
    }, [saksbehandler]);
}
