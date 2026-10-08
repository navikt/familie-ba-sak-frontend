import { ActionMenu } from '@navikt/ds-react';
import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import type { BrevmottakerFagsak } from '@typer/brevmottaker';
import { useLocation } from 'react-router';

const utledLabel = (brevmottakere: BrevmottakerFagsak[]) => {
    if (brevmottakere.length === 0) {
        return 'Legg til brevmottaker';
    }
    if (brevmottakere.length === 1) {
        return 'Legg til eller fjern brevmottaker';
    }
    return 'Se eller fjern brevmottakere';
};

interface Props {
    åpneModal: () => void;
}

export function LeggTilEllerFjernBrevmottakerePåFagsak({ åpneModal }: Props) {
    const { brevmottakere } = useBrevmottakereFagsakContext();
    const location = useLocation();

    const erPåDokumentutsending = location.pathname.includes('dokumentutsending');

    if (!erPåDokumentutsending) {
        return null;
    }

    const label = utledLabel(brevmottakere);

    return <ActionMenu.Item onClick={åpneModal}>{label}</ActionMenu.Item>;
}
