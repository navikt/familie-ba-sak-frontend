import React from 'react';
import FilterSkjema from './FilterSkjema';
import OppgaveHeader from './OppgaveHeader';
import OppgaveList from './OppgaveList';

const VisOppgaver: React.FunctionComponent = () => {
    return (
        <div className="visoppgaver">
            <OppgaveHeader>Oppgavebenk</OppgaveHeader>
            <hr className={'visoppgaver__hr'} />
            <FilterSkjema />
            <OppgaveList />
        </div>
    );
};

export default VisOppgaver;
