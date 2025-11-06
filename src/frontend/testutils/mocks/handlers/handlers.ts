import { behandlingHandlers } from './behandlingHandlers';
import { featureToggleHandlers } from './featureToggleHandlers';
import { klageHandlers } from './klageHandlers';
import { tilbakekrevingHandlers } from './tilbakekrevingHandlers';

export const handlers = [...behandlingHandlers, ...klageHandlers, ...tilbakekrevingHandlers, ...featureToggleHandlers];
