import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { ErrorMessage, HStack, VStack } from '@navikt/ds-react';
import { Steg } from '@sider/Fagsak/Behandling/Sider/Steg';
import { BehandlingStatus } from '@typer/behandling';
import { erBehandlingMedVedtaksbrevutsending } from '@utils/behandling';
import { useState } from 'react';
import { TilForrigeSteg } from './TilForrigeSteg';
import { TilGodkjenning } from './TilGodkjenning';
import { SendtTilTotrinnskontrollModal } from './Totrinnskontroll/SendtTilTotrinnskontrollModal';
import { Vedtaksalert } from './Vedtaksalert';
import { VedtaksbrevBygger } from './VedtaksbrevBygger';

export function Vedtak() {
    const erLesevisning = useErLesevisning();
    const behandling = useBehandling();

    const [feilmelding, settFeilmelding] = useState<string | undefined>(undefined);

    const visTilGodkjenningKnapp = !erLesevisning && behandling.status === BehandlingStatus.UTREDES;
    const erVedtaksbrevutsending = erBehandlingMedVedtaksbrevutsending(behandling);

    return (
        <Steg tittel={'Vedtak'} maxWidth={'60rem'}>
            <SendtTilTotrinnskontrollModal />
            <VStack gap={'space-40'}>
                {erVedtaksbrevutsending ? <VedtaksbrevBygger /> : <Vedtaksalert åpenBehandling={behandling} />}
                {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}
                <HStack gap={'space-20'}>
                    <TilForrigeSteg />
                    {visTilGodkjenningKnapp && <TilGodkjenning settFeilmelding={settFeilmelding} />}
                </HStack>
            </VStack>
        </Steg>
    );
}
