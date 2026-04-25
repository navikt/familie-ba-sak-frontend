import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import { RessursResolver } from '../utils/ressursResolver';

interface Parameters {
    behandlingId: number;
    behandlendeEnhet: string;
}

export async function sendVedtakTilBeslutter(request: FamilieRequest, parameters: Parameters) {
    const { behandlingId, behandlendeEnhet } = parameters;
    const ressurs = await request<void, IBehandling>({
        method: 'POST',
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/send-til-beslutter?behandlendeEnhet=${behandlendeEnhet}`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
