import type { IBehandling, SettPåVentÅrsak } from '@typer/behandling';
import type { IsoDatoString } from '@utils/dato';
import { RessursResolver } from '@utils/ressursResolver';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

export interface SettPåVentPayload {
    frist: IsoDatoString;
    årsak: SettPåVentÅrsak;
}

export async function settPåVent(
    request: FamilieRequest,
    payload: SettPåVentPayload,
    behandlingId: number,
    erBehandlingAlleredePåVent: boolean
) {
    const ressurs = await request<SettPåVentPayload, IBehandling>({
        data: payload,
        method: erBehandlingAlleredePåVent ? 'PUT' : 'POST',
        url: `/familie-ba-sak/api/sett-på-vent/${behandlingId}`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
