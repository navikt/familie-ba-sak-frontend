import { useBehandling } from '@hooks/useBehandling';
import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { BrevmottakerDetaljer } from './BrevmottakerDetaljer';

export function Brevmottakere() {
    const { brevmottakere } = useBehandling();

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
                <BrevmottakerDetaljer key={brevmottaker.id} brevmottaker={brevmottaker} />
            ))}
        </VStack>
    );
}
