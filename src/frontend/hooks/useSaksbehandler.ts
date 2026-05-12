import { useSaksbehandlerContext } from '../context/SaksbehandlerContext';

export function useSaksbehandler() {
    const { saksbehandler } = useSaksbehandlerContext();
    return saksbehandler;
}
