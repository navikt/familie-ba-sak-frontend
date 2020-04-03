import React from 'react';
import FilterSkjema from './FilterSkjema';
import OppgaveList from './OppgaveList';

const VisOppgaver: React.FunctionComponent = () => {
    return (
        <div className="visoppgaver">
            <FilterSkjema />
            <OppgaveList />
        </div>
    );
};

export default VisOppgaver;
