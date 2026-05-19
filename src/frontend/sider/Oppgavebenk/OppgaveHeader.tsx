import { Heading, VStack } from '@navikt/ds-react';

import { FilterSkjema } from './FilterSkjema';

export function OppgaveHeader() {
    return (
        <VStack align={'start'} justify={'space-between'} gap={'space-8'}>
            <Heading size={'medium'} level={'2'}>
                Oppgavebenken
            </Heading>
            <FilterSkjema />
        </VStack>
    );
}
