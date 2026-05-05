import type { IBehandling } from '@typer/behandling';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export interface LeggTilBarnPåBehandlingPayload {
    barnIdent: string;
}

export const leggTilBarnPåBehandling = async (request: FamilieRequest, barnIdent: string, behandlingId: number) => {
    const ressurs = await request<LeggTilBarnPåBehandlingPayload, IBehandling>({
        data: { barnIdent: barnIdent },
        method: 'POST',
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/legg-til-barn`,
    });
    return RessursResolver.resolveToPromise(ressurs);
};
