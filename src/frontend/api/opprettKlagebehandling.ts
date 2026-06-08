import type { IBehandling } from '@typer/behandling';
import type { IsoDatoString } from '@utils/dato';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export interface OpprettKlagebehandlingPayload {
    klageMottattDato: IsoDatoString;
}

export async function opprettKlagebehandling(
    request: FamilieRequest,
    payload: OpprettKlagebehandlingPayload,
    fagsakId: number
) {
    const ressurs = await request<OpprettKlagebehandlingPayload, IBehandling>({
        data: payload,
        method: 'POST',
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/opprett-klagebehandling`,
        påvirkerSystemLaster: true,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
