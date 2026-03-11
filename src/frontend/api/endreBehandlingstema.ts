import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import type { IRestEndreBehandlingUnderkategori } from '../typer/behandlingstema';
import { RessursResolver } from '../utils/ressursResolver';

export const endreBehandlingstema = async (
    request: FamilieRequest,
    payload: IRestEndreBehandlingUnderkategori,
    behandlingId: number
) => {
    const ressurs = await request<IRestEndreBehandlingUnderkategori, IBehandling>({
        data: payload,
        method: 'PUT',
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/behandlingstema`,
    });
    return RessursResolver.resolveToPromise(ressurs);
};
