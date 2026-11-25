import { BodyLong, Box, Heading, HStack, Pagination } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';
import type { IOppgave } from '@typer/oppgave';

import { oppgaveSideLimit, useOppgavebenkContext } from './OppgavebenkContext';
import { usePaginationContext } from './PaginationContext';

function beregnAntallSider(oppgaver: IOppgave[]): number {
    return Math.ceil(oppgaver.length / oppgaveSideLimit);
}

export function OppgavelisteNavigator() {
    const { oppgaver } = useOppgavebenkContext();
    const { page, setPage } = usePaginationContext();

    if (oppgaver.status !== RessursStatus.SUKSESS) {
        return (
            <HStack align={'center'} justify={'space-between'} marginBlock={'space-12'}>
                <Heading size={'medium'} level={'1'}>
                    Oppgaveliste
                </Heading>
            </HStack>
        );
    }

    const antallSider = beregnAntallSider(oppgaver.data.oppgaver);

    if (antallSider <= 0) {
        return (
            <HStack align={'center'} justify={'space-between'} marginBlock={'space-12'}>
                <Heading size={'medium'} level={'1'}>
                    Oppgaveliste
                </Heading>
            </HStack>
        );
    }

    return (
        <HStack align={'center'} justify={'space-between'} marginBlock={'space-12'} wrap={false}>
            <Heading size={'medium'} level={'1'}>
                Oppgaveliste
            </Heading>
            <Box marginInline={'space-128 space-0'}>
                <BodyLong>
                    Viser {(page - 1) * oppgaveSideLimit + 1} -{' '}
                    {page === antallSider ? oppgaver.data.oppgaver.length : page * oppgaveSideLimit} av{' '}
                    {oppgaver.data.oppgaver.length} oppgaver (totalt {oppgaver.data.antallTreffTotalt} oppgaver)
                </BodyLong>
            </Box>
            <Pagination
                size={'small'}
                page={page}
                count={antallSider}
                onPageChange={setPage}
                siblingCount={1}
                boundaryCount={1}
            />
        </HStack>
    );
}
