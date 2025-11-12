import React from 'react';

import { Switch } from '@navikt/ds-react';

import { type Saksoversiktsbehandling, skalVisesNårHenlagtBehandlingerSkjules } from './utils';

type Props = {
    saksoversiktbehandlinger: Saksoversiktsbehandling[];
    visHenlagteBehandlinger: boolean;
    toggleVisHenlagteBehandlinger: () => void;
};

export function VisHenlagtBehandlingerSwitch({
    saksoversiktbehandlinger,
    visHenlagteBehandlinger,
    toggleVisHenlagteBehandlinger,
}: Props) {
    const finnesHenlagteBehandlingerSomKanFiltreresBort = saksoversiktbehandlinger.some(
        behandling => !skalVisesNårHenlagtBehandlingerSkjules(behandling, false)
    );

    if (!finnesHenlagteBehandlingerSomKanFiltreresBort) {
        return null;
    }

    return (
        <Switch
            size={'small'}
            position={'left'}
            checked={visHenlagteBehandlinger}
            onChange={toggleVisHenlagteBehandlinger}
        >
            Vis henlagte behandlinger
        </Switch>
    );
}
