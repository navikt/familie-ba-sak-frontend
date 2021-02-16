import React, { useEffect, useRef } from 'react';

import AlertStripe from 'nav-frontend-alertstriper';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';

import { ISaksbehandler, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useOppgaver } from '../../context/OppgaverContext';
import { IOppgave, OppgavetypeFilter } from '../../typer/oppgave';
import { hentFnrFraOppgaveIdenter } from '../../utils/oppgave';
import StyledBaseButton from '../Felleskomponenter/StyledBaseButton';

interface IOppgavelisteSaksbehandler {
    oppgave: IOppgave;
    innloggetSaksbehandler?: ISaksbehandler;
}

const OppgavelisteSaksbehandler: React.FunctionComponent<IOppgavelisteSaksbehandler> = ({
    oppgave,
    innloggetSaksbehandler,
}) => {
    const { fordelOppgave, tilbakestillFordelingPåOppgave } = useOppgaver();
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
                <StyledBaseButton
                    key={'tilbakestill'}
                    onClick={() => {
                        tilbakestillFordelingPåOppgave(oppgave).then(
                            (oppgaveResponse: Ressurs<IOppgave>) => {
                                if (
                                    oppgaveResponse.status === RessursStatus.FEILET ||
                                    oppgaveResponse.status === RessursStatus.FUNKSJONELL_FEIL ||
                                    oppgaveResponse.status === RessursStatus.IKKE_TILGANG
                                ) {
                                    settFeilmelding(oppgaveResponse.frontendFeilmelding);
                                } else {
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
                <StyledBaseButton
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
