import React from 'react';

import { BodyShort } from '@navikt/ds-react';

import type { IBaseFagsak } from '../../../typer/fagsak';

function utledUndertittel(fagsakerPåBruker: IBaseFagsak[]) {
    const harFagsak = (fagsakerPåBruker ?? []).length > 0;
    if (harFagsak) {
        return 'Personen har allerede en tilknyttet fagsak. Ønsker du å opprette ny fagsak for denne personen?';
    } else {
        return 'Ønsker du å opprette fagsak for denne personen?';
    }
}

interface Props {
    fagsaker: IBaseFagsak[];
}

export function Undertittel({ fagsaker }: Props) {
    return <BodyShort>{utledUndertittel(fagsaker)}</BodyShort>;
}
