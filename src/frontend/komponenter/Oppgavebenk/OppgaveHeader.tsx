import React from 'react';

import { Systemtittel } from 'nav-frontend-typografi';

import FilterSkjema from './FilterSkjema';

const OppgaveHeader: React.FunctionComponent = () => {
    return (
        <div className={'oppgave-header'}>
            <div>
                <Systemtittel className={'oppgave-header__tittel'}>Oppgavebenken</Systemtittel>

                <FilterSkjema />
            </div>
        </div>
    );
};

export default OppgaveHeader;
