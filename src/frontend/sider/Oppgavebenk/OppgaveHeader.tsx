import React from 'react';

import { Heading, VStack } from '@navikt/ds-react';

import FilterSkjema from './FilterSkjema';

const OppgaveHeader: React.FunctionComponent = () => {
    return (
        <VStack gap="2">
            <Heading size={'medium'} level={'2'}>
                Oppgavebenken
            </Heading>

            <FilterSkjema />
        </VStack>
    );
};

export default OppgaveHeader;
