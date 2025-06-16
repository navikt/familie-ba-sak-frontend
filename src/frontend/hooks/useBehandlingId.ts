import { useParams } from 'react-router';

export function useBehandlingId() {
    const { behandlingId } = useParams();
    const erTall = behandlingId !== undefined && !isNaN(Number(behandlingId));
    return erTall ? behandlingId : undefined;
}
