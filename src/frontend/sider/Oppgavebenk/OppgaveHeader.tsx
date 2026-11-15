import { Heading, VStack } from '@navikt/ds-react';

import { OppgavefilterForm } from './form/OppgavefilterForm';

export function OppgaveHeader() {
    return (
        <VStack align={'start'} justify={'space-between'} gap={'space-8'}>
            <Heading size={'medium'} level={'2'}>
                Oppgavebenken
            </Heading>
            <OppgavefilterForm />
        </VStack>
    );
}
