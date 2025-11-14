import { ainntektHandlers } from './ainntektHandlers';
import { behandlingHandlers } from './behandlingHandlers';
import { fagsakHandlers } from './fagsakHandlers';
import { featureToggleHandlers } from './featureToggleHandlers';
import { klageHandlers } from './klageHandlers';
import { personHandlers } from './personHandlers';
import { tilbakekrevingHandlers } from './tilbakekrevingHandlers';
import { versionHandlers } from './versionHandlers';

export const handlers = [
    ...behandlingHandlers,
    ...klageHandlers,
    ...tilbakekrevingHandlers,
    ...featureToggleHandlers,
    ...versionHandlers,
    ...personHandlers,
    ...fagsakHandlers,
    ...ainntektHandlers,
];
