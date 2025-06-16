import { useParams } from 'react-router';

export function useFagsakId() {
    const { fagsakId } = useParams();
    const erTall = fagsakId !== undefined && !isNaN(Number(fagsakId));
    return erTall ? fagsakId : undefined;
}
