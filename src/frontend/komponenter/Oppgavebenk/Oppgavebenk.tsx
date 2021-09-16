import React, { useEffect } from 'react';

import { Knapp } from 'nav-frontend-knapper';

import { useAmplitude } from '../../utils/amplitude';
import OppgaveHeader from './OppgaveHeader';
import OppgaveList from './OppgaveList';

const Oppgavebenk: React.FunctionComponent = () => {
    const { loggSidevisning } = useAmplitude();

    useEffect(() => {
        loggSidevisning('oppgavebenk');
    }, []);

    return (
        <div className="oppgavebenk">
            <OppgaveHeader />
            <Knapp
                onClick={() => {
                    throw Error();
                }}
            >
                Feil feil feil
            </Knapp>
            <OppgaveList />
        </div>
    );
};

export default Oppgavebenk;
