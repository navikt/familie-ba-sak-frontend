import React from 'react';

import { Alert, Button, Modal, Skeleton, VStack } from '@navikt/ds-react';

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
import { PersonDetaljer } from './PersonDetaljer';
import { SamhandlerTabell } from './SamhandlerTabell';
import { Undertittel } from './Undertittel';
import { ModalType } from '../../../context/ModalContext';
import { useHentFagsaker } from '../../../hooks/useHentFagsaker';
import { useHentPersonEnkel } from '../../../hooks/useHentPersonEnkel';
import { useModal } from '../../../hooks/useModal';
import { FagsakType } from '../../../typer/fagsak';

interface Props {
    personIdent: string;
}

export function OpprettFagsakModalInnhold({ personIdent }: Props) {
    const { lukkModal } = useModal(ModalType.OPPRETT_FAGSAK);

    const {
        data: person,
        isPending: erPersonPending,
        isError: erPersonError,
        error: personError,
    } = useHentPersonEnkel({ personIdent });

    const {
        data: fagsaker,
        isPending: erFagsakerPending,
        isError: erFagsakerError,
        error: fagsakerError,
    } = useHentFagsaker({ personIdent });

    const { form: opprettFagsakForm, onSubmit: onSubmitOpprettFagsakForm } = useOpprettFagsakForm({
        personIdent: person?.personIdent,
        fagsaker: fagsaker,
    });

    const { form: samhandlerForm, onSubmit: onSubmitSamhandlerForm } = useSamhandlerForm({
        settSamhandler: samhandler => {
            opprettFagsakForm.setValue(OpprettFagsakFeltnavn.SAMHANDLER, samhandler);
        },
    });

    const fagsaktype = opprettFagsakForm.watch(OpprettFagsakFeltnavn.FAGSAKTYPE);
    const samhandler = opprettFagsakForm.watch(OpprettFagsakFeltnavn.SAMHANDLER);

    const onSubmitFeilmelding = OpprettFagsakServerErrors.onSubmitError.lookup(
        opprettFagsakForm.formState.errors
    );

    if (erPersonPending || erFagsakerPending) {
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

    if (erPersonError || erFagsakerError) {
        return (
            <>
                <Modal.Body>
                    <VStack gap={'4'}>
                        {personError && <Alert variant={'error'}>{personError.message}</Alert>}
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
                    <PersonDetaljer person={person} />
                    <OpprettFagsakForm
                        form={opprettFagsakForm}
                        onSubmit={onSubmitOpprettFagsakForm}
                        readOnly={samhandlerForm.formState.isSubmitting}
                    />
                    {fagsaktype === FagsakType.INSTITUSJON && samhandler === null && (
                        <SamhandlerForm form={samhandlerForm} onSubmit={onSubmitSamhandlerForm} />
                    )}
                    {fagsaktype === FagsakType.INSTITUSJON && samhandler && (
                        <SamhandlerTabell
                            samhandler={samhandler}
                            slettSamhandler={() =>
                                opprettFagsakForm.setValue(OpprettFagsakFeltnavn.SAMHANDLER, null)
                            }
                            readOnly={opprettFagsakForm.formState.isSubmitting}
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
                    disabled={
                        opprettFagsakForm.formState.isSubmitting ||
                        samhandlerForm.formState.isSubmitting
                    }
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
