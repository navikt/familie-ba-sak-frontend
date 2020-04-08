import React from 'react';
import FilterSkjema from './FilterSkjema';
import OppgaveList from './OppgaveList';
import { ISaksbehandler } from '../../typer/saksbehandler';

interface IVisOppgaverProps {
    innloggetSaksbehandler?: ISaksbehandler;
}

const VisOppgaver: React.FunctionComponent<IVisOppgaverProps> = props => {
    return (
        <div className="visoppgaver">
            <FilterSkjema innloggetSaksbehandler={props.innloggetSaksbehandler} />
            <OppgaveList />
        </div>
    );
};

export default VisOppgaver;
