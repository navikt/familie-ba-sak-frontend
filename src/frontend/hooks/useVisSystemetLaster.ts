import { MetaKey } from '@hooks/meta/metaKey';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

export function useVisSystemetLaster() {
    const { systemetLaster } = useHttp();

    const isFetching = useIsFetching({
        predicate: query => query.meta?.[MetaKey.VIS_SYSTEMET_LASTER] === true,
    });

    const isMutating = useIsMutating({
        predicate: query => query.meta?.[MetaKey.VIS_SYSTEMET_LASTER] === true,
    });

    return systemetLaster() || isFetching > 0 || isMutating > 0;
}
