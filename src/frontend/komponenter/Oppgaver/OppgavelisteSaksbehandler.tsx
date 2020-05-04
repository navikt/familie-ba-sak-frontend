import React from 'react';
import { IOppgave, OppgavetypeFilter } from '../../typer/oppgave';
import { useOppgaver } from '../../context/OppgaverContext';
import { ISaksbehandler } from '../../typer/saksbehandler';
import AlertStripe from 'nav-frontend-alertstriper';
import { Ressurs, RessursStatus } from '../../typer/ressurs';
import { Feilmelding } from 'nav-frontend-typografi';

interface IOppgavelisteSaksbehandler {
    oppgave: IOppgave;
    innloggetSaksbehandler?: ISaksbehandler;
}

const OppgavelisteSaksbehandler: React.FunctionComponent<IOppgavelisteSaksbehandler> = ({
    oppgave,
    innloggetSaksbehandler,
}) => {
    const { fordelOppgave, tilbakestillFordelingPåOppgave } = useOppgaver();
    const [feilmelding, setFeilmelding] = React.useState<string>();
    if (innloggetSaksbehandler == null) {
        return <AlertStripe type="feil">Klarte ikke hente innlogget saksbehandler</AlertStripe>;
    }

    if (feilmelding) {
        return <Feilmelding>{feilmelding}</Feilmelding>;
    }

    const oppgaveTypeErStøttet = [
        OppgavetypeFilter.JFR,
        OppgavetypeFilter.BEH_SAK,
        OppgavetypeFilter.BEH_UND_VED,
        OppgavetypeFilter.GOD_VED,
    ].find(
        type => OppgavetypeFilter[oppgave.oppgavetype as keyof typeof OppgavetypeFilter] === type
    );

    if (oppgave.tilordnetRessurs) {
        return (
            <div className={'kolonne'}>
                <div>{oppgave.tilordnetRessurs}</div>
                {oppgaveTypeErStøttet && (
                    <button
                        key={'tilbakestill'}
                        onClick={() => {
                            tilbakestillFordelingPåOppgave(oppgave).then(
                                (oppgaveResponse: Ressurs<string>) => {
                                    if (oppgaveResponse.status === RessursStatus.FEILET) {
                                        setFeilmelding(oppgaveResponse.melding);
                                    }
                                }
                            );
                        }}
                        children={'Tilbakestill'}
                    />
                )}
            </div>
        );
    } else {
        return (
            <div className={'kolonne'}>
                <div>Ikke tildelt</div>
                {oppgaveTypeErStøttet && (
                    <button
                        key={'plukk'}
                        onClick={() => {
                            fordelOppgave(oppgave, innloggetSaksbehandler?.navIdent).then(
                                (oppgaveResponse: Ressurs<string>) => {
                                    if (oppgaveResponse.status === RessursStatus.FEILET) {
                                        setFeilmelding(oppgaveResponse.melding);
                                    }
                                }
                            );
                        }}
                        children={'Plukk'}
                    />
                )}
            </div>
        );
    }
};

export default OppgavelisteSaksbehandler;
