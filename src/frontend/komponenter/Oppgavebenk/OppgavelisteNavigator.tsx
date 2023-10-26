import React from 'react';

import styled from 'styled-components';

import { Pagination } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { oppgaveSideLimit, useOppgaver } from '../../context/OppgaverContext';
import type { IOppgave } from '../../typer/oppgave';

const StyledDiv = styled.div`
    color: var(--a-gray-800);
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StyledSpan = styled.span`
    padding: 0 1rem 0 1rem;
`;

const StyledPagination = styled(Pagination)`
    padding-left: 1rem;
`;

const antallSider = (oppgaver: IOppgave[]): number => Math.ceil(oppgaver.length / oppgaveSideLimit);

const OppgavelisteNavigator: React.FunctionComponent = () => {
    const { oppgaver, tableInstance } = useOppgaver();
    const { state, gotoPage, page } = tableInstance;
    const { pageIndex } = state;

    return oppgaver.status === RessursStatus.SUKSESS && pageIndex >= 0 ? (
        <StyledDiv>
            |
            <StyledSpan>
                Viser {pageIndex * oppgaveSideLimit + 1} -{' '}
                {pageIndex * oppgaveSideLimit + page.length} av {oppgaver.data.oppgaver.length}{' '}
                oppgaver (totalt {oppgaver.data.antallTreffTotalt} oppgaver)
            </StyledSpan>
            |
            <StyledPagination
                size="small"
                page={pageIndex + 1}
                count={antallSider(oppgaver.data.oppgaver)}
                onPageChange={(side: number) => gotoPage(side - 1)}
            />
        </StyledDiv>
    ) : null;
};

export default OppgavelisteNavigator;
