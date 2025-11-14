import React from 'react';

import { ActionMenu } from '@navikt/ds-react';

import type { SkjemaBrevmottaker } from './useBrevmottakerSkjema';
import { Behandlingstype } from '../../../../../typer/behandling';
import { FagsakType } from '../../../../../typer/fagsak';
import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';
import { useFagsakContext } from '../../../FagsakContext';

const utledLabel = (brevmottakere: SkjemaBrevmottaker[], erLesevisning: boolean) => {
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
};

const relevanteBehandlingstype = [Behandlingstype.FØRSTEGANGSBEHANDLING, Behandlingstype.REVURDERING];

interface Props {
    åpneModal: () => void;
}

export function LeggTilEllerFjernBrevmottakerePåBehandlingNy({ åpneModal }: Props) {
    const { fagsak } = useFagsakContext();
    const { behandling, vurderErLesevisning } = useBehandlingContext();

    const erLesevisning = vurderErLesevisning();
    const label = utledLabel(behandling.brevmottakere, erLesevisning);
    const erInstitusjonssak = fagsak.fagsakType === FagsakType.INSTITUSJON;
    const harTilgangTilBrevmottakere = !erLesevisning || behandling.brevmottakere.length > 0;
    const erRelevantBehandlingstype = relevanteBehandlingstype.includes(behandling.type);

    if (erInstitusjonssak || !harTilgangTilBrevmottakere || !erRelevantBehandlingstype) {
        return null;
    }

    return <ActionMenu.Item onSelect={åpneModal}>{label}</ActionMenu.Item>;
}
