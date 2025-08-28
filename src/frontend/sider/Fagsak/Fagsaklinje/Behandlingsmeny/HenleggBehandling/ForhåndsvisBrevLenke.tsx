import React from 'react';

import { HStack, Link, Loader } from '@navikt/ds-react';

import { ModalType } from '../../../../../context/ModalContext';
import { useModal } from '../../../../../hooks/useModal';
import { useOpprettForhåndsvisbarBehandlingBrevPdf } from '../../../../../hooks/useOpprettForhåndsvisbarBehandlingBrevPdf';
import { type IManueltBrevRequestPåBehandling } from '../../../../../typer/dokument';
import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';
import { Brevmal } from '../../../Behandling/Høyremeny/Hendelsesoversikt/BrevModul/typer';
import { useFagsakContext } from '../../../FagsakContext';

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
    const { åpneModal: åpneForhåndsvisPdfModal } = useModal(ModalType.FORHÅNDSVIS_PDF);
    const { åpneModal: åpneFeilmeldingModal } = useModal(ModalType.FEILMELDING);

    const brevmal = fagsak.institusjon
        ? Brevmal.HENLEGGE_TRUKKET_SØKNAD_INSTITUSJON
        : Brevmal.HENLEGGE_TRUKKET_SØKNAD;

    const { mutate, isPending } = useOpprettForhåndsvisbarBehandlingBrevPdf({
        onSuccess: blob => åpneForhåndsvisPdfModal({ blob }),
        onError: error => åpneFeilmeldingModal({ feilmelding: error.message }),
    });

    function forhåndsvisBrev() {
        if (!isPending) {
            mutate({ behandlingId: behandling.behandlingId, payload: lagRequestPayload(brevmal) });
        }
    }

    return (
        <Link onClick={forhåndsvisBrev}>
            <HStack gap={'space-8'}>
                Forhåndsvis
                {isPending && <Loader size={'small'} />}
            </HStack>
        </Link>
    );
}
