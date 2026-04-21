import { useParams } from 'react-router';

/**
 * Bruk {@link useBehandlingId} framfor denne, hvis du befinner deg inne i BehandlingContext.
 */
export function useBehandlingIdParam(): number | undefined {
    const { behandlingId } = useParams();
    const erTall = behandlingId !== undefined && !isNaN(Number(behandlingId));
    return erTall ? Number(behandlingId) : undefined;
}
