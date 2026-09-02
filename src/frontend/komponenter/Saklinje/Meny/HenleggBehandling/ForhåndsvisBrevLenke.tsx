import { useBehandling } from '@hooks/useBehandling';
import { useFagsak } from '@hooks/useFagsak';
import { useOpprettManueltBrevPdf } from '@hooks/useOpprettManueltBrevPdf';
import { XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { Dialog, ErrorMessage, Heading, HStack, Link, Loader } from '@navikt/ds-react';
import { Brevmal } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import type { IManueltBrevRequestPåBehandling } from '@typer/dokument';
import { useState } from 'react';

import Styles from './ForhåndsvisBrevLenke.module.css';

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

    const [visDialog, settVisDialog] = useState(false);

    const {
        data: manueltBrevPdf,
        mutate: opprettManueltBrevPdf,
        isPending: opprettManueltBrevPdfIsPending,
        error: opprettManueltBrevPdfError,
    } = useOpprettManueltBrevPdf();

    function onForhåndsvisBrevClicked() {
        if (opprettManueltBrevPdfIsPending) {
            return;
        }

        const brevmal = fagsak.institusjon
            ? Brevmal.HENLEGGE_TRUKKET_SØKNAD_INSTITUSJON
            : Brevmal.HENLEGGE_TRUKKET_SØKNAD;

        opprettManueltBrevPdf({
            behandlingId: behandling.behandlingId,
            payload: lagRequestPayload(brevmal),
        });

        settVisDialog(true);
    }

    return (
        <>
            <Link onClick={onForhåndsvisBrevClicked}>Forhåndsvis</Link>
            <Dialog open={visDialog} onOpenChange={settVisDialog}>
                <Dialog.Popup width={'max(100rem, 60vw)'} height={'80vh'}>
                    <Dialog.Header>
                        <Dialog.Title>Forhåndsvisning av henleggelsesbrev</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body className={Styles.body}>
                        {opprettManueltBrevPdfIsPending && (
                            <HStack height={'100%'} justify={'center'} align={'center'} gap={'space-8'}>
                                <Loader size={'small'} title={'Laster dokument...'} />
                                <Heading size={'small'} level={'2'}>
                                    Laster dokument...
                                </Heading>
                            </HStack>
                        )}
                        {opprettManueltBrevPdfError && (
                            <HStack height={'100%'} justify={'center'} align={'center'} gap={'space-8'}>
                                <XMarkOctagonFillIcon color={'var(--ax-text-danger-subtle)'} fontSize={'1.2rem'} />
                                <ErrorMessage>{opprettManueltBrevPdfError.message}</ErrorMessage>
                            </HStack>
                        )}
                        {!opprettManueltBrevPdfIsPending && !opprettManueltBrevPdfError && (
                            <iframe className={Styles.iframe} title={'Dokument'} src={manueltBrevPdf} />
                        )}
                    </Dialog.Body>
                </Dialog.Popup>
            </Dialog>
        </>
    );
}
