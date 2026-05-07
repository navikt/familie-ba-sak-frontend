import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { Behandlingstype } from '@typer/behandling';
import { FagsakType } from '@typer/fagsak';

import { ActionMenu } from '@navikt/ds-react';

import type { SkjemaBrevmottaker } from './useBrevmottakerSkjema';

function utledLabel(brevmottakere: SkjemaBrevmottaker[], erLesevisning: boolean) {
    if (erLesevisning) {
        return brevmottakere.length === 1 ? 'Se brevmottaker' : 'Se brevmottakere';
    }
    if (brevmottakere.length === 0) {
        return 'Legg til brevmottaker';
    }
    if (brevmottakere.length === 1) {
        return 'Legg til eller fjern brevmottaker';
    }
    return 'Se eller fjern brevmottakere';
}

const relevanteBehandlingstype = [Behandlingstype.FØRSTEGANGSBEHANDLING, Behandlingstype.REVURDERING];

interface Props {
    åpneModal: () => void;
}

export function LeggTilEllerFjernBrevmottakerePåBehandling({ åpneModal }: Props) {
    const fagsak = useFagsak();
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();

    const erInstitusjonssak = fagsak.fagsakType === FagsakType.INSTITUSJON;
    const erRelevantBehandlingstype = relevanteBehandlingstype.includes(behandling.type);

    if (!erRelevantBehandlingstype || erInstitusjonssak) {
        return null;
    }

    const harBrevmottaker = behandling.brevmottakere.length > 0;

    if (erLesevisning && !harBrevmottaker) {
        return null;
    }

    const label = utledLabel(behandling.brevmottakere, erLesevisning);

    return <ActionMenu.Item onSelect={åpneModal}>{label}</ActionMenu.Item>;
}
