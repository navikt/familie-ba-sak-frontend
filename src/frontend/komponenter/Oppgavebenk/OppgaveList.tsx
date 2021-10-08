import React from 'react';

import Alertstripe from 'nav-frontend-alertstriper';
import { Systemtittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useOppgaver } from '../../context/OppgaverContext';
import OppgavelisteNavigator from './OppgavelisteNavigator';
import { OppgaveTabell } from './OppgaveTabell';

const OppgaveList: React.FunctionComponent = () => {
    const { oppgaver } = useOppgaver();

    return (
        <div className={'oppgavelist'}>
            <div className={'oppgavelist__header'}>
                <Systemtittel>Oppgaveliste</Systemtittel>
                <OppgavelisteNavigator />
            </div>
            <div>
                <OppgaveTabell />
            </div>

            {oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.oppgaver.length === 0 && (
                <Alertstripe type="advarsel" className="oppgavelist__info">
                    Ingen oppgaver
                </Alertstripe>
            )}
            {(oppgaver.status === RessursStatus.FEILET ||
                oppgaver.status === RessursStatus.FUNKSJONELL_FEIL ||
                oppgaver.status === RessursStatus.IKKE_TILGANG) && (
                <Alertstripe type="feil" className="oppgavelist__info">
                    {oppgaver.frontendFeilmelding}
                </Alertstripe>
            )}
            {oppgaver.status === RessursStatus.HENTER && (
                <Alertstripe type="info" className="oppgavelist__info">
                    Henter...
                </Alertstripe>
            )}
        </div>
    );
};

export default OppgaveList;
