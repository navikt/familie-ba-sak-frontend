import React from 'react';
import { IOppgave, ITilgangModal, OppgavetypeFilter } from '../../typer/oppgave';
import { useOppgaver } from '../../context/OppgaverContext';
import { ISaksbehandler } from '@navikt/familie-typer';
import AlertStripe from 'nav-frontend-alertstriper';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import { fnr } from '../../utils/oppgave';
import { loggFeil } from '../../api/axios';

interface IOppgavelisteSaksbehandler {
    oppgave: IOppgave;
    innloggetSaksbehandler?: ISaksbehandler;
    settVisTilgangsKontrollModal: (value: React.SetStateAction<boolean>) => void;
    settAdressebeskyttelsegradering: (value: React.SetStateAction<string>) => void;
}

const OppgavelisteSaksbehandler: React.FunctionComponent<IOppgavelisteSaksbehandler> = ({
    oppgave,
    innloggetSaksbehandler,
    settVisTilgangsKontrollModal,
    settAdressebeskyttelsegradering,
}) => {
    const { fordelOppgave, tilbakestillFordelingPåOppgave, sjekkTilgang } = useOppgaver();
    const [feilmelding, setFeilmelding] = React.useState<string>();
    const [erTilbakestilt, setErTilbakestilt] = React.useState<boolean>(false);

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
                    onClick={() => {
                        const brukerIdent = fnr(oppgave.identer);

                        if (brukerIdent === undefined) {
                            loggFeil(undefined, undefined, 'Oppgaven har ingen identer');
                            throw new Error('Oppgaven har ingen identer');
                        }
                        sjekkTilgang(brukerIdent).then((res: ITilgangModal) => {
                            if (res.saksbehandlerHarTilgang) {
                                fordelOppgave(oppgave, innloggetSaksbehandler?.navIdent).then(
                                    (oppgaveResponse: Ressurs<string>) => {
                                        if (oppgaveResponse.status === RessursStatus.FEILET) {
                                            setFeilmelding(oppgaveResponse.frontendFeilmelding);
                                        }
                                    }
                                );
                            } else {
                                settAdressebeskyttelsegradering(res.adressebeskyttelsegradering);
                                settVisTilgangsKontrollModal(true);
                            }
                        });
                    }}
                    children={'Plukk'}
                />
            )}
        </div>
    );
};

export default OppgavelisteSaksbehandler;
