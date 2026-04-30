import { LeggTilBrevmottakerModal } from './LeggTilBrevmottakerModal';
import { useLagreEllerFjernMottakerPåBehandling } from './useLagreOgFjernMottakerPåBehandling';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';

interface IBehandlingModalProps {
    lukkModal: () => void;
}

export const LeggTilBrevmottakerModalBehandling = ({ lukkModal }: IBehandlingModalProps) => {
    const { behandling, vurderErLesevisning } = useBehandlingContext();

    const { lagreMottaker, fjernMottaker } = useLagreEllerFjernMottakerPåBehandling({
        behandlingId: behandling.behandlingId,
    });

    const erLesevisning = vurderErLesevisning();

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
