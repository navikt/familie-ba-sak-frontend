import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import type { Brevmottaker } from '@typer/brevmottaker';
import { useBrevmottakerForm } from '../Felles/Form/useBrevmottakerForm';

interface Props {
    onSubmitSuccess: () => void;
}

export function useBrevmottakerFormFagsak({ onSubmitSuccess }: Props) {
    const { leggTilBrevmottaker } = useBrevmottakereFagsakContext();

    function lagreBrevmottaker(brevmottaker: Brevmottaker) {
        leggTilBrevmottaker({ uuid: crypto.randomUUID(), ...brevmottaker });
    }

    return useBrevmottakerForm({ lagreBrevmottaker, onSubmitSuccess });
}
