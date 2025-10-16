import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IInfotrygdsaker } from '../../../typer/infotrygd';
import { RessursResolver } from '../../../utils/ressursResolver';

export async function hentInfotrygdSaker(request: FamilieRequest, ident: string): Promise<IInfotrygdsaker> {
    const ressurs = await request<{ ident: string }, IInfotrygdsaker>({
        method: 'POST',
        url: '/familie-ba-sak/api/infotrygd/hent-infotrygdsaker-for-soker',
        data: { ident },
        påvirkerSystemLaster: true,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
