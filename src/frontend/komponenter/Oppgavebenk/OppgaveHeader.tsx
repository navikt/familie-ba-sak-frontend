import React from 'react';

import { Heading } from '@navikt/ds-react';

import FilterSkjema from './FilterSkjema';

const OppgaveHeader: React.FunctionComponent = () => {
    return (
        <div className={'oppgave-header'}>
            <div>
                <Heading size={'medium'} level={'2'} className={'oppgave-header__tittel'}>
                    Oppgavebenken
                </Heading>

                <FilterSkjema />
            </div>
        </div>
    );
};

export default OppgaveHeader;
