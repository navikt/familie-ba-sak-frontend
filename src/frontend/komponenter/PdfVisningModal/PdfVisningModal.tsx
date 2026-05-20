import { useEffect } from 'react';

import { Heading, HStack, Loader, LocalAlert, Modal, VStack } from '@navikt/ds-react';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import styles from './PdfVisningModal.module.css';

interface IPdfVisningModalProps {
    onRequestClose: () => void;
    onRequestOpen?: () => void;
    pdfdata: Ressurs<string>;
}

/**
 * @Deprecated - Erstattes av {@link ForhåndsvisPdfModal}.
 */
const PdfVisningModal = ({ onRequestClose, onRequestOpen, pdfdata }: IPdfVisningModalProps) => {
    useEffect(() => {
        if (onRequestOpen) {
            onRequestOpen();
        }
    }, []);

    return (
        <Modal
            className={styles.modal}
            open
            onClose={onRequestClose}
            aria-label={'pdfvisning'}
            header={{ heading: '', closeButton: true }}
            width={'100rem'}
            portal
        >
            <Dokument pdfdata={pdfdata} />
        </Modal>
    );
};

const Dokument = ({ pdfdata }: { pdfdata: Ressurs<string> }) => {
    switch (pdfdata.status) {
        case RessursStatus.HENTER:
            return (
                <HStack justify={'center'} height={'100%'} align={'center'}>
                    <VStack align={'center'}>
                        <Heading size={'small'} level={'2'} children={'Innhenter dokument'} />
                        <Loader size="xlarge" title="Innhenter dokument" />
                    </VStack>
                </HStack>
            );
        case RessursStatus.SUKSESS:
            return <iframe className={styles.iframe} title={'Dokument'} src={pdfdata.data} />;
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
        case RessursStatus.IKKE_TILGANG:
            return (
                <div>
                    <LocalAlert status="error">
                        <LocalAlert.Header>
                            <LocalAlert.Title>{pdfdata.frontendFeilmelding}</LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
                </div>
            );
        default:
            return null;
    }
};

export default PdfVisningModal;
