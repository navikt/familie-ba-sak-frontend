import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { LeggTilBrevmottakerModalFagsak } from '@komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModalFagsak';
import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import { FeatureToggle } from '@typer/featureToggles';
import { RegistrerteBrevmottakere } from '../Felles/RegistrerteBrevmottakere';
import { BrevmottakerDialogFagsak } from './BrevmottakerDialogFagsak';

export function RegistrerteBrevmottakereFagsak() {
    const { brevmottakere } = useBrevmottakereFagsakContext();
    const toggles = useFeatureToggles();

    return (
        <RegistrerteBrevmottakere
            brevmottakere={brevmottakere}
            beskrivelse={'Informasjonsbrev sendes til:'}
            dialog={lukkDialog =>
                toggles[FeatureToggle.brukNyttBrevmottakerSkjema] ? (
                    <BrevmottakerDialogFagsak />
                ) : (
                    <LeggTilBrevmottakerModalFagsak lukkModal={lukkDialog} />
                )
            }
        />
    );
}
