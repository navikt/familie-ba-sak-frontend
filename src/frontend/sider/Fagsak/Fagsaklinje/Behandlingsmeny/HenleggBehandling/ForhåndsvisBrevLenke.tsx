import React from 'react';

import { Link, Loader } from '@navikt/ds-react';

import { ModalType } from '../../../../../context/ModalContext';
import { useHentForhåndsvisBehandlingBrev } from '../../../../../hooks/useHentForhåndsvisBehandlingBrev';
import { useModal } from '../../../../../hooks/useModal';
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

    const { refetch, isFetching } = useHentForhåndsvisBehandlingBrev({
        behandlingId: behandling.behandlingId,
        payload: lagRequestPayload(brevmal),
        onSuccess: blob => åpneForhåndsvisPdfModal({ blob }),
        onError: error => åpneFeilmeldingModal({ feilmelding: error.message }),
        enabled: false,
    });

    function forhåndsvisBrev() {
        if (!isFetching) {
            refetch();
        }
    }

    return (
        <Link onClick={forhåndsvisBrev}>Forhåndsvis {isFetching && <Loader size={'small'} />}</Link>
    );
}
