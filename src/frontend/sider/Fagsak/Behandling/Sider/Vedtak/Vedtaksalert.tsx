import * as React from 'react';

import { Alert } from '@navikt/ds-react';

import {
    Behandlingstype,
    BehandlingÅrsak,
    type IBehandling,
} from '../../../../../typer/behandling';

interface Props {
    åpenBehandling: IBehandling;
}

export const Vedtaksalert: React.FunctionComponent<Props> = ({ åpenBehandling }) => {
    if (åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD) {
        return (
            <Alert variant="info">
                Du er inne på en migreringsbehandling og det sendes ingen vedtaksbrev.
            </Alert>
        );
    }

    switch (åpenBehandling.årsak) {
        case BehandlingÅrsak.SATSENDRING:
        case BehandlingÅrsak.SMÅBARNSTILLEGG_ENDRING_FRAM_I_TID:
        case BehandlingÅrsak.MÅNEDLIG_VALUTAJUSTERING:
            return <Alert variant="info">Du er inne på en behandling uten vedtaksbrev.</Alert>;
        case BehandlingÅrsak.IVERKSETTE_KA_VEDTAK:
            return (
                <Alert variant="info">
                    Du er i en iverksette KA-vedtak behandling. Det skal ikke sendes vedtaksbrev.
                    Bruk "Send brev" hvis du skal informere bruker om:
                    <ul>
                        <li>Utbetaling</li>
                        <li>EØS-kompetanse</li>
                    </ul>
                </Alert>
            );
        default:
            return (
                <Alert variant="info">
                    Du er inne på en teknisk behandling og det finnes ingen vedtaksbrev.
                </Alert>
            );
    }
};
