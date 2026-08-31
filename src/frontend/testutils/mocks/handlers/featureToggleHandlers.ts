import { byggSuksessRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

import { FeatureToggle, type FeatureToggles } from '../../../typer/featureToggles';

export function skruPåAlleToggles(): FeatureToggles {
    const toggles = Object.values(FeatureToggle);
    return toggles.reduce((toggles: FeatureToggles, toggle: FeatureToggle) => {
        toggles[toggle] = true;
        return toggles;
    }, {});
}

export const featureToggleHandlers = [
    http.post('/familie-ba-sak/api/feature/er-toggler-enabled', () => {
        return HttpResponse.json(byggSuksessRessurs(skruPåAlleToggles()));
    }),
];
