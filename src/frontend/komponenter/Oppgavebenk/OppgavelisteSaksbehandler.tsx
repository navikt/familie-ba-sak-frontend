import React from 'react';
import { IOppgave, OppgavetypeFilter } from '../../typer/oppgave';
import { useOppgaver } from '../../context/OppgaverContext';
import { useApp } from '../../context/AppContext';
import { ISaksbehandler } from '@navikt/familie-typer';
import AlertStripe from 'nav-frontend-alertstriper';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import { hentFnrFraOppgaveIdenter } from '../../utils/oppgave';

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
    const [erTilbakestilt, setErTilbakestilt] = React.useState<boolean>(false);
    const { sjekkTilgang } = useApp();

    if (innloggetSaksbehandler == null) {
        return <AlertStripe type="feil">Klarte ikke hente innlogget saksbehandler</AlertStripe>;
    }

    if (feilmelding) {
        return <Feilmelding className={'kolonne'}>{feilmelding}</Feilmelding>;
    }
    if (erTilbakestilt) {
        return <div className={'kolonne'}>Saksbehandler er tilbakestilt</div>;
    }

    const oppgaveTypeErStøttet = [
        OppgavetypeFilter.JFR,
        OppgavetypeFilter.BEH_SAK,
        OppgavetypeFilter.BEH_UND_VED,
        OppgavetypeFilter.GOD_VED,
    ].find(
        (type: OppgavetypeFilter) =>
            OppgavetypeFilter[oppgave.oppgavetype as keyof typeof OppgavetypeFilter] === type
    );

    return oppgave.tilordnetRessurs ? (
        <div className={'kolonne'}>
            <Normaltekst>{oppgave.tilordnetRessurs}</Normaltekst>
            {oppgaveTypeErStøttet && (
                <button
                    key={'tilbakestill'}
                    onClick={() => {
                        tilbakestillFordelingPåOppgave(oppgave).then(
                            (oppgaveResponse: Ressurs<string>) => {
                                if (oppgaveResponse.status === RessursStatus.FEILET) {
                                    setFeilmelding(oppgaveResponse.frontendFeilmelding);
                                } else {
                                    setErTilbakestilt(true);
                                }
                            }
                        );
                    }}
                    children={'Tilbakestill'}
                />
            )}
        </div>
    ) : (
        <div className={'kolonne'}>
            <Normaltekst>Ikke tildelt</Normaltekst>
            {oppgaveTypeErStøttet && (
                <button
                    key={'plukk'}
                    onClick={async () => {
                        const brukerident = hentFnrFraOppgaveIdenter(oppgave.identer);

                        if (!brukerident || (brukerident && (await sjekkTilgang(brukerident)))) {
                            fordelOppgave(oppgave, innloggetSaksbehandler?.navIdent).then(
                                (oppgaveResponse: Ressurs<string>) => {
                                    if (oppgaveResponse.status === RessursStatus.FEILET) {
                                        setFeilmelding(oppgaveResponse.frontendFeilmelding);
                                    }
                                }
                            );
                        }
                    }}
                    children={'Plukk'}
                />
            )}
        </div>
    );
};

export default OppgavelisteSaksbehandler;
