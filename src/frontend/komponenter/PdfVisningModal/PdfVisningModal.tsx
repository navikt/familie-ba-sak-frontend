import React, { useEffect } from 'react';

import styled from 'styled-components';

import { Modal, Loader, Alert, Heading, VStack, HStack } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

interface IPdfVisningModalProps {
    onRequestClose: () => void;
    onRequestOpen?: () => void;
    pdfdata: Ressurs<string>;
}

const StyledModal = styled(Modal)`
    width: 80%;
    height: 80%;
    overflow: hidden;
    section {
        height: 100%;
        width: 90%;
        margin: 0 auto;
    }
`;

/**
 * @Deprecated - Erstattes av {@link ForhåndsvisPdfModal}.
 */
const PdfVisningModal: React.FC<IPdfVisningModalProps> = ({
    onRequestClose,
    onRequestOpen,
    pdfdata,
}) => {
    useEffect(() => {
        if (onRequestOpen) {
            onRequestOpen();
        }
    }, []);

    return (
        <StyledModal
            className={'pdfvisning-modal'}
            open
            onClose={onRequestClose}
            aria-label={'pdfvisning'}
            header={{ heading: '', closeButton: true }}
            width={'100rem'}
            portal
        >
            <Dokument pdfdata={pdfdata} />
        </StyledModal>
    );
};

const IframePdfVisning = styled.iframe`
    margin: 0 auto;
    height: 100%;
    width: 100%;
`;

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
            return <IframePdfVisning title={'Dokument'} src={pdfdata.data} tabIndex={0} />;
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
        case RessursStatus.IKKE_TILGANG:
            return (
                <Alert
                    variant="error"
                    className={'pdfvisning-modal__document--feil'}
                    children={pdfdata.frontendFeilmelding}
                />
            );
        default:
            return null;
    }
};

export default PdfVisningModal;
