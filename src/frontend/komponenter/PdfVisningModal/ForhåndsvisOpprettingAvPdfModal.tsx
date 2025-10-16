import React from 'react';

import { type MutationKey, useMutationState } from '@tanstack/react-query';
import styled from 'styled-components';

import { Alert, Heading, HStack, Loader, Modal, VStack } from '@navikt/ds-react';

import { ModalType } from '../../context/ModalContext';
import { useModal } from '../../hooks/useModal';

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

export function ForhåndsvisOpprettingAvPdfModal() {
    const { args, erModalÅpen, lukkModal, tittel, bredde } = useModal(ModalType.FORHÅNDSVIS_OPPRETTING_AV_PDF);

    const mutationKey = args?.mutationKey ?? [];

    return (
        <StyledModal
            open={erModalÅpen}
            onClose={lukkModal}
            header={{ heading: tittel, closeButton: true }}
            width={bredde}
            portal={true}
        >
            {erModalÅpen && <Innhold mutationKey={mutationKey} />}
        </StyledModal>
    );
}

function Innhold({ mutationKey }: { mutationKey: MutationKey }) {
    const states = useMutationState({
        filters: { mutationKey },
        select: mutation => ({
            data: mutation.state.data as Blob,
            isPending: mutation.state.status === 'pending',
            error: mutation.state.error,
        }),
    });

    const state = states[states.length - 1];

    if (!state || state.error) {
        return <Alert variant={'error'}>{state.error?.message ?? 'En ukjent feil oppstod.'}</Alert>;
    }

    if (state.isPending) {
        return (
            <HStack justify={'center'} height={'100%'} align={'center'}>
                <VStack align={'center'}>
                    <Heading size={'small'} level={'2'}>
                        Innhenter dokument
                    </Heading>
                    <Loader size={'xlarge'} title={'Innhenter dokument'} />
                </VStack>
            </HStack>
        );
    }

    return <iframe title={'Dokument'} height={'100%'} width={'100%'} src={window.URL.createObjectURL(state.data)} />;
}
