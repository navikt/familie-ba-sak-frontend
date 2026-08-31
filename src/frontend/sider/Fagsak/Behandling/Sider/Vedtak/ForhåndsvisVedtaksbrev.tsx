import { useBehandling } from '@hooks/useBehandling';
import { useHentEllerOpprettVedtaksbrevPdf } from '@hooks/useHentEllerOpprettVedtaksbrevPdf';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { FileTextIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { Button, Dialog, ErrorMessage, Heading, HStack, Loader } from '@navikt/ds-react';
import { BehandlerRolle, BehandlingSteg, hentStegNummer } from '@typer/behandling';
import { useState } from 'react';

import Styles from './ForhåndsvisVedtaksbrev.module.css';

export function ForhåndsvisVedtaksbrev() {
    const behandling = useBehandling();
    const saksbehandler = useSaksbehandler();

    const [visDialog, settVisDialog] = useState(false);

    const {
        data: vedtaksbrevPdf,
        mutate: hentEllerOpprettVedtaksbrevPdf,
        isPending: hentEllerOpprettVedtaksbrevPdfIsPending,
        error: hentEllerOpprettVedtaksbrevPdfError,
    } = useHentEllerOpprettVedtaksbrevPdf();

    function onVisVedtaksbrevClicked() {
        const vedtakId = behandling.vedtak?.id;

        if (!vedtakId) {
            throw Error(`Fant ikke forventet vedtak for behandling ${behandling.behandlingId}`);
        }

        const erFørBeslutteVedtak = hentStegNummer(behandling.steg) < hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);
        const erPåBeslutteVedtak = hentStegNummer(behandling.steg) === hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

        const erMinstSaksbehandler = saksbehandler.rolle >= BehandlerRolle.SAKSBEHANDLER;
        const erBeslutter = saksbehandler.rolle === BehandlerRolle.BESLUTTER;

        const skalGenerereBrevUnderBehandling = erMinstSaksbehandler && erFørBeslutteVedtak;
        const skalGenerereBrevUnderBeslutning = erBeslutter && erPåBeslutteVedtak;

        const httpMethod = skalGenerereBrevUnderBehandling || skalGenerereBrevUnderBeslutning ? 'POST' : 'GET';

        hentEllerOpprettVedtaksbrevPdf({ httpMethod, vedtakId });

        settVisDialog(true);
    }

    return (
        <div>
            <Button
                variant={'secondary'}
                size={'medium'}
                onClick={onVisVedtaksbrevClicked}
                loading={hentEllerOpprettVedtaksbrevPdfIsPending}
                icon={<FileTextIcon aria-hidden={true} />}
            >
                Vis vedtaksbrev
            </Button>
            <Dialog open={visDialog} onOpenChange={settVisDialog}>
                <Dialog.Popup width={'max(100rem, 60vw)'} height={'80vh'}>
                    <Dialog.Header>
                        <Dialog.Title>Forhåndsvis vedtaksbrev</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body className={Styles.body}>
                        {hentEllerOpprettVedtaksbrevPdfIsPending && (
                            <HStack height={'100%'} justify={'center'} align={'center'} gap={'space-8'}>
                                <Loader size={'small'} title={'Laster vedtaksbrev...'} />
                                <Heading size={'small'} level={'2'}>
                                    Laster vedtaksbrev...
                                </Heading>
                            </HStack>
                        )}
                        {hentEllerOpprettVedtaksbrevPdfError && (
                            <HStack height={'100%'} justify={'center'} align={'center'} gap={'space-8'}>
                                <XMarkOctagonFillIcon color={'var(--ax-text-danger-subtle)'} fontSize={'1.2rem'} />
                                <ErrorMessage>{hentEllerOpprettVedtaksbrevPdfError.message}</ErrorMessage>
                            </HStack>
                        )}
                        {!hentEllerOpprettVedtaksbrevPdfIsPending && !hentEllerOpprettVedtaksbrevPdfError && (
                            <iframe
                                className={Styles.iframe}
                                title={'Vedtaksbrev'}
                                src={`${vedtaksbrevPdf}#zoom=125%`}
                            />
                        )}
                    </Dialog.Body>
                </Dialog.Popup>
            </Dialog>
        </div>
    );
}
