import { useBehandling } from '@hooks/useBehandling';
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

    return (
        <RegistrerteBrevmottakere
            brevmottakere={brevmottakere}
            beskrivelse={hentBeskrivelse(kilde)}
            dialog={<BrevmottakerDialogBehandling />}
            className={className}
        />
    );
}
