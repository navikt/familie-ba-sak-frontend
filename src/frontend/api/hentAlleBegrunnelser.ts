import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { AlleBegrunnelser } from '../typer/vilkår';
import { RessursResolver } from '../utils/ressursResolver';

export async function hentAlleBegrunnelser(request: FamilieRequest): Promise<AlleBegrunnelser> {
    const ressurs = await request<void, AlleBegrunnelser>({
        method: 'GET',
        url: `/familie-ba-sak/api/vilkaarsvurdering/vilkaarsbegrunnelser`,
        påvirkerSystemLaster: true,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
