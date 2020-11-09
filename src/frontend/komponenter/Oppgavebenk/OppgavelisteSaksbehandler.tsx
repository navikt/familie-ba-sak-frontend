import React, { useEffect, useRef } from 'react';
import { IOppgave, OppgavetypeFilter } from '../../typer/oppgave';
import { useOppgaver } from '../../context/OppgaverContext';
import { useApp } from '../../context/AppContext';
import { ISaksbehandler, Ressurs, RessursStatus } from '@navikt/familie-typer';
import AlertStripe from 'nav-frontend-alertstriper';
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
    const { fordelOppgave, tilbakestillFordelingPåOppgave, oppdaterOppgave } = useOppgaver();
    const [feilmelding, settFeilmelding] = React.useState<string>();
    const [erTilbakestilt, settErTilbakestilt] = React.useState<boolean>(false);
    const { sjekkTilgang } = useApp();
    const oppgaveRef = useRef<IOppgave | null>(null);

    useEffect(() => {
        if (oppgaveRef.current === null) {
            oppgaveRef.current = oppgave;
        }
        if (oppgaveRef.current.id !== oppgave.id) {
            settFeilmelding('');
            settErTilbakestilt(false);
        }
        oppgaveRef.current = oppgave;
    }, [oppgave]);

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
                            (oppgaveResponse: Ressurs<IOppgave>) => {
                                if (oppgaveResponse.status === RessursStatus.FEILET) {
                                    settFeilmelding(oppgaveResponse.frontendFeilmelding);
                                } else {
                                    oppgaveResponse.status === RessursStatus.SUKSESS &&
                                        oppdaterOppgave(oppgaveResponse.data);
                                    settErTilbakestilt(true);
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
                                        settFeilmelding(oppgaveResponse.frontendFeilmelding);
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
