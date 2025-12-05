import React from 'react';

import { Link } from '@navikt/ds-react';

import { ModalType } from '../../../../context/ModalContext';
import { useModal } from '../../../../hooks/useModal';
import {
    mutationKey,
    useOpprettForhåndsvisbarBehandlingBrevPdf,
} from '../../../../hooks/useOpprettForhåndsvisbarBehandlingBrevPdf';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import { Brevmal } from '../../../../sider/Fagsak/Behandling/Høyremeny/Hendelsesoversikt/BrevModul/typer';
import { useFagsakContext } from '../../../../sider/Fagsak/FagsakContext';
import { type IManueltBrevRequestPåBehandling } from '../../../../typer/dokument';

function lagRequestPayload(brevmal: Brevmal): IManueltBrevRequestPåBehandling {
    return {
        multiselectVerdier: [],
        brevmal: brevmal,
        barnIBrev: [],
    };
}

export function ForhåndsvisBrevLenke() {
    const { fagsak } = useFagsakContext();
    const { behandling } = useBehandlingContext();
    const { åpneModal } = useModal(ModalType.FORHÅNDSVIS_OPPRETTING_AV_PDF);

    const brevmal = fagsak.institusjon ? Brevmal.HENLEGGE_TRUKKET_SØKNAD_INSTITUSJON : Brevmal.HENLEGGE_TRUKKET_SØKNAD;

    const { mutate, isPending } = useOpprettForhåndsvisbarBehandlingBrevPdf({
        onMutate: () => åpneModal({ mutationKey }),
    });

    function forhåndsvisBrev() {
        if (!isPending) {
            mutate({ behandlingId: behandling.behandlingId, payload: lagRequestPayload(brevmal) });
        }
    }

    return <Link onClick={forhåndsvisBrev}>Forhåndsvis</Link>;
}
