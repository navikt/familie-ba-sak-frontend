import { useBehandling } from '@hooks/useBehandling';
import { useHentSimulering } from '@hooks/useHentSimulering';
import {
    type Simuleringsvurdering,
    utledSimuleringsvurdering,
} from '@sider/Fagsak/Behandling/Sider/Simulering/simuleringsvurdering';
import { useMemo } from 'react';

/**
 * Simuleringsvurderingen for behandlingen, eller undefined så lenge simuleringen ikke er hentet.
 * Bruk useSimuleringContext i stedet når simuleringen allerede er lastet av SimuleringContainer.
 */
export function useSimuleringsvurdering(): Simuleringsvurdering | undefined {
    const behandling = useBehandling();

    const { data: simulering } = useHentSimulering(behandling.behandlingId);

    return useMemo(
        () => (simulering === undefined ? undefined : utledSimuleringsvurdering(simulering, behandling)),
        [simulering, behandling]
    );
}
