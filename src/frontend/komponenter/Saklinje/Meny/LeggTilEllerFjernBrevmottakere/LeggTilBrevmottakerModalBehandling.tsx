import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';

import { LeggTilBrevmottakerModal } from './LeggTilBrevmottakerModal';
import { useLagreEllerFjernMottakerPåBehandling } from './useLagreOgFjernMottakerPåBehandling';

interface IBehandlingModalProps {
    lukkModal: () => void;
}

export const LeggTilBrevmottakerModalBehandling = ({ lukkModal }: IBehandlingModalProps) => {
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();

    const { lagreMottaker, fjernMottaker } = useLagreEllerFjernMottakerPåBehandling({
        behandlingId: behandling.behandlingId,
    });

    return (
        <LeggTilBrevmottakerModal
            brevmottakere={behandling.brevmottakere}
            lagreMottaker={lagreMottaker}
            fjernMottaker={fjernMottaker}
            erLesevisning={erLesevisning}
            lukkModal={lukkModal}
        />
    );
};
