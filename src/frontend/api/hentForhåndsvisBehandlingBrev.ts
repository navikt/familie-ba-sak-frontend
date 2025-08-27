import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IManueltBrevRequestPåBehandling } from '../typer/dokument';
import { RessursResolver } from '../utils/ressursResolver';

export async function hentForhåndsvisBehandlingBrev(
    request: FamilieRequest,
    behandlingId: number,
    payload: IManueltBrevRequestPåBehandling
) {
    const ressurs = await request<IManueltBrevRequestPåBehandling, string>({
        method: 'POST',
        data: payload,
        url: `/familie-ba-sak/api/dokument/forhaandsvis-brev/${behandlingId}`,
        påvirkerSystemLaster: false,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
