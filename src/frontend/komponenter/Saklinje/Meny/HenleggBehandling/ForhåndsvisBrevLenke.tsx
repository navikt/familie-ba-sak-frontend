import { ModalType } from '@context/ModalContext';
import { useBehandling } from '@hooks/useBehandling';
import { useFagsak } from '@hooks/useFagsak';
import { useModal } from '@hooks/useModal';
import {
    mutationKey,
    useOpprettForhåndsvisbarBehandlingBrevPdf,
} from '@hooks/useOpprettForhåndsvisbarBehandlingBrevPdf';
import { Brevmal } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import { type IManueltBrevRequestPåBehandling } from '@typer/dokument';

import { Link } from '@navikt/ds-react';

function lagRequestPayload(brevmal: Brevmal): IManueltBrevRequestPåBehandling {
    return {
        multiselectVerdier: [],
        brevmal: brevmal,
        barnIBrev: [],
    };
}

export function ForhåndsvisBrevLenke() {
    const fagsak = useFagsak();
    const behandling = useBehandling();

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
