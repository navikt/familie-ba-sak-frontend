import React, { useEffect, useRef } from 'react';

import { Alert, BodyShort, Button, HGrid } from '@navikt/ds-react';
import type { ISaksbehandler } from '@navikt/familie-typer';

import { useOppgaverContext } from './OppgaverContext';
import { useApp } from '../../context/AppContext';
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
    const { fordelOppgave, tilbakestillFordelingPåOppgave } = useOppgaverContext();
    const { sjekkTilgang } = useApp();
    const oppgaveRef = useRef<IOppgave | null>(null);

    useEffect(() => {
        if (oppgaveRef.current === null) {
            oppgaveRef.current = oppgave;
        }
        oppgaveRef.current = oppgave;
    }, [oppgave]);

    if (innloggetSaksbehandler == null) {
        return <Alert variant="error">Klarte ikke hente innlogget saksbehandler</Alert>;
    }

    const oppgaveTypeErStøttet =
        [
            OppgavetypeFilter.JFR,
            OppgavetypeFilter.BEH_SAK,
            OppgavetypeFilter.BEH_UND_VED,
            OppgavetypeFilter.GOD_VED,
            OppgavetypeFilter.VURD_LIVS,
            OppgavetypeFilter.BEH_SED,
        ].find(
            (type: OppgavetypeFilter) =>
                OppgavetypeFilter[oppgave.oppgavetype as keyof typeof OppgavetypeFilter] === type
        ) !== undefined;

    return oppgave.tilordnetRessurs ? (
        <HGrid columns={2} gap={'6'} align="center">
            <BodyShort>{oppgave.tilordnetRessurs}</BodyShort>
            {oppgaveTypeErStøttet && (
                <Button
                    variant="tertiary"
                    size="small"
                    key={'tilbakestill'}
                    onClick={() => {
                        tilbakestillFordelingPåOppgave(oppgave);
                    }}
                    children={'Tilbakestill'}
                />
            )}
        </HGrid>
    ) : (
        <HGrid columns={2} gap={'6'} align="center">
            <BodyShort>Ikke tildelt</BodyShort>
            {oppgaveTypeErStøttet && (
                <Button
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
        </HGrid>
    );
};

export default OppgavelisteSaksbehandler;
