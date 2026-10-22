import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import type { Brevmottaker } from '@typer/brevmottaker';
import type { ReactNode } from 'react';

interface Props<T extends Brevmottaker> {
    brevmottakere: T[];
    children: (brevmottaker: T) => ReactNode;
}

export function Brevmottakere<T extends Brevmottaker>({ brevmottakere, children }: Props<T>) {
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
            {brevmottakere.map(children)}
        </VStack>
    );
}
