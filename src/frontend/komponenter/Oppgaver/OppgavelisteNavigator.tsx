import React from 'react';
import { useOppgaver, oppgaveSideLimit } from '../../context/OppgaverContext';
import { RessursStatus } from '../../typer/ressurs';
import Lenke from 'nav-frontend-lenker';

const OppgavelisteNavigator: React.FunctionComponent = () => {
    const {
        oppgaver,
        hentOppgaveSide,
        sideindeks,
        forrigeSide,
        nesteSide,
        hentSidetall,
    } = useOppgaver();

    return (
        <div>
            {oppgaver.status === RessursStatus.SUKSESS && sideindeks >= 0 && (
                <div className={'oppgavelist__header__navigator'}>
                    |
                    <span className={'oppgavelist__header__navigator__felt'}>
                        Viser {sideindeks * oppgaveSideLimit + 1} -{' '}
                        {sideindeks * oppgaveSideLimit + hentOppgaveSide().length} av{' '}
                        {oppgaver.status === RessursStatus.SUKSESS
                            ? oppgaver.data.oppgaver.length
                            : 0}{' '}
                        oppgaver
                    </span>
                    |
                    <span className={'oppgavelist__header__navigator__felt'}>
                        Side {sideindeks + 1} av {hentSidetall()}
                    </span>
                    {hentSidetall() > 1 && <span>|</span>}
                    <span className={'oppgavelist__header__navigator__felt'}>
                        {sideindeks > 0 && (
                            <Lenke href="#" onClick={() => forrigeSide()}>
                                Forrige
                            </Lenke>
                        )}{' '}
                        {sideindeks < hentSidetall() - 1 && (
                            <Lenke href="#" onClick={() => nesteSide()}>
                                Neste
                            </Lenke>
                        )}
                    </span>
                </div>
            )}
        </div>
    );
};

export default OppgavelisteNavigator;
