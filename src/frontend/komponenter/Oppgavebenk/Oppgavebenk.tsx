import React, { useEffect } from 'react';

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
            <OppgaveList />
        </div>
    );
};

export default Oppgavebenk;
