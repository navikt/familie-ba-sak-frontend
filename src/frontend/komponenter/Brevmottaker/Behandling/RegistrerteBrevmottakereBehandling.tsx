import { useBehandling } from '@hooks/useBehandling';
import { RegistrerteBrevmottakere } from '@komponenter/Brevmottaker/Felles/RegistrerteBrevmottakere';
import { LeggTilBrevmottakerModalBehandling } from '@komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModalBehandling';

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
            dialog={lukkDialog => <LeggTilBrevmottakerModalBehandling lukkModal={lukkDialog} />}
            className={className}
        />
    );
}
