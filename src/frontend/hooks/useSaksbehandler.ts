import { useMemo } from 'react';

import { useSaksbehandlerContext } from '../context/SaksbehandlerContext';
import { harSkrivetilgang, harSuperbrukertilgang, utledBehandlerRolle } from '../typer/saksbehandler';

export function useSaksbehandler() {
    const { saksbehandler } = useSaksbehandlerContext();

    return useMemo(() => {
        return {
            ...saksbehandler,
            rolle: utledBehandlerRolle(saksbehandler),
            harSuperbrukertilgang: harSuperbrukertilgang(saksbehandler),
            harSkrivetilgang: harSkrivetilgang(saksbehandler),
        };
    }, [saksbehandler]);
}
