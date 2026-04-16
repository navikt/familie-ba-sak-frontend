import { InformationSquareIcon } from '@navikt/aksel-icons';
import { InfoCard } from '@navikt/ds-react';

import { Behandlingstype, BehandlingÅrsak, type IBehandling } from '../../../../../typer/behandling';

interface Props {
    åpenBehandling: IBehandling;
}

export const Vedtaksalert = ({ åpenBehandling }: Props) => {
    if (åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD) {
        return (
            <InfoCard data-color="info">
                <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                    Du er inne på en migreringsbehandling og det sendes ingen vedtaksbrev.
                </InfoCard.Message>
            </InfoCard>
        );
    }

    switch (åpenBehandling.årsak) {
        case BehandlingÅrsak.SATSENDRING:
        case BehandlingÅrsak.SMÅBARNSTILLEGG_ENDRING_FRAM_I_TID:
        case BehandlingÅrsak.MÅNEDLIG_VALUTAJUSTERING:
            return (
                <InfoCard data-color="info">
                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                        Du er inne på en behandling uten vedtaksbrev.
                    </InfoCard.Message>
                </InfoCard>
            );
        case BehandlingÅrsak.IVERKSETTE_KA_VEDTAK:
            return (
                <InfoCard data-color="info">
                    <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
                        <InfoCard.Title>Du er i en iverksette KA-vedtak behandling.</InfoCard.Title>
                    </InfoCard.Header>
                    <InfoCard.Content>
                        Det skal ikke sendes vedtaksbrev. Bruk "Send brev" hvis du skal informere bruker om:
                        <ul>
                            <li>Utbetaling</li>
                            <li>EØS-kompetanse</li>
                        </ul>
                    </InfoCard.Content>
                </InfoCard>
            );
        default:
            return (
                <InfoCard data-color="info">
                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                        Du er inne på en teknisk behandling og det finnes ingen vedtaksbrev.
                    </InfoCard.Message>
                </InfoCard>
            );
    }
};
