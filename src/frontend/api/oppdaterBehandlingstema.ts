import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import type { BehandlingKategori, BehandlingUnderkategori } from '../typer/behandlingstema';
import { RessursResolver } from '../utils/ressursResolver';

export interface OppdaterBehandlingstemaPayload {
    behandlingKategori: BehandlingKategori;
    behandlingUnderkategori: BehandlingUnderkategori;
}

export const oppdaterBehandlingstema = async (
    request: FamilieRequest,
    behandlingKategori: BehandlingKategori,
    behandlingUnderkategori: BehandlingUnderkategori,
    behandlingId: number
) => {
    const ressurs = await request<OppdaterBehandlingstemaPayload, IBehandling>({
        data: {
            behandlingKategori: behandlingKategori,
            behandlingUnderkategori: behandlingUnderkategori,
        },
        method: 'PUT',
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/behandlingstema`,
    });
    return RessursResolver.resolveToPromise(ressurs);
};
