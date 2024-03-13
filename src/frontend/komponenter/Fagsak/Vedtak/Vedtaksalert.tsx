import * as React from 'react';

import { Alert } from '@navikt/ds-react';

import { Behandlingstype, BehandlingÅrsak, type IBehandling } from '../../../typer/behandling';

interface Props {
    åpenBehandling: IBehandling;
}

export const Vedtaksalert: React.FunctionComponent<Props> = ({ åpenBehandling }) => {
    const erSmåbarnstilleggEndringFramITid =
        åpenBehandling.årsak === BehandlingÅrsak.SMÅBARNSTILLEGG_ENDRING_FRAM_I_TID;
    const erSatsendring = åpenBehandling.årsak === BehandlingÅrsak.SATSENDRING;
    const erMigreringFraInfotrygd = åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    if (erMigreringFraInfotrygd) {
        return (
            <Alert variant="info">
                Du er inne på en migreringsbehandling og det sendes ingen vedtaksbrev.
            </Alert>
        );
    } else if (erSmåbarnstilleggEndringFramITid || erSatsendring) {
        return <Alert variant="info">Du er inne på en behandling uten vedtaksbrev.</Alert>;
    } else {
        return (
            <Alert variant="info">
                Du er inne på en teknisk behandling og det finnes ingen vedtaksbrev.
            </Alert>
        );
    }
};
