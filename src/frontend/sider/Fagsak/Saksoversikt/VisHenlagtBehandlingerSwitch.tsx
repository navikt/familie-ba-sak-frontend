import React from 'react';

import { Switch } from '@navikt/ds-react';

import { type Saksoversiktsbehandling, skalVisesNårHenlagtBehandlingerSkjules } from './utils';

type Props = {
    saksoversiktbehandlinger: Saksoversiktsbehandling[];
    visHenlagteBehandlinger: boolean;
    setVisHenlagteBehandlinger: (visHenlagteBehandlinger: boolean) => void;
};

export function VisHenlagtBehandlingerSwitch({
    saksoversiktbehandlinger,
    visHenlagteBehandlinger,
    setVisHenlagteBehandlinger,
}: Props) {
    const finnesHenlagteBehandlingerSomKanFiltreresBort = saksoversiktbehandlinger.some(
        (behandling: Saksoversiktsbehandling) => !skalVisesNårHenlagtBehandlingerSkjules(behandling, false)
    );

    if (!finnesHenlagteBehandlingerSomKanFiltreresBort) {
        return null;
    }

    return (
        <Switch
            size={'small'}
            position={'left'}
            id={'vis-henlagte-behandlinger'}
            checked={visHenlagteBehandlinger}
            onChange={() => setVisHenlagteBehandlinger(!visHenlagteBehandlinger)}
        >
            Vis henlagte behandlinger
        </Switch>
    );
}
