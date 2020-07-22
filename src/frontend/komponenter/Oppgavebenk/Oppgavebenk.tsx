import React from 'react';
import OppgaveHeader from './OppgaveHeader';
import OppgaveList from './OppgaveList';

const Oppgavebenk: React.FunctionComponent = () => {
    return (
        <div className="oppgavebenk">
            <OppgaveHeader />
            <OppgaveList />
        </div>
    );
};

export default Oppgavebenk;
