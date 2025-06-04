import React, { useEffect } from 'react';

import { Alert, Button, Modal, Skeleton, VStack } from '@navikt/ds-react';

import { BrukerDetaljer } from './BrukerDetaljer';
import { FagsakerProvider } from './context/FagsakerContext';
import {
    OPPRETT_FAGSAK_FORM,
    OpprettFagsakFeltnavn,
    OpprettFagsakForm,
    OpprettFagsakServerErrors,
} from './form/OpprettFagsakForm';
import { SamhandlerForm } from './form/SamhandlerForm';
import { useOpprettFagsakForm } from './hooks/useOpprettFagsakForm';
import { useSamhandlerForm } from './hooks/useSamhandlerForm';
import { SamhandlerTabell } from './SamhandlerTabell';
import { Undertittel } from './Undertittel';
import { ModalType } from '../../../context/ModalContext';
import { useHentFagsaker } from '../../../hooks/useHentFagsaker';
import { useHentPerson } from '../../../hooks/useHentPerson';
import { useModal } from '../../../hooks/useModal';
import { FagsakType, sjekkHarNormalFagsak } from '../../../typer/fagsak';

interface Props {
    personIdent: string;
}

export function OpprettFagsakModalInnhold({ personIdent }: Props) {
    const { lukkModal, settTittel } = useModal(ModalType.OPPRETT_FAGSAK);

    const {
        data: bruker,
        isPending: erBrukerPending,
        isError: erBrukerError,
        error: brukerError,
    } = useHentPerson({ personIdent });

    const {
        data: fagsaker,
        isPending: erFagsakerPending,
        isError: erFagsakerError,
        error: fagsakerError,
        isSuccess: isFagsakerSuccess,
    } = useHentFagsaker({ personIdent });

    useEffect(() => {
        if (isFagsakerSuccess) {
            const nyTittel = sjekkHarNormalFagsak(fagsaker)
                ? 'Opprett fagsak for institusjon eller enslig mindreårig'
                : 'Opprett fagsak';
            settTittel(nyTittel);
        }
    }, [settTittel, isFagsakerSuccess]);

    const { form: opprettFagsakForm, onSubmit: onSubmitOpprettFagsakForm } = useOpprettFagsakForm({
        personIdent: bruker?.personIdent,
        fagsaker: fagsaker,
    });

    const { form: samhandlerForm, onSubmit: onSubmitSamhandlerForm } = useSamhandlerForm({
        settSamhandler: samhandler => {
            opprettFagsakForm.setValue(OpprettFagsakFeltnavn.SAMHANDLER, samhandler);
        },
    });

    const fagsakType = opprettFagsakForm.watch(OpprettFagsakFeltnavn.FAGSAKTYPE);
    const samhandler = opprettFagsakForm.watch(OpprettFagsakFeltnavn.SAMHANDLER);

    const onSubmitFeilmelding = OpprettFagsakServerErrors.onSubmitError.lookup(
        opprettFagsakForm.formState.errors
    );

    if (erBrukerPending || erFagsakerPending) {
        return (
            <>
                <Modal.Body>
                    <VStack gap={'4'}>
                        <Skeleton variant={'rectangle'} width={'100%'} height={'1.65rem'} />
                        <Skeleton variant={'rectangle'} width={'100%'} height={'1.65rem'} />
                        <Skeleton variant={'rectangle'} width={'100%'} height={'1.65rem'} />
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Button key={'Bekreft'} variant={'primary'} disabled={true}>
                        Opprett fagsak
                    </Button>
                    <Button key={'avbryt'} variant={'tertiary'} onClick={lukkModal}>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </>
        );
    }

    if (erBrukerError || erFagsakerError) {
        return (
            <>
                <Modal.Body>
                    <VStack gap={'4'}>
                        {brukerError && <Alert variant={'error'}>{brukerError.message}</Alert>}
                        {fagsakerError && <Alert variant={'error'}>{fagsakerError.message}</Alert>}
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Button key={'Bekreft'} variant={'primary'} disabled={true}>
                        Opprett fagsak
                    </Button>
                    <Button key={'avbryt'} variant={'tertiary'} onClick={lukkModal}>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </>
        );
    }

    return (
        <FagsakerProvider fagsaker={fagsaker}>
            <Modal.Body>
                <VStack gap={'4'}>
                    <Undertittel fagsaker={fagsaker} />
                    <BrukerDetaljer bruker={bruker} />
                    <OpprettFagsakForm
                        form={opprettFagsakForm}
                        onSubmit={onSubmitOpprettFagsakForm}
                    />
                    {fagsakType === FagsakType.INSTITUSJON && samhandler === null && (
                        <SamhandlerForm form={samhandlerForm} onSubmit={onSubmitSamhandlerForm} />
                    )}
                    {fagsakType === FagsakType.INSTITUSJON && samhandler && (
                        <SamhandlerTabell
                            samhandler={samhandler}
                            slettSamhandler={() =>
                                opprettFagsakForm.setValue(OpprettFagsakFeltnavn.SAMHANDLER, null)
                            }
                        />
                    )}
                    {onSubmitFeilmelding && (
                        <Alert
                            variant={'error'}
                            closeButton={true}
                            onClose={() =>
                                opprettFagsakForm.clearErrors(
                                    OpprettFagsakServerErrors.onSubmitError.id
                                )
                            }
                        >
                            {onSubmitFeilmelding}
                        </Alert>
                    )}
                </VStack>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type={'submit'}
                    variant={'primary'}
                    form={OPPRETT_FAGSAK_FORM}
                    disabled={opprettFagsakForm.formState.isSubmitting}
                    loading={opprettFagsakForm.formState.isSubmitting}
                >
                    Opprett fagsak
                </Button>
                <Button type={'button'} variant={'tertiary'} onClick={lukkModal}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </FagsakerProvider>
    );
}
