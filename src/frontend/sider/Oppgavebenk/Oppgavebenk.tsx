import { Box, VStack } from '@navikt/ds-react';

import Styles from './Oppgavebenk.module.css';
import { OppgavebenkProvider } from './OppgavebenkContext';
import { OppgaveHeader } from './OppgaveHeader';
import { OppgaveList } from './OppgaveList';

export function Oppgavebenk() {
    return (
        <OppgavebenkProvider>
            <Box as={'div'} className={Styles.container}>
                <VStack gap={'space-16'}>
                    <OppgaveHeader />
                    <OppgaveList />
                </VStack>
            </Box>
        </OppgavebenkProvider>
    );
}
