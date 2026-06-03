import { useFagsakId } from '@hooks/useFagsakId';
import { Navigate } from 'react-router';

export function RedirectTilSaksoversikt() {
    const fagsakId = useFagsakId();
    return <Navigate to={`/fagsak/${fagsakId}/saksoversikt`} replace={true} />;
}
