import React from 'react';

import Pagination from 'paginering';

import { RessursStatus } from '@navikt/familie-typer';

import { oppgaveSideLimit, useOppgaver } from '../../context/OppgaverContext';

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
                className={'pagination'}
                numberOfItems={oppgaver.data.oppgaver.length}
                itemsPerPage={oppgaveSideLimit}
                maxPageButtons={5}
                onChange={(side: number) => gotoPage(side - 1)}
            />
        </div>
    ) : null;
};

export default OppgavelisteNavigator;
