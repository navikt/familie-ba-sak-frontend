import React, { useState } from 'react';

import { Link } from '@navikt/ds-react';

import { useOpprettForhåndsvisbarBehandlingBrevPdf } from '../../../../../hooks/useOpprettForhåndsvisbarBehandlingBrevPdf';
import { ForhåndsvisPdfModal } from '../../../../../komponenter/PdfVisningModal/ForhåndsvisPdfModal';
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

    const brevmal = fagsak.institusjon
        ? Brevmal.HENLEGGE_TRUKKET_SØKNAD_INSTITUSJON
        : Brevmal.HENLEGGE_TRUKKET_SØKNAD;

    const [visForhåndsvisPdfModal, settVisForhåndsvisPdfModal] = useState(false);

    const {
        mutate: opprettPdf,
        data: pdf,
        isPending: isOpprettPdfPending,
        error: opprettPdfError,
    } = useOpprettForhåndsvisbarBehandlingBrevPdf();

    function forhåndsvisBrev() {
        if (!isOpprettPdfPending) {
            settVisForhåndsvisPdfModal(true);
            opprettPdf({
                behandlingId: behandling.behandlingId,
                payload: lagRequestPayload(brevmal),
            });
        }
    }

    return (
        <>
            {visForhåndsvisPdfModal && (
                <ForhåndsvisPdfModal
                    pdf={pdf}
                    laster={isOpprettPdfPending}
                    error={opprettPdfError}
                    lukk={() => settVisForhåndsvisPdfModal(false)}
                />
            )}
            <Link onClick={forhåndsvisBrev}>Forhåndsvis</Link>
        </>
    );
}
