import React from 'react';
import { IOppgave } from '../../typer/oppgave';
import { useOppgaver } from '../../context/OppgaverContext';

interface IOppgavelisteSaksbehandler {
    oppgave: IOppgave;
    innloggetSaksbehandler: string;
}

const OppgavelisteSaksbehandler: React.FunctionComponent<IOppgavelisteSaksbehandler> = ({
    oppgave,
    innloggetSaksbehandler,
}) => {
    const { fordelOppgave, tilbakestillFordelingPåOppgave } = useOppgaver();
    if (oppgave.tilordnetRessurs) {
        return (
            <div className={'kolonne'}>
                <div>{oppgave.tilordnetRessurs}</div>
                <button
                    key={'tilbakestill'}
                    onClick={() => {
                        tilbakestillFordelingPåOppgave(oppgave);
                    }}
                    children={'Tilbakestill'}
                />
            </div>
        );
    } else {
        return (
            <div className={'kolonne'}>
                <div>Ikke tildelt</div>
                <button
                    key={'plukk'}
                    onClick={() => {
                        fordelOppgave(oppgave, innloggetSaksbehandler);
                    }}
                    children={'Plukk'}
                />
            </div>
        );
    }
};

export default OppgavelisteSaksbehandler;
