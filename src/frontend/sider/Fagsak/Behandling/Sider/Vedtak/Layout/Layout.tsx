import { ErrorMessage, HStack, VStack } from '@navikt/ds-react';
import { Steg } from '@sider/Fagsak/Behandling/Sider/Steg';
import { useVisTilGodkjenning } from '@sider/Fagsak/Behandling/Sider/Vedtak/Layout/useVisTilGodkjenning';
import { SendtTilTotrinnskontrollModal } from '@sider/Fagsak/Behandling/Sider/Vedtak/Totrinnskontroll/SendtTilTotrinnskontrollModal';
import { type PropsWithChildren, useState } from 'react';
import { TilForrigeSteg } from './TilForrigeSteg';
import { TilGodkjenning } from './TilGodkjenning';

export function Layout({ children }: PropsWithChildren) {
    const [feilmelding, settFeilmelding] = useState<string | undefined>(undefined);

    const visTilGodkjenning = useVisTilGodkjenning();

    return (
        <Steg tittel={'Vedtak'} maxWidth={'60rem'}>
            <SendtTilTotrinnskontrollModal />
            <VStack gap={'space-40'}>
                {children}
                {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}
                <HStack gap={'space-20'}>
                    <TilForrigeSteg />
                    {visTilGodkjenning && <TilGodkjenning settFeilmelding={settFeilmelding} />}
                </HStack>
            </VStack>
        </Steg>
    );
}
