import { BodyShort, HGrid } from '@navikt/ds-react';
import type { IOppgave } from '@typer/oppgave';
import { OppgavetypeFilter } from '@typer/oppgave';

import { FordelOppgave } from './FordelOppgave';
import { TilbakestillOppgave } from './TilbakestillOppgave';

const STØTTEDE_OPPGAVETYPER = [
    OppgavetypeFilter.JFR,
    OppgavetypeFilter.BEH_SAK,
    OppgavetypeFilter.BEH_UND_VED,
    OppgavetypeFilter.GOD_VED,
    OppgavetypeFilter.VURD_LIVS,
    OppgavetypeFilter.BEH_SED,
];

interface Props {
    oppgave: IOppgave;
}

export function OppgavelisteSaksbehandler({ oppgave }: Props) {
    const oppgaveTypeErStøttet = STØTTEDE_OPPGAVETYPER.some(type => type === oppgave.oppgavetype);

    if (oppgave.tilordnetRessurs) {
        return (
            <HGrid columns={2} align={'center'} gap={'space-8'}>
                <BodyShort>{oppgave.tilordnetRessurs}</BodyShort>
                {oppgaveTypeErStøttet && <TilbakestillOppgave oppgave={oppgave} />}
            </HGrid>
        );
    }

    return (
        <HGrid columns={2} align={'center'} gap={'space-8'}>
            <BodyShort>Ikke tildelt</BodyShort>
            {oppgaveTypeErStøttet && <FordelOppgave oppgave={oppgave} />}
        </HGrid>
    );
}
