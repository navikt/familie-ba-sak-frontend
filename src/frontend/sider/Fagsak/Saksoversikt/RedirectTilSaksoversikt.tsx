import { useFagsakId } from '@hooks/useFagsakId';
import { Navigate } from 'react-router';

import { Path } from '../../../AppRoutes';

export function RedirectTilSaksoversikt() {
    const fagsakId = useFagsakId();
    return <Navigate to={Path.fagsak(fagsakId).saksoversikt} replace={true} />;
}
