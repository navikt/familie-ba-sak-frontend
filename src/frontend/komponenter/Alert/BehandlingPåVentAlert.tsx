import { useBehandling } from '@hooks/useBehandling';
import { Konsept, useKonsept } from '@hooks/useKonsept';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { InfoCard } from '@navikt/ds-react';
import { SettPåVentÅrsak, settPåVentÅrsaker } from '@typer/behandling';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';

interface Props {
    /** Konsept 3 viser varselet øverst i behandlingen, ikke på hvert steg */
    plassering?: 'steg' | 'topp';
}

export function BehandlingPåVentAlert({ plassering = 'steg' }: Props) {
    const behandling = useBehandling();
    const konsept = useKonsept();

    const erRiktigPlassering = (konsept === Konsept.KONSEPT_3) === (plassering === 'topp');
    if (!behandling.aktivSettPåVent || !erRiktigPlassering) {
        return null;
    }

    const årsak = settPåVentÅrsaker[behandling.aktivSettPåVent.årsak] ?? SettPåVentÅrsak.AVVENTER_DOKUMENTASJON;

    const dato = isoStringTilFormatertString({
        isoString: behandling.aktivSettPåVent.frist,
        tilFormat: Datoformat.DATO,
    });

    return (
        <InfoCard data-color="info">
            <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
                <InfoCard.Title>Behandlingen er satt på vent.</InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>
                Årsak: {årsak}. Frist: {dato}. Fortsett behandling via menyen.
            </InfoCard.Content>
        </InfoCard>
    );
}
