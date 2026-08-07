import { useBehandling } from '@hooks/useBehandling';
import { BehandlingResultat, BehandlingStatus, BehandlingÅrsak, type IBehandling } from '@typer/behandling';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, InfoCard } from '@navikt/ds-react';

function finnAdvarseltekts(behandling: IBehandling): string | undefined {
    if (behandling.resultat === BehandlingResultat.FORTSATT_INNVILGET && behandling.skalBehandlesAutomatisk) {
        return 'Automatisk behandling med resultat "Fortsatt innvilget" sender ikke vedtaksbrev.';
    }
    if (behandling.status === BehandlingStatus.AVSLUTTET) {
        return 'Behandlingen er avsluttet. Du kan se vedtaksbrevet ved å trykke på "Vis vedtaksbrev".';
    }
    if (behandling.årsak === BehandlingÅrsak.DØDSFALL_BRUKER) {
        return 'Vedtak om opphør på grunn av dødsfall er automatisk generert.';
    }
    return undefined;
}

export function IngenVedtaksbrevbyggerAdvarsel() {
    const behandling = useBehandling();

    const advarseltekts = finnAdvarseltekts(behandling);

    if (!advarseltekts) {
        return;
    }

    return (
        <Box marginBlock={'space-32 space-16'}>
            <InfoCard data-color={'info'}>
                <InfoCard.Message icon={<InformationSquareIcon aria-hidden={true} />}>{advarseltekts}</InfoCard.Message>
            </InfoCard>
        </Box>
    );
}
