import { FagsakId } from '@typer/fagsak';
import { useParams } from 'react-router';

/**
 * Bruk {@link useFagsakId} framfor denne, hvis du befinner deg inne i FagsakContext.
 */
export function useFagsakIdParam(): FagsakId | undefined {
    const { fagsakId } = useParams();
    if (fagsakId === undefined || !/^[1-9]\d*$/.test(fagsakId)) {
        return undefined;
    }
    const id = Number(fagsakId);
    return FagsakId.erGyldig(id) ? FagsakId.fra(id) : undefined;
}
