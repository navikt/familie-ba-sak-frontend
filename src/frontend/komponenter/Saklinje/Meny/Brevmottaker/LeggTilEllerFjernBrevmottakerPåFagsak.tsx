import { useBrevmottakerDialogContext } from '@komponenter/Brevmottaker/Fagsak/Dialog/BrevmottakerDialogContext';
import { ActionMenu } from '@navikt/ds-react';
import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import type { BrevmottakerFagsak } from '@typer/brevmottaker';

function utledLabel(brevmottakere: BrevmottakerFagsak[]) {
    if (brevmottakere.length === 0) {
        return 'Legg til brevmottaker';
    }
    if (brevmottakere.length === 1) {
        return 'Legg til eller fjern brevmottaker';
    }
    return 'Se eller fjern brevmottakere';
}

export function LeggTilEllerFjernBrevmottakerPåFagsak() {
    const { åpneDialog } = useBrevmottakerDialogContext();
    const { brevmottakere } = useBrevmottakereFagsakContext();

    return <ActionMenu.Item onSelect={åpneDialog}>{utledLabel(brevmottakere)}</ActionMenu.Item>;
}
