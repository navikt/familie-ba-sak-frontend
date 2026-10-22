import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import type { BrevmottakerFagsak } from '@typer/brevmottaker';
import { BrevmottakerDetaljer } from '../Felles/BrevmottakerDetaljer';

interface Props {
    brevmottaker: BrevmottakerFagsak;
}

export function BrevmottakerDetaljerFagsak({ brevmottaker }: Props) {
    const erLesevisning = useErLesevisningFagsak();

    const { slettBrevmottaker } = useBrevmottakereFagsakContext();

    return (
        <BrevmottakerDetaljer
            brevmottaker={brevmottaker}
            erLesevisning={erLesevisning}
            onSlett={() => slettBrevmottaker(brevmottaker)}
        />
    );
}
