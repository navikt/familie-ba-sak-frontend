import React from 'react';
import FilterSkjema from './FilterSkjema';
import OppgaveList from './OppgaveList';
import { ISaksbehandler } from '../../typer/saksbehandler';
import OppgaveHeader from './OppgaveHeader';

interface IVisOppgaverProps {
    innloggetSaksbehandler?: ISaksbehandler;
}

const VisOppgaver: React.FunctionComponent<IVisOppgaverProps> = props => {
    return (
        <div className="visoppgaver">
            <OppgaveHeader>Oppgavebenk</OppgaveHeader>
            <hr className={'visoppgaver__hr'} />
            <FilterSkjema innloggetSaksbehandler={props.innloggetSaksbehandler} />
            <OppgaveList innloggetSaksbehandler={props.innloggetSaksbehandler} />
        </div>
    );
};

export default VisOppgaver;
