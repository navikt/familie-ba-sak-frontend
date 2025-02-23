import React from 'react';

import { Switch } from '@navikt/ds-react';

import {
    type Saksoversiktsbehandling,
    skalVisesNårMånedligeValutajusteringerSkjules,
} from './utils';

type Props = {
    saksoversiktbehandlinger: Saksoversiktsbehandling[];
    visMånedligeValutajusteringer: boolean;
    setVisMånedligeValutajusteringer: (visMånedligeValutajusteringer: boolean) => void;
};

export function VisMåndligValutajuseringBehandlingerSwitch({
    saksoversiktbehandlinger,
    visMånedligeValutajusteringer,
    setVisMånedligeValutajusteringer,
}: Props) {
    const finnesMånedligValutajusteringerSomKanFiltreresBort = saksoversiktbehandlinger.some(
        (behandling: Saksoversiktsbehandling) =>
            !skalVisesNårMånedligeValutajusteringerSkjules(behandling, false)
    );

    if (!finnesMånedligValutajusteringerSomKanFiltreresBort) {
        return null;
    }

    return (
        <Switch
            size="small"
            position="left"
            id={'vis-månedlig-valutajustering-behandlinger'}
            checked={visMånedligeValutajusteringer}
            onChange={() => setVisMånedligeValutajusteringer(!visMånedligeValutajusteringer)}
        >
            Vis månedlige valutajusteringer
        </Switch>
    );
}
