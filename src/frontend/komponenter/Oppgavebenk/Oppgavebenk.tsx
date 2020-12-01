import React, { useEffect } from 'react';

import { useHistory } from 'react-router';

import { useAmplitude } from '../../utils/amplitude';
import OppgaveHeader from './OppgaveHeader';
import OppgaveList from './OppgaveList';

const Oppgavebenk: React.FunctionComponent = () => {
    const history = useHistory();
    const { loggSidevisning } = useAmplitude();

    useEffect(() => {
        loggSidevisning('oppgavebenk');
    }, [history.location.pathname]);

    return (
        <div className="oppgavebenk">
            <OppgaveHeader />
            <OppgaveList />
        </div>
    );
};

export default Oppgavebenk;
