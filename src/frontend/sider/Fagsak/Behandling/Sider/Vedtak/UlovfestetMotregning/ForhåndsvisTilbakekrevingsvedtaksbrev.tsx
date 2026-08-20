import { useBehandling } from '@hooks/useBehandling';
import { useHentEllerOpprettTilbakekrevingsvedtaksbrevPdf } from '@hooks/useHentEllerOpprettTilbakekrevingsvedtaksbrevPdf';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { FileTextIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { Button, Dialog, ErrorMessage, Heading, HStack, Loader } from '@navikt/ds-react';
import { BehandlerRolle, BehandlingSteg, hentStegNummer } from '@typer/behandling';
import { useState } from 'react';

import Styles from './ForhåndsvisTilbakekrevingsvedtaksbrev.module.css';

export function ForhåndsvisTilbakekrevingsvedtaksbrev() {
    const behandling = useBehandling();
    const saksbehandler = useSaksbehandler();

    const [visDialog, settVisDialog] = useState(false);

    const {
        data: tilbakekrevingsvedtaksbrevPdf,
        mutate: hentEllerOpprettTilbakekrevingsvedtaksbrevPdf,
        isPending: hentEllerOpprettTilbakekrevingsvedtaksbrevPdfIsPending,
        error: hentEllerOpprettTilbakekrevingsvedtaksbrevPdfError,
    } = useHentEllerOpprettTilbakekrevingsvedtaksbrevPdf();

    function onForhåndsvisTilbakekrevingsvedtaksbrevClicked() {
        const { behandlingId, steg } = behandling;

        const erMinstSaksbehandler = saksbehandler.rolle >= BehandlerRolle.SAKSBEHANDLER;
        const erBeslutter = saksbehandler.rolle === BehandlerRolle.BESLUTTER;

        const erFørBeslutteVedtak = hentStegNummer(steg) < hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);
        const erPåBeslutteVedtak = hentStegNummer(steg) === hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

        const skalGenerereBrevUnderBehandling = erMinstSaksbehandler && erFørBeslutteVedtak;
        const skalGenerereBrevUnderBeslutning = erBeslutter && erPåBeslutteVedtak;

        const httpMethod = skalGenerereBrevUnderBehandling || skalGenerereBrevUnderBeslutning ? 'POST' : 'GET';

        hentEllerOpprettTilbakekrevingsvedtaksbrevPdf({ httpMethod, behandlingId });

        settVisDialog(true);
    }

    return (
        <>
            <Button
                variant={'secondary'}
                size={'medium'}
                onClick={onForhåndsvisTilbakekrevingsvedtaksbrevClicked}
                loading={hentEllerOpprettTilbakekrevingsvedtaksbrevPdfIsPending}
                icon={<FileTextIcon aria-hidden={true} />}
            >
                Vis tilbakekrevingsvedtaksbrev
            </Button>
            <Dialog open={visDialog} onOpenChange={settVisDialog}>
                <Dialog.Popup width={'max(100rem, 60vw)'} height={'80vh'}>
                    <Dialog.Header>
                        <Dialog.Title>Forhåndsvis tilbakekrevingsvedtaksbrev</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body className={Styles.body}>
                        {hentEllerOpprettTilbakekrevingsvedtaksbrevPdfIsPending && (
                            <HStack height={'100%'} justify={'center'} align={'center'} gap={'space-8'}>
                                <Loader size={'small'} title={'Laster Tilbakekrevingsvedtaksbrev...'} />
                                <Heading size={'small'} level={'2'}>
                                    Laster Tilbakekrevingsvedtaksbrev...
                                </Heading>
                            </HStack>
                        )}
                        {hentEllerOpprettTilbakekrevingsvedtaksbrevPdfError && (
                            <HStack height={'100%'} justify={'center'} align={'center'} gap={'space-8'}>
                                <XMarkOctagonFillIcon color={'var(--ax-text-danger-subtle)'} fontSize={'1.2rem'} />
                                <ErrorMessage>
                                    {hentEllerOpprettTilbakekrevingsvedtaksbrevPdfError.message}
                                </ErrorMessage>
                            </HStack>
                        )}
                        {!hentEllerOpprettTilbakekrevingsvedtaksbrevPdfIsPending &&
                            !hentEllerOpprettTilbakekrevingsvedtaksbrevPdfError && (
                                <iframe
                                    className={Styles.iframe}
                                    title={'Tilbakekrevingsvedtaksbrev'}
                                    src={tilbakekrevingsvedtaksbrevPdf}
                                />
                            )}
                    </Dialog.Body>
                </Dialog.Popup>
            </Dialog>
        </>
    );
}
