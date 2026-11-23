import { ModalType } from '@context/ModalContext';
import { useHentFagsaker } from '@hooks/useHentFagsaker';
import { useHentPersonEnkel } from '@hooks/useHentPersonEnkel';
import { useModal } from '@hooks/useModal';
import { Button, Dialog, LocalAlert, Skeleton, VStack } from '@navikt/ds-react';
import { FagsakType } from '@typer/fagsak';

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

interface Props {
    personIdent: string;
}

export function OpprettFagsakModalInnhold({ personIdent }: Props) {
    const { lukkModal } = useModal(ModalType.OPPRETT_FAGSAK);

    const { data: person, isPending: personIsPending, error: personError } = useHentPersonEnkel(personIdent);

    const { data: fagsaker, isPending: fagaskerIsPending, error: fagsakerError } = useHentFagsaker(personIdent);

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

    const onSubmitFeilmelding = OpprettFagsakServerErrors.onSubmitError.lookup(opprettFagsakForm.formState.errors);

    if (personIsPending || fagaskerIsPending) {
        return (
            <>
                <Dialog.Body>
                    <VStack gap={'space-16'}>
                        <Skeleton variant={'rectangle'} width={'100%'} height={'1.65rem'} />
                        <Skeleton variant={'rectangle'} width={'100%'} height={'1.65rem'} />
                        <Skeleton variant={'rectangle'} width={'100%'} height={'1.65rem'} />
                    </VStack>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button key={'avbryt'} variant={'tertiary'} onClick={lukkModal}>
                        Avbryt
                    </Button>
                    <Button key={'Bekreft'} variant={'primary'} disabled={true}>
                        Opprett fagsak
                    </Button>
                </Dialog.Footer>
            </>
        );
    }

    if (personError || fagsakerError) {
        return (
            <>
                <Dialog.Body>
                    <VStack gap={'space-16'}>
                        {personError && (
                            <LocalAlert status="error">
                                <LocalAlert.Header>
                                    <LocalAlert.Title>{personError.message}</LocalAlert.Title>
                                </LocalAlert.Header>
                            </LocalAlert>
                        )}
                        {fagsakerError && (
                            <LocalAlert status="error">
                                <LocalAlert.Header>
                                    <LocalAlert.Title>{fagsakerError.message}</LocalAlert.Title>
                                </LocalAlert.Header>
                            </LocalAlert>
                        )}
                    </VStack>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button key={'avbryt'} variant={'tertiary'} onClick={lukkModal}>
                        Avbryt
                    </Button>
                    <Button key={'Bekreft'} variant={'primary'} disabled={true}>
                        Opprett fagsak
                    </Button>
                </Dialog.Footer>
            </>
        );
    }

    return (
        <FagsakerProvider fagsaker={fagsaker}>
            <Dialog.Body>
                <VStack gap={'space-16'}>
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
                            slettSamhandler={() => opprettFagsakForm.setValue(OpprettFagsakFeltnavn.SAMHANDLER, null)}
                            readOnly={opprettFagsakForm.formState.isSubmitting}
                        />
                    )}
                    {onSubmitFeilmelding && (
                        <LocalAlert status="error">
                            <LocalAlert.Header>
                                <LocalAlert.Title>{onSubmitFeilmelding}</LocalAlert.Title>
                                <LocalAlert.CloseButton
                                    onClick={() =>
                                        opprettFagsakForm.clearErrors(OpprettFagsakServerErrors.onSubmitError.id)
                                    }
                                />
                            </LocalAlert.Header>
                        </LocalAlert>
                    )}
                </VStack>
            </Dialog.Body>
            <Dialog.Footer>
                <Button type={'button'} variant={'tertiary'} onClick={lukkModal}>
                    Avbryt
                </Button>
                <Button
                    type={'submit'}
                    variant={'primary'}
                    form={OPPRETT_FAGSAK_FORM}
                    disabled={opprettFagsakForm.formState.isSubmitting || samhandlerForm.formState.isSubmitting}
                    loading={opprettFagsakForm.formState.isSubmitting}
                >
                    Opprett fagsak
                </Button>
            </Dialog.Footer>
        </FagsakerProvider>
    );
}
