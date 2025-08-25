import React from 'react';

import { Link } from '@navikt/ds-react';

import type { FamilieAxiosRequestConfig } from '../../../../../context/AppContext';
import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';
import { Brevmal } from '../../../Behandling/Høyremeny/Hendelsesoversikt/BrevModul/typer';
import { useFagsakContext } from '../../../FagsakContext';

interface Props {
    hentForhåndsvisning: <T>(familieAxiosRequestConfig: FamilieAxiosRequestConfig<T>) => void;
}

export function ForhåndsvisBrevLenke({ hentForhåndsvisning }: Props) {
    const { fagsak } = useFagsakContext();
    const { behandling } = useBehandlingContext();

    const brevmalSomSkalBrukes = fagsak.institusjon
        ? Brevmal.HENLEGGE_TRUKKET_SØKNAD_INSTITUSJON
        : Brevmal.HENLEGGE_TRUKKET_SØKNAD;

    function onClick() {
        hentForhåndsvisning({
            method: 'POST',
            data: {
                multiselectVerdier: [],
                brevmal: brevmalSomSkalBrukes,
                barnIBrev: [],
            },
            url: `/familie-ba-sak/api/dokument/forhaandsvis-brev/${behandling.behandlingId}`,
        });
    }

    return (
        <Link href={'#'} onClick={onClick}>
            Forhåndsvis
        </Link>
    );
}
