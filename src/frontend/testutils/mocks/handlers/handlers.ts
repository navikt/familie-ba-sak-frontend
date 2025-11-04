import { behandlingHandlers } from './behandlingHandlers';
import { klageHandlers } from './klageHandlers';
import { tilbakekrevingHandlers } from './tilbakekrevingHandlers';

export const handlers = [...behandlingHandlers, ...klageHandlers, ...tilbakekrevingHandlers];
