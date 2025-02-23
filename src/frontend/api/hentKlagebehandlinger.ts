import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IKlagebehandling } from '../typer/klage';
import { RessursResolver } from '../utils/ressursResolver';

export async function hentKlagebehandlinger(request: FamilieRequest, fagsakId: number) {
    const ressurs = await request<void, IKlagebehandling[]>({
        method: 'GET',
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/hent-klagebehandlinger`,
        påvirkerSystemLaster: true,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
