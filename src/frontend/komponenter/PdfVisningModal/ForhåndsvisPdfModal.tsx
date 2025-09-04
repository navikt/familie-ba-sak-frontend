import React from 'react';

import styled from 'styled-components';

import { Alert, Heading, HStack, Loader, Modal, VStack } from '@navikt/ds-react';

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

interface Props {
    pdf?: Blob;
    laster?: boolean;
    error?: Error | null;
    lukk: () => void;
}

export function ForhåndsvisPdfModal({ pdf, laster, error, lukk }: Props) {
    if (laster) {
        return (
            <StyledModal
                open={true}
                onClose={lukk}
                header={{ heading: 'Forhåndsvis PDF', closeButton: true }}
                width={'1000rem'}
                portal={true}
            >
                <HStack justify={'center'} height={'100%'} align={'center'}>
                    <VStack align={'center'}>
                        <Heading size={'small'} level={'2'}>
                            Innhenter dokument
                        </Heading>
                        <Loader size={'xlarge'} title={'Innhenter dokument'} />
                    </VStack>
                </HStack>
            </StyledModal>
        );
    }

    if (error || pdf === undefined) {
        return (
            <StyledModal
                open={true}
                onClose={lukk}
                header={{ heading: 'Forhåndsvis PDF', closeButton: true }}
                width={'1000rem'}
                portal={true}
            >
                <Alert variant={'error'}>{error?.message ?? 'En ukjent feil oppstod.'}</Alert>
            </StyledModal>
        );
    }

    return (
        <StyledModal
            open={true}
            onClose={lukk}
            header={{ heading: 'Forhåndsvis PDF', closeButton: true }}
            width={'1000rem'}
            portal={true}
        >
            <iframe
                title={'Dokument'}
                height={'100%'}
                width={'100%'}
                src={window.URL.createObjectURL(pdf)}
            />
        </StyledModal>
    );
}
