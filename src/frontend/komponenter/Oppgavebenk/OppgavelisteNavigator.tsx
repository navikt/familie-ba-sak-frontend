import React from 'react';

import { Pagination } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { oppgaveSideLimit, useOppgaver } from '../../context/OppgaverContext';
import type { IOppgave } from '../../typer/oppgave';

const antallSider = (oppgaver: IOppgave[]): number => Math.ceil(oppgaver.length / oppgaveSideLimit);

const OppgavelisteNavigator: React.FunctionComponent = () => {
    const { oppgaver, tableInstance } = useOppgaver();
    const { state, gotoPage, page } = tableInstance;
    const { pageIndex } = state;

    return oppgaver.status === RessursStatus.SUKSESS && pageIndex >= 0 ? (
        <div className={'navigator'}>
            |
            <span className={'navigator--felt'}>
                Viser {pageIndex * oppgaveSideLimit + 1} -{' '}
                {pageIndex * oppgaveSideLimit + page.length} av {oppgaver.data.oppgaver.length}{' '}
                oppgaver (totalt {oppgaver.data.antallTreffTotalt} oppgaver)
            </span>
            |
            <Pagination
                size="small"
                page={pageIndex + 1}
                count={antallSider(oppgaver.data.oppgaver)}
                onPageChange={(side: number) => gotoPage(side - 1)}
            />
        </div>
    ) : null;
};

export default OppgavelisteNavigator;
