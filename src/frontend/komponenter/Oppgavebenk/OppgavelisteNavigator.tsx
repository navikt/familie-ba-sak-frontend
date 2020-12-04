import React from 'react';

import Pagination from 'paginering';

import { RessursStatus } from '@navikt/familie-typer';

import { useOppgaver, oppgaveSideLimit } from '../../context/OppgaverContext';

const OppgavelisteNavigator: React.FunctionComponent = () => {
    const { oppgaver, hentOppgaveSide, sideindeks, settSide } = useOppgaver();

    return oppgaver.status === RessursStatus.SUKSESS && sideindeks >= 0 ? (
        <div className={'navigator'}>
            |
            <span className={'navigator--felt'}>
                Viser {sideindeks * oppgaveSideLimit + 1} -{' '}
                {sideindeks * oppgaveSideLimit + hentOppgaveSide().length} av{' '}
                {oppgaver.data.oppgaver.length} oppgaver (totalt {oppgaver.data.antallTreffTotalt}{' '}
                oppgaver)
            </span>
            |
            <Pagination
                className={'pagination'}
                numberOfItems={oppgaver.data.oppgaver.length}
                itemsPerPage={oppgaveSideLimit}
                maxPageButtons={5}
                onChange={(side: number) => settSide(side - 1)}
            />
        </div>
    ) : null;
};

export default OppgavelisteNavigator;
