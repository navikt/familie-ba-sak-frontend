import React from 'react';

import { ActionMenu } from '@navikt/ds-react';

import type { SkjemaBrevmottaker } from './useBrevmottakerSkjema';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import { useFagsakContext } from '../../../../sider/Fagsak/FagsakContext';
import { Behandlingstype } from '../../../../typer/behandling';
import { FagsakType } from '../../../../typer/fagsak';

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
    const { fagsak } = useFagsakContext();
    const { behandling, vurderErLesevisning } = useBehandlingContext();

    const erInstitusjonssak = fagsak.fagsakType === FagsakType.INSTITUSJON;
    const erRelevantBehandlingstype = relevanteBehandlingstype.includes(behandling.type);

    if (!erRelevantBehandlingstype || erInstitusjonssak) {
        return null;
    }

    const erLesevisning = vurderErLesevisning();
    const harBrevmottaker = behandling.brevmottakere.length > 0;

    if (erLesevisning && !harBrevmottaker) {
        return null;
    }

    const label = utledLabel(behandling.brevmottakere, erLesevisning);

    return <ActionMenu.Item onSelect={åpneModal}>{label}</ActionMenu.Item>;
}
