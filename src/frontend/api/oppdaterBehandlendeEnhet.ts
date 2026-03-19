import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import type { IRestEndreBehandlendeEnhet } from '../typer/enhet';
import { RessursResolver } from '../utils/ressursResolver';

export interface OppdaterBehandlendeEnhetPayload {
    enhetId: string;
    begrunnelse: string;
}

export async function oppdaterBehandlendeEnhet(
    request: FamilieRequest,
    behandlingId: number,
    payload: OppdaterBehandlendeEnhetPayload
) {
    const ressurs = await request<IRestEndreBehandlendeEnhet, IBehandling>({
        method: 'PUT',
        data: {
            ...payload,
        },
        url: `/familie-ba-sak/api/arbeidsfordeling/${behandlingId}`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
