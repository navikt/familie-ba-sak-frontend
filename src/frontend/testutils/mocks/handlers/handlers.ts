import { ainntektHandlers } from './ainntektHandlers';
import { behandlingHandlers } from './behandlingHandlers';
import { dokumentHandlers } from './dokumentHandlers';
import { fagsakHandlers } from './fagsakHandlers';
import { featureToggleHandlers } from './featureToggleHandlers';
import { historikkinnslagHandlers } from './historikkinnslagHandlers';
import { journalpostHandlers } from './journalpostHandlers';
import { klageHandlers } from './klageHandlers';
import { loggHandlers } from './loggHandlers';
import { modiaContextHandlers } from './modiaContextHandlers';
import { oppgaveHandlers } from './oppgaveHandlers';
import { personHandlers } from './personHandlers';
import { saksbehandlerHandlers } from './saksbehandlerHandlers';
import { samhandlerHandlers } from './samhandlerHandlers';
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
    ...saksbehandlerHandlers,
    ...loggHandlers,
    ...oppgaveHandlers,
    ...dokumentHandlers,
    ...modiaContextHandlers,
    ...journalpostHandlers,
    ...historikkinnslagHandlers,
    ...samhandlerHandlers,
];
