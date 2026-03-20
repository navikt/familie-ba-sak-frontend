import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import { RessursResolver } from '../utils/ressursResolver';

export interface OppdaterEndringstidspunktPayload {
    overstyrtEndringstidspunkt: string;
    behandlingId: number;
}

export async function oppdaterEndringstidspunkt(
    request: FamilieRequest,
    endringstidspunkt: string,
    behandlingId: number
) {
    const ressurs = await request<OppdaterEndringstidspunktPayload, IBehandling>({
        method: 'PUT',
        data: {
            overstyrtEndringstidspunkt: endringstidspunkt,
            behandlingId: behandlingId,
        },
        url: `/familie-ba-sak/api/vedtaksperioder/endringstidspunkt`,
        påvirkerSystemLaster: false,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
