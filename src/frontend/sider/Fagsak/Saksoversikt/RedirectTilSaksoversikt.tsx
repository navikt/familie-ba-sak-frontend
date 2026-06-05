import { Path } from '@app/path';
import { useFagsakId } from '@hooks/useFagsakId';
import { Navigate } from 'react-router';

export function RedirectTilSaksoversikt() {
    const fagsakId = useFagsakId();
    return <Navigate to={Path.fagsak(fagsakId).saksoversikt} replace={true} />;
}
