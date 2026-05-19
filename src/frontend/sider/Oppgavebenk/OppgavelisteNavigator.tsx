import type { IOppgave } from '@typer/oppgave';

import { BodyLong, Box, Heading, HStack, Pagination } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { oppgaveSideLimit, useOppgavebenkContext } from './OppgavebenkContext';

function beregnAntallSider(oppgaver: IOppgave[]): number {
    return Math.ceil(oppgaver.length / oppgaveSideLimit);
}

export function OppgavelisteNavigator() {
    const { oppgaver, side, settSide } = useOppgavebenkContext();

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
                    Viser {(side - 1) * oppgaveSideLimit + 1} -{' '}
                    {side === antallSider ? oppgaver.data.oppgaver.length : side * oppgaveSideLimit} av{' '}
                    {oppgaver.data.oppgaver.length} oppgaver (totalt {oppgaver.data.antallTreffTotalt} oppgaver)
                </BodyLong>
            </Box>
            <Pagination
                size={'small'}
                page={side}
                count={antallSider}
                onPageChange={settSide}
                siblingCount={1}
                boundaryCount={1}
            />
        </HStack>
    );
}
