import React from 'react';

import { Box, HStack, Pagination } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { oppgaveSideLimit, useOppgavebenkContext } from './OppgavebenkContext';
import type { IOppgave } from '../../typer/oppgave';

const beregnAntallSider = (oppgaver: IOppgave[]): number =>
    Math.ceil(oppgaver.length / oppgaveSideLimit);

const OppgavelisteNavigator: React.FunctionComponent = () => {
    const { oppgaver, side, settSide } = useOppgavebenkContext();

    if (oppgaver.status !== RessursStatus.SUKSESS) {
        return null;
    }
    const antallSider = beregnAntallSider(oppgaver.data.oppgaver);

    return (
        <HStack align="center" justify="space-between" wrap={false}>
            |
            <Box paddingInline="4">
                Viser {(side - 1) * oppgaveSideLimit + 1} -{' '}
                {side === antallSider ? oppgaver.data.oppgaver.length : side * oppgaveSideLimit} av{' '}
                {oppgaver.data.oppgaver.length} oppgaver (totalt {oppgaver.data.antallTreffTotalt}{' '}
                oppgaver)
            </Box>
            |
            <Box paddingInline="4 0">
                <Pagination size="small" page={side} count={antallSider} onPageChange={settSide} />
            </Box>
        </HStack>
    );
};

export default OppgavelisteNavigator;
