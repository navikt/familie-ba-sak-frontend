import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import { RegistrerteBrevmottakere } from '../Felles/RegistrerteBrevmottakere';
import { BrevmottakerDialogFagsak } from './BrevmottakerDialogFagsak';

export function RegistrerteBrevmottakereFagsak() {
    const { brevmottakere } = useBrevmottakereFagsakContext();

    return (
        <RegistrerteBrevmottakere
            brevmottakere={brevmottakere}
            beskrivelse={'Informasjonsbrev sendes til:'}
            dialog={<BrevmottakerDialogFagsak />}
        />
    );
}
