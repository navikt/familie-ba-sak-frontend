import { useBehandling } from '@hooks/useBehandling';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, InfoCard } from '@navikt/ds-react';
import { Behandlingstype, BehandlingÅrsak } from '@typer/behandling';

export function BehandlingUtenVedtaksbrevAdvarsel() {
    const behandling = useBehandling();

    if (behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD) {
        return (
            <Box marginBlock={'space-16 space-0'}>
                <InfoCard data-color={'info'}>
                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden={true} />}>
                        Du er inne på en migreringsbehandling og det sendes ingen vedtaksbrev.
                    </InfoCard.Message>
                </InfoCard>
            </Box>
        );
    }

    switch (behandling.årsak) {
        case BehandlingÅrsak.SATSENDRING:
        case BehandlingÅrsak.SMÅBARNSTILLEGG_ENDRING_FRAM_I_TID:
        case BehandlingÅrsak.MÅNEDLIG_VALUTAJUSTERING:
            return (
                <Box marginBlock={'space-16 space-0'}>
                    <InfoCard data-color={'info'}>
                        <InfoCard.Message icon={<InformationSquareIcon aria-hidden={true} />}>
                            Du er inne på en behandling uten vedtaksbrev.
                        </InfoCard.Message>
                    </InfoCard>
                </Box>
            );
        case BehandlingÅrsak.IVERKSETTE_KA_VEDTAK:
            return (
                <Box marginBlock={'space-16 space-0'}>
                    <InfoCard data-color={'info'}>
                        <InfoCard.Header icon={<InformationSquareIcon aria-hidden={true} />}>
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
                </Box>
            );
        default:
            return (
                <Box marginBlock={'space-16 space-0'}>
                    <InfoCard data-color={'info'}>
                        <InfoCard.Message icon={<InformationSquareIcon aria-hidden={true} />}>
                            Du er inne på en teknisk behandling og det finnes ingen vedtaksbrev.
                        </InfoCard.Message>
                    </InfoCard>
                </Box>
            );
    }
}
