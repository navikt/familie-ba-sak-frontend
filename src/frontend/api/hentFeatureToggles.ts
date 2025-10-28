import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { type FeatureToggles, FeatureToggle } from '../typer/featureToggles';
import { RessursResolver } from '../utils/ressursResolver';

export async function hentFeatureToggles(request: FamilieRequest, påvirkerSystemLaster: boolean = true) {
    const ressurs = await request<string[], FeatureToggles>({
        method: 'POST',
        url: '/familie-ba-sak/api/feature/er-toggler-enabled',
        data: Object.values(FeatureToggle),
        påvirkerSystemLaster,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
