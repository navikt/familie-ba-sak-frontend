import React from 'react';
import FilterSkjema from './FilterSkjema';
import OppgaveList from './OppgaveList';
import { ISaksbehandler } from '../../typer/saksbehandler';
import { OppgaverProvider } from '../../context/OppgaverContext';
import { Systemtittel } from 'nav-frontend-typografi';

interface IVisOppgaverProps {
    innloggetSaksbehandler?: ISaksbehandler;
}

const VisOppgaver: React.FunctionComponent<IVisOppgaverProps> = props => {
    return (
        <div className="visoppgaver">
            <OppgaverProvider>
                <Systemtittel>Oppgavebenk</Systemtittel>
                <FilterSkjema innloggetSaksbehandler={props.innloggetSaksbehandler} />
                <OppgaveList />
            </OppgaverProvider>
        </div>
    );
};

export default VisOppgaver;
