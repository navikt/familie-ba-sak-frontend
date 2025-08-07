import { useParams } from 'react-router';

export function useFagsakId(): number | undefined {
    const { fagsakId } = useParams();
    const erTall = fagsakId !== undefined && !isNaN(Number(fagsakId));
    return erTall ? Number(fagsakId) : undefined;
}
