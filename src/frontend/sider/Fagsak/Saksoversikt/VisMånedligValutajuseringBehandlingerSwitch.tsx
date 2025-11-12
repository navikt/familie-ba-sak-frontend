import React from 'react';

import { Switch } from '@navikt/ds-react';

import { type Saksoversiktsbehandling, skalVisesNårMånedligeValutajusteringerSkjules } from './utils';

type Props = {
    saksoversiktbehandlinger: Saksoversiktsbehandling[];
    visMånedligeValutajusteringer: boolean;
    toggleVisMånedligeValutajusteringer: () => void;
};

export function VisMånedligValutajuseringBehandlingerSwitch({
    saksoversiktbehandlinger,
    visMånedligeValutajusteringer,
    toggleVisMånedligeValutajusteringer,
}: Props) {
    const finnesMånedligValutajusteringerSomKanFiltreresBort = saksoversiktbehandlinger.some(
        behandling => !skalVisesNårMånedligeValutajusteringerSkjules(behandling, false)
    );

    if (!finnesMånedligValutajusteringerSomKanFiltreresBort) {
        return null;
    }

    return (
        <Switch
            size={'small'}
            position={'left'}
            checked={visMånedligeValutajusteringer}
            onChange={toggleVisMånedligeValutajusteringer}
        >
            Vis månedlige valutajusteringer
        </Switch>
    );
}
