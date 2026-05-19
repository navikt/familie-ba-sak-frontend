import { useEffect, useRef } from 'react';

import { useAppContext } from '@context/AppContext';
import type { IOppgave } from '@typer/oppgave';
import { OppgavetypeFilter } from '@typer/oppgave';
import type { Saksbehandler } from '@typer/saksbehandler';
import { hentFnrFraOppgaveIdenter } from '@utils/oppgave';

import { BodyShort, Button, HGrid } from '@navikt/ds-react';

import { useOppgavebenkContext } from './OppgavebenkContext';

interface IOppgavelisteSaksbehandler {
    oppgave: IOppgave;
    saksbehandler: Saksbehandler;
}

export function OppgavelisteSaksbehandler({ oppgave, saksbehandler }: IOppgavelisteSaksbehandler) {
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

    function onTilbakestillFordelingPåOppgave() {
        tilbakestillFordelingPåOppgave(oppgave);
    }

    async function onFordelOppgave() {
        const brukerident = hentFnrFraOppgaveIdenter(oppgave.identer);
        if (!brukerident || (brukerident && (await sjekkTilgang(brukerident)))) {
            fordelOppgave(oppgave, saksbehandler.navIdent);
        }
    }

    if (oppgave.tilordnetRessurs) {
        return (
            <HGrid columns={2} align={'center'} gap={'space-8'}>
                <BodyShort>{oppgave.tilordnetRessurs}</BodyShort>
                {oppgaveTypeErStøttet && (
                    <Button variant={'tertiary'} size={'small'} onClick={onTilbakestillFordelingPåOppgave}>
                        Tilbakestill
                    </Button>
                )}
            </HGrid>
        );
    }

    return (
        <HGrid columns={2} align={'center'} gap={'space-8'}>
            <BodyShort>Ikke tildelt</BodyShort>
            {oppgaveTypeErStøttet && (
                <Button variant={'secondary'} size={'small'} onClick={onFordelOppgave}>
                    Tildel meg
                </Button>
            )}
        </HGrid>
    );
}
