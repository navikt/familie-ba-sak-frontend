import { type MutationKey, useMutationState } from '@tanstack/react-query';

import { Heading, HStack, Loader, LocalAlert, Modal, VStack } from '@navikt/ds-react';

import styles from './ForhåndsvisOpprettingAvPdfModal.module.css';
import { ModalType } from '../../context/ModalContext';
import { useModal } from '../../hooks/useModal';

export function ForhåndsvisOpprettingAvPdfModal() {
    const { args, erModalÅpen, lukkModal, tittel, bredde } = useModal(ModalType.FORHÅNDSVIS_OPPRETTING_AV_PDF);

    const mutationKey = args?.mutationKey ?? [];

    return (
        <Modal
            className={styles.modal}
            open={erModalÅpen}
            onClose={lukkModal}
            header={{ heading: tittel, closeButton: true }}
            width={bredde}
            portal={true}
        >
            {erModalÅpen && <Innhold mutationKey={mutationKey} />}
        </Modal>
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
        return (
            <div>
                <LocalAlert status="error">
                    <LocalAlert.Header>
                        <LocalAlert.Title>{state?.error?.message ?? 'En ukjent feil oppstod.'}</LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            </div>
        );
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
