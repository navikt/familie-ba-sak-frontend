import { useParams } from 'react-router';

/**
 * Bruk {@link useFagsakId} framfor denne, hvis du befinner deg inne i FagsakContext.
 */
export function useFagsakIdParam(): number | undefined {
    const { fagsakId } = useParams();
    const erTall = fagsakId !== undefined && !isNaN(Number(fagsakId));
    return erTall ? Number(fagsakId) : undefined;
}
