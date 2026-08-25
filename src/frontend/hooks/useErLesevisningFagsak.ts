import { FagsakStatus } from '@typer/fagsak';

import { useFagsak } from './useFagsak';
import { useSaksbehandler } from './useSaksbehandler';

export function useErLesevisningFagsak() {
    const saksbehandler = useSaksbehandler();
    const fagsak = useFagsak();

    if (fagsak.status === FagsakStatus.LÅST) {
        return true;
    }

    if (!saksbehandler.harSkrivetilgang) {
        return true;
    }

    return false;
}
