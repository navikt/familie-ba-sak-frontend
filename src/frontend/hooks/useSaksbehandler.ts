import { useMemo } from 'react';

import { useSaksbehandlerContext } from '../context/SaksbehandlerContext';
import { harSkrivetilgang, harSuperbrukerTilgang, utledBehandlerRolle } from '../typer/saksbehandler';

export function useSaksbehandler() {
    const { saksbehandler } = useSaksbehandlerContext();

    return useMemo(() => {
        return {
            ...saksbehandler,
            rolle: utledBehandlerRolle(saksbehandler),
            harSuperbrukertilgang: harSuperbrukerTilgang(saksbehandler),
            harSkrivetilgang: harSkrivetilgang(saksbehandler),
        };
    }, [saksbehandler]);
}
