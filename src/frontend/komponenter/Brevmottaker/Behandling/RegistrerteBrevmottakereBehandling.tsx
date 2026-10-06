import { useBehandling } from '@hooks/useBehandling';
import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { LeggTilBrevmottakerModalBehandling } from '@komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModalBehandling';
import { FeatureToggle } from '@typer/featureToggles';
import { RegistrerteBrevmottakere } from '../Felles/RegistrerteBrevmottakere';
import { BrevmottakerDialogBehandling } from './BrevmottakerDialogBehandling';

type Kilde = 'vedtak' | 'simulering';

function hentBeskrivelse(kilde: Kilde) {
    if (kilde === 'simulering') {
        return 'Varsel sendes til:';
    }
    return 'Vedtak sendes til:';
}

interface Props {
    kilde: Kilde;
    className?: string;
}

export function RegistrerteBrevmottakereBehandling({ kilde, className }: Props) {
    const { brevmottakere } = useBehandling();
    const toggles = useFeatureToggles();

    return (
        <RegistrerteBrevmottakere
            brevmottakere={brevmottakere}
            beskrivelse={hentBeskrivelse(kilde)}
            dialog={lukkDialog =>
                toggles[FeatureToggle.brukNyttBrevmottakerSkjema] ? (
                    <BrevmottakerDialogBehandling />
                ) : (
                    <LeggTilBrevmottakerModalBehandling lukkModal={lukkDialog} />
                )
            }
            className={className}
        />
    );
}
