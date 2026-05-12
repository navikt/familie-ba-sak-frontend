import { Heading, VStack } from '@navikt/ds-react';

import FilterSkjema from './FilterSkjema';

const OppgaveHeader = () => {
    return (
        <VStack gap="space-8">
            <Heading size={'medium'} level={'2'}>
                Oppgavebenken
            </Heading>

            <FilterSkjema />
        </VStack>
    );
};

export default OppgaveHeader;
