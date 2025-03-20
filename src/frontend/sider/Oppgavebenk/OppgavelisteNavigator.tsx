import React from 'react';

import styled from 'styled-components';

import { HStack, Pagination } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { oppgaveSideLimit, useOppgaver } from '../../context/OppgaverContext';
import type { IOppgave } from '../../typer/oppgave';

const StyledSpan = styled.span`
    padding: 0 1rem 0 1rem;
`;

const StyledPagination = styled(Pagination)`
    padding-left: 1rem;
`;

const beregnAntallSider = (oppgaver: IOppgave[]): number =>
    Math.ceil(oppgaver.length / oppgaveSideLimit);

const OppgavelisteNavigator: React.FunctionComponent = () => {
    const { oppgaver, side, settSide } = useOppgaver();

    if (oppgaver.status !== RessursStatus.SUKSESS) {
        return null;
    }
    const antallSider = beregnAntallSider(oppgaver.data.oppgaver);

    return (
        <HStack align="center" justify="space-between" wrap={false}>
            |
            <StyledSpan>
                Viser {(side - 1) * oppgaveSideLimit + 1} -{' '}
                {side === antallSider ? oppgaver.data.oppgaver.length : side * oppgaveSideLimit} av{' '}
                {oppgaver.data.oppgaver.length} oppgaver (totalt {oppgaver.data.antallTreffTotalt}{' '}
                oppgaver)
            </StyledSpan>
            |
            <StyledPagination
                size="small"
                page={side}
                count={antallSider}
                onPageChange={settSide}
            />
        </HStack>
    );
};

export default OppgavelisteNavigator;
