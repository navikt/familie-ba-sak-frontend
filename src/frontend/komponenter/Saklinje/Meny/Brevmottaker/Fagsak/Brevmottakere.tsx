import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import { BrevmottakerDetaljer } from './BrevmottakerDetaljer';

export function Brevmottakere() {
    const { brevmottakere } = useBrevmottakereFagsakContext();

    return (
        <VStack gap={'space-8'}>
            {brevmottakere.length === 0 && (
                <>
                    <Heading size={'small'} level={'2'}>
                        Brevmottakere:
                    </Heading>
                    <BodyShort>Ingen brevmottakere er registrert.</BodyShort>
                </>
            )}
            {brevmottakere.map(brevmottaker => (
                <BrevmottakerDetaljer key={brevmottaker.uuid} brevmottaker={brevmottaker} />
            ))}
        </VStack>
    );
}
