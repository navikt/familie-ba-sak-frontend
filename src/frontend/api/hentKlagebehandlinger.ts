import type { IKlagebehandling } from '@typer/klage';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export async function hentKlagebehandlinger(request: FamilieRequest, fagsakId: number): Promise<IKlagebehandling[]> {
    const ressurs = await request<void, IKlagebehandling[]>({
        method: 'GET',
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/hent-klagebehandlinger`,
        påvirkerSystemLaster: true,
        timeout: 10000,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
