import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { type Toggles, Toggle } from '../typer/toggles';
import { RessursResolver } from '../utils/ressursResolver';

export async function hentToggles(request: FamilieRequest, påvirkerSystemLaster: boolean = true) {
    const ressurs = await request<string[], Toggles>({
        method: 'POST',
        url: '/familie-ba-sak/api/feature/er-toggler-enabled',
        data: Object.values(Toggle),
        påvirkerSystemLaster,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
