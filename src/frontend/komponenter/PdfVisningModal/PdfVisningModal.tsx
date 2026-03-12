import React, { useEffect } from 'react';

import { Alert, Heading, HStack, Loader, Modal, VStack } from '@navikt/ds-react';
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
const PdfVisningModal: React.FC<IPdfVisningModalProps> = ({ onRequestClose, onRequestOpen, pdfdata }) => {
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

const Dokument: React.FC<{ pdfdata: Ressurs<string> }> = ({ pdfdata }) => {
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
            return <iframe className={styles.iframe} title={'Dokument'} src={pdfdata.data} />; // tabIndex={0} />;
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
        case RessursStatus.IKKE_TILGANG:
            return <Alert variant="error" children={pdfdata.frontendFeilmelding} />;
        default:
            return null;
    }
};

export default PdfVisningModal;
