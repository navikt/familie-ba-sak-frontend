import React from 'react';
import { IOppgave } from '../../typer/oppgave';
import { useOppgaver } from '../../context/OppgaverContext';
import { ISaksbehandler } from '../../typer/saksbehandler';
import AlertStripe from 'nav-frontend-alertstriper';

interface IOppgavelisteSaksbehandler {
    oppgave: IOppgave;
    innloggetSaksbehandler?: ISaksbehandler;
}

const OppgavelisteSaksbehandler: React.FunctionComponent<IOppgavelisteSaksbehandler> = ({
    oppgave,
    innloggetSaksbehandler,
}) => {
    const { fordelOppgave, tilbakestillFordelingPåOppgave } = useOppgaver();
    if (innloggetSaksbehandler == null) {
        return <AlertStripe type="feil">Klarte ikke hente innlogget saksbehandler</AlertStripe>;
    }
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
                        fordelOppgave(oppgave, innloggetSaksbehandler?.navIdent);
                    }}
                    children={'Plukk'}
                />
            </div>
        );
    }
};

export default OppgavelisteSaksbehandler;
