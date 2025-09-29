import * as React from 'react';

import { Alert } from '@navikt/ds-react';

import { useBehandlingContext } from '../../sider/Fagsak/Behandling/context/BehandlingContext';
import { SettPåVentÅrsak, settPåVentÅrsaker } from '../../typer/behandling';
import { Datoformat, isoStringTilFormatertString } from '../../utils/dato';

export function BehandlingPåVentAlert() {
    const { behandling } = useBehandlingContext();

    if (!behandling.aktivSettPåVent) {
        return null;
    }

    const årsak = settPåVentÅrsaker[behandling.aktivSettPåVent.årsak] ?? SettPåVentÅrsak.AVVENTER_DOKUMENTASJON;

    const dato = isoStringTilFormatertString({
        isoString: behandling.aktivSettPåVent.frist,
        tilFormat: Datoformat.DATO,
    });

    return (
        <Alert variant={'info'}>
            Behandlingen er satt på vent. Årsak: {årsak}. Frist: {dato}. Fortsett behandling via menyen.
        </Alert>
    );
}
