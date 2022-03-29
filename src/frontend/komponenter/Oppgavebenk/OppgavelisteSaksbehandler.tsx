import React, { useEffect, useRef } from 'react';

import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';

import { Button } from '@navikt/ds-react';
import type { ISaksbehandler } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useOppgaver } from '../../context/OppgaverContext';
import type { IOppgave } from '../../typer/oppgave';
import { OppgavetypeFilter } from '../../typer/oppgave';
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
    const { sjekkTilgang } = useApp();
    const oppgaveRef = useRef<IOppgave | null>(null);

    useEffect(() => {
        if (oppgaveRef.current === null) {
            oppgaveRef.current = oppgave;
        }
        oppgaveRef.current = oppgave;
    }, [oppgave]);

    if (innloggetSaksbehandler == null) {
        return <AlertStripe type="feil">Klarte ikke hente innlogget saksbehandler</AlertStripe>;
    }

    const oppgaveTypeErStøttet = [
        OppgavetypeFilter.JFR,
        OppgavetypeFilter.BEH_SAK,
        OppgavetypeFilter.BEH_UND_VED,
        OppgavetypeFilter.GOD_VED,
        OppgavetypeFilter.VURD_LIVS,
    ].find(
        (type: OppgavetypeFilter) =>
            OppgavetypeFilter[oppgave.oppgavetype as keyof typeof OppgavetypeFilter] === type
    );

    return oppgave.tilordnetRessurs ? (
        <div className={'kolonne'}>
            <Normaltekst className="tilordnet-ressurs-tekst">
                {oppgave.tilordnetRessurs}
            </Normaltekst>
            {oppgaveTypeErStøttet && (
                <Button
                    className="tilordne-ressurs-knapp"
                    variant="tertiary"
                    size="small"
                    key={'tilbakestill'}
                    onClick={() => {
                        tilbakestillFordelingPåOppgave(oppgave);
                    }}
                    children={'Tilbakestill'}
                />
            )}
        </div>
    ) : (
        <div className={'kolonne'}>
            <Normaltekst className="tilordnet-ressurs-tekst">Ikke tildelt</Normaltekst>
            {oppgaveTypeErStøttet && (
                <Button
                    className="tilordne-ressurs-knapp"
                    variant="secondary"
                    size="small"
                    key={'plukk'}
                    onClick={async () => {
                        const brukerident = hentFnrFraOppgaveIdenter(oppgave.identer);

                        if (!brukerident || (brukerident && (await sjekkTilgang(brukerident)))) {
                            fordelOppgave(oppgave, innloggetSaksbehandler?.navIdent);
                        }
                    }}
                    children={'Tildel meg'}
                />
            )}
        </div>
    );
};

export default OppgavelisteSaksbehandler;
