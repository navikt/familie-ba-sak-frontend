import { ActionMenu } from '@navikt/ds-react';
import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import { useBrevmottakerDialogContext } from './BrevmottakerDialogContext';

export function LeggTilEllerFjernBrevmottaker() {
    const { åpneDialog } = useBrevmottakerDialogContext();
    const { brevmottakere } = useBrevmottakereFagsakContext();

    return (
        <ActionMenu.Item onSelect={åpneDialog}>
            {brevmottakere.length === 0 ? 'Legg til brevmottaker' : 'Legg til eller fjern brevmottaker'}
        </ActionMenu.Item>
    );
}
