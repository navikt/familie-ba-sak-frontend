import React, { useEffect, useRef } from 'react';

import { BodyShort, Button, HGrid } from '@navikt/ds-react';

import { useOppgavebenkContext } from './OppgavebenkContext';
import { useAppContext } from '../../context/AppContext';
import type { IOppgave } from '../../typer/oppgave';
import { OppgavetypeFilter } from '../../typer/oppgave';
import type { Saksbehandler } from '../../typer/saksbehandler';
import { hentFnrFraOppgaveIdenter } from '../../utils/oppgave';

interface IOppgavelisteSaksbehandler {
    oppgave: IOppgave;
    saksbehandler: Saksbehandler;
}

const OppgavelisteSaksbehandler: React.FunctionComponent<IOppgavelisteSaksbehandler> = ({ oppgave, saksbehandler }) => {
    const { fordelOppgave, tilbakestillFordelingPåOppgave } = useOppgavebenkContext();
    const { sjekkTilgang } = useAppContext();
    const oppgaveRef = useRef<IOppgave | null>(null);

    useEffect(() => {
        if (oppgaveRef.current === null) {
            oppgaveRef.current = oppgave;
        }
        oppgaveRef.current = oppgave;
    }, [oppgave]);

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
        <HGrid columns={2} gap={'space-24'} align="center">
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
        <HGrid columns={2} gap={'space-24'} align="center">
            <BodyShort>Ikke tildelt</BodyShort>
            {oppgaveTypeErStøttet && (
                <Button
                    variant="secondary"
                    size="small"
                    key={'plukk'}
                    onClick={async () => {
                        const brukerident = hentFnrFraOppgaveIdenter(oppgave.identer);

                        if (!brukerident || (brukerident && (await sjekkTilgang(brukerident)))) {
                            fordelOppgave(oppgave, saksbehandler?.navIdent);
                        }
                    }}
                    children={'Tildel meg'}
                />
            )}
        </HGrid>
    );
};

export default OppgavelisteSaksbehandler;
