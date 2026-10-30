import { Box, VStack } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import Styles from './Oppgavebenk.module.css';
import { OppgavebenkProvider, oppgaveSideLimit, useOppgavebenkContext } from './OppgavebenkContext';
import { OppgaveHeader } from './OppgaveHeader';
import { OppgaveList } from './OppgaveList';
import { PaginationProvider } from './PaginationContext';

export function Oppgavebenk() {
    return (
        <OppgavebenkProvider>
            <OppgavebenkInnhold />
        </OppgavebenkProvider>
    );
}

function OppgavebenkInnhold() {
    const { oppgaver } = useOppgavebenkContext();

    const totalPages =
        oppgaver.status === RessursStatus.SUKSESS
            ? Math.ceil(oppgaver.data.oppgaver.length / oppgaveSideLimit)
            : undefined;

    return (
        <PaginationProvider totalPages={totalPages}>
            <Box as={'div'} className={Styles.container}>
                <VStack gap={'space-16'}>
                    <OppgaveHeader />
                    <OppgaveList />
                </VStack>
            </Box>
        </PaginationProvider>
    );
}
