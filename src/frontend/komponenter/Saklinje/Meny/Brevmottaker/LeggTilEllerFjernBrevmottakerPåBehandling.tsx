import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { useBrevmottakerDialogContext } from '@komponenter/Brevmottaker/Behandling/Dialog/BrevmottakerDialogContext';
import { ActionMenu } from '@navikt/ds-react';
import { Behandlingstype } from '@typer/behandling';
import type { BrevmottakerBehandling } from '@typer/brevmottaker';
import { FagsakType } from '@typer/fagsak';

function utledLabel(brevmottakere: BrevmottakerBehandling[], erLesevisning: boolean) {
    if (erLesevisning) {
        return brevmottakere.length === 1 ? 'Se brevmottaker' : 'Se brevmottakere';
    }
    if (brevmottakere.length === 0) {
        return 'Legg til brevmottaker';
    }
    if (brevmottakere.length === 1) {
        return 'Legg til eller fjern brevmottaker';
    }
    return 'Se eller fjern brevmottakere';
}

const relevanteBehandlingstyper = [Behandlingstype.FØRSTEGANGSBEHANDLING, Behandlingstype.REVURDERING];

export function LeggTilEllerFjernBrevmottakerPåBehandling() {
    const fagsak = useFagsak();
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();

    const { åpneDialog } = useBrevmottakerDialogContext();

    const erInstitusjonssak = fagsak.fagsakType === FagsakType.INSTITUSJON;
    const erRelevantBehandlingstype = relevanteBehandlingstyper.includes(behandling.type);

    if (!erRelevantBehandlingstype || erInstitusjonssak) {
        return null;
    }

    const harBrevmottaker = behandling.brevmottakere.length > 0;

    if (erLesevisning && !harBrevmottaker) {
        return null;
    }

    return (
        <ActionMenu.Item onSelect={åpneDialog}>{utledLabel(behandling.brevmottakere, erLesevisning)}</ActionMenu.Item>
    );
}
