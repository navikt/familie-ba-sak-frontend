import { RegistrerteBrevmottakere } from '@komponenter/Brevmottaker/Felles/RegistrerteBrevmottakere';
import { LeggTilBrevmottakerModalFagsak } from '@komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModalFagsak';
import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';

export function RegistrerteBrevmottakereFagsak() {
    const { brevmottakere } = useBrevmottakereFagsakContext();

    return (
        <RegistrerteBrevmottakere
            brevmottakere={brevmottakere}
            beskrivelse={'Informasjonsbrev sendes til:'}
            dialog={lukkDialog => <LeggTilBrevmottakerModalFagsak lukkModal={lukkDialog} />}
        />
    );
}
