import { useState } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import { useHentEllerOpprettVedtaksbrevPdf } from '@hooks/useHentEllerOpprettVedtaksbrevPdf';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { BehandlerRolle, BehandlingSteg, hentStegNummer } from '@typer/behandling';

import { FileTextIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { Button, ErrorMessage, Heading, HStack, Loader, Modal } from '@navikt/ds-react';

import Styles from './ForhåndsvisVedtaksbrev.module.css';

export function ForhåndsvisVedtaksbrev() {
    const behandling = useBehandling();
    const saksbehandler = useSaksbehandler();

    const [visModal, settVisModal] = useState(false);

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

        const erPåBeslutteVedtak = hentStegNummer(behandling.steg) === hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);
        const erFørBeslutteVedtak = hentStegNummer(behandling.steg) < hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

        const erMinstSaksbehandler = saksbehandler.rolle >= BehandlerRolle.SAKSBEHANDLER;
        const erBeslutter = saksbehandler.rolle === BehandlerRolle.BESLUTTER;

        const skalGenerereBrevUnderBehandling = erMinstSaksbehandler && erFørBeslutteVedtak;
        const skalGenerereBrevUnderBeslutning = erBeslutter && erPåBeslutteVedtak;

        const httpMethod = skalGenerereBrevUnderBehandling || skalGenerereBrevUnderBeslutning ? 'POST' : 'GET';

        hentEllerOpprettVedtaksbrevPdf({ httpMethod, vedtakId });

        settVisModal(true);
    }

    return (
        <>
            <Button
                variant={'secondary'}
                size={'medium'}
                onClick={onVisVedtaksbrevClicked}
                loading={hentEllerOpprettVedtaksbrevPdfIsPending}
                icon={<FileTextIcon aria-hidden={true} />}
            >
                Vis vedtaksbrev
            </Button>
            <Modal
                className={Styles.modal}
                open={visModal}
                onClose={() => settVisModal(false)}
                header={{ heading: 'Forhåndsvis vedtaksbrev', closeButton: true }}
                width={'100rem'}
                portal={true}
            >
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
                    <iframe className={Styles.iframe} title={'Vedtaksbrev'} src={vedtaksbrevPdf} />
                )}
            </Modal>
        </>
    );
}
