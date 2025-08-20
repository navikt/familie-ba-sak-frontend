import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { HenleggÅrsak } from '../typer/behandling';
import { type IBehandling } from '../typer/behandling';
import { RessursResolver } from '../utils/ressursResolver';

export interface HenleggBehandlingPayload {
    årsak: HenleggÅrsak;
    begrunnelse: string;
}

export async function henleggBehandling(
    request: FamilieRequest,
    behandling: IBehandling,
    payload: HenleggBehandlingPayload
) {
    const ressurs = await request<HenleggBehandlingPayload, IBehandling>({
        data: payload,
        method: 'PUT',
        url: `/familie-ba-sak/api/behandlinger/${behandling.behandlingId}/steg/henlegg`,
        påvirkerSystemLaster: false,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
