import { useBehandling } from '@hooks/useBehandling';
import { SettPåVentÅrsak, settPåVentÅrsaker } from '@typer/behandling';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { InfoCard } from '@navikt/ds-react';

export function BehandlingPåVentAlert() {
    const behandling = useBehandling();

    if (!behandling.aktivSettPåVent) {
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
