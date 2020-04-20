import React from 'react';
import FilterSkjema from './FilterSkjema';
import OppgaveList from './OppgaveList';
import { ISaksbehandler } from '../../typer/saksbehandler';
import { Systemtittel } from 'nav-frontend-typografi';

interface IVisOppgaverProps {
    innloggetSaksbehandler?: ISaksbehandler;
}

const VisOppgaver: React.FunctionComponent<IVisOppgaverProps> = props => {
    return (
        <div className="visoppgaver">
            <Systemtittel>Oppgavebenk</Systemtittel>
            <FilterSkjema innloggetSaksbehandler={props.innloggetSaksbehandler} />
            <OppgaveList />
        </div>
    );
};

export default VisOppgaver;
