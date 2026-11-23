import { ModalType } from '@context/ModalContext';
import { useModal } from '@hooks/useModal';
import { Dialog, Heading, HStack, Loader, LocalAlert, VStack } from '@navikt/ds-react';
import { type MutationKey, useMutationState } from '@tanstack/react-query';
import styles from './ForhåndsvisOpprettingAvPdfModal.module.css';

export function ForhåndsvisOpprettingAvPdfModal() {
    const { args, erModalÅpen, lukkModal, tittel, bredde } = useModal(ModalType.FORHÅNDSVIS_OPPRETTING_AV_PDF);

    const mutationKey = args?.mutationKey ?? [];

    return (
        <Dialog open={erModalÅpen} onOpenChange={lukkModal}>
            <Dialog.Popup className={styles.modal} width={bredde} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>{tittel}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body className={styles.body}>
                    {erModalÅpen && <Innhold mutationKey={mutationKey} />}
                </Dialog.Body>
            </Dialog.Popup>
        </Dialog>
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
