import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { VisningBehandling } from '../sider/Fagsak/Saksoversikt/visningBehandling';
import { RessursResolver } from '../utils/ressursResolver';

export async function hentBarnetrygdbehandlinger(
    request: FamilieRequest,
    fagsakId: number
): Promise<VisningBehandling[]> {
    const ressurs = await request<void, VisningBehandling[]>({
        method: 'GET',
        url: `/familie-ba-sak/api/behandlinger/fagsak/${fagsakId}`,
        påvirkerSystemLaster: true,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
