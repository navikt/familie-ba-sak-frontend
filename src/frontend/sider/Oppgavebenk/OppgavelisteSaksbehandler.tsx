import { useEffect, useRef } from 'react';

import { useVisManglerTilgangModal } from '@context/ManglerTilgangModalContext';
import { useVisTekniskFeilModal } from '@context/TekniskFeilModalContext';
import { useSjekkSaksbehandlertilgangTilIdent } from '@hooks/useSjekkSaksbehandlertilgangTilIdent';
import type { IOppgave } from '@typer/oppgave';
import { OppgavetypeFilter } from '@typer/oppgave';
import type { Saksbehandler } from '@typer/saksbehandler';
import { hentFnrFraOppgaveIdenter } from '@utils/oppgave';

import { BodyShort, Button, HGrid } from '@navikt/ds-react';

import { useOppgavebenkContext } from './OppgavebenkContext';

interface Props {
    oppgave: IOppgave;
    saksbehandler: Saksbehandler;
}

export function OppgavelisteSaksbehandler({ oppgave, saksbehandler }: Props) {
    const { fordelOppgave, tilbakestillFordelingPåOppgave } = useOppgavebenkContext();

    const visTekniskFeilModal = useVisTekniskFeilModal();
    const visManglerTilgangModal = useVisManglerTilgangModal();

    const { mutateAsync: sjekkSaksbehandlertilgangTilIdent } = useSjekkSaksbehandlertilgangTilIdent({});

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
        const brukerIdent = hentFnrFraOppgaveIdenter(oppgave.identer);
        if (brukerIdent) {
            try {
                const tilgangsreusltat = await sjekkSaksbehandlertilgangTilIdent({ brukerIdent });
                if (tilgangsreusltat.saksbehandlerHarTilgang) {
                    fordelOppgave(oppgave, saksbehandler.navIdent);
                } else {
                    visManglerTilgangModal(tilgangsreusltat);
                }
            } catch (error) {
                visTekniskFeilModal(error);
            }
        } else {
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
