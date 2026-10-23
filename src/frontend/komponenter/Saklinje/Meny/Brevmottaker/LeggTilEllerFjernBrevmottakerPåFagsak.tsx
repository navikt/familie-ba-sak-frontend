import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { useBrevmottakerDialogContext } from '@komponenter/Brevmottaker/Felles/BrevmottakerDialogContext';
import { ActionMenu } from '@navikt/ds-react';
import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import type { BrevmottakerFagsak } from '@typer/brevmottaker';

function utledLabel(brevmottakere: BrevmottakerFagsak[], erLesevisning: boolean) {
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

export function LeggTilEllerFjernBrevmottakerPåFagsak() {
    const erLesevisning = useErLesevisningFagsak();

    const { åpneDialog } = useBrevmottakerDialogContext();
    const { brevmottakere } = useBrevmottakereFagsakContext();

    if (erLesevisning && brevmottakere.length === 0) {
        return null;
    }

    return <ActionMenu.Item onSelect={åpneDialog}>{utledLabel(brevmottakere, erLesevisning)}</ActionMenu.Item>;
}
