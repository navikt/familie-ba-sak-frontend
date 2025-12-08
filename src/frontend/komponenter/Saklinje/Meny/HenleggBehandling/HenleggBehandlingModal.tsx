import React from 'react';

import { FormProvider } from 'react-hook-form';

import { Alert, BodyLong, Button, Fieldset, Modal, VStack } from '@navikt/ds-react';

import { BegrunnelseFelt } from './BegrunnelseFelt';
import { ForhåndsvisBrevLenke } from './ForhåndsvisBrevLenke';
import {
    HENLEGG_BEHANDLING_FORM_ID,
    HenleggBehandlingFormFields,
    HenleggBehandlingServerErrors,
    useHenleggBehandlingForm,
} from './useHenleggBehandlingForm';
import { ÅrsakFelt } from './ÅrsakFelt';
import { ModalType } from '../../../../context/ModalContext';
import { useModal } from '../../../../hooks/useModal';
import { HenleggÅrsak } from '../../../../typer/behandling';

export function HenleggBehandlingModal() {
    const { erModalÅpen, tittel, lukkModal, bredde } = useModal(ModalType.HENLEGG_BEHANDLING);
    return (
        <Modal
            open={erModalÅpen}
            width={bredde}
            onClose={lukkModal}
            header={{ heading: tittel, size: 'medium' }}
            portal={true}
        >
            {erModalÅpen && <Innhold />}
        </Modal>
    );
}

function Innhold() {
    const { lukkModal } = useModal(ModalType.HENLEGG_BEHANDLING);
    const { form, onSubmit } = useHenleggBehandlingForm();

    const {
        watch,
        handleSubmit,
        formState: { errors },
    } = form;

    const valgtÅrsak = watch(HenleggBehandlingFormFields.ÅRSAK);

    const submitError = HenleggBehandlingServerErrors.onSubmitError.lookup(errors);

    return (
        <>
            <Modal.Body>
                <VStack gap={'4'}>
                    <Alert variant={'info'}>
                        <BodyLong>
                            Skriv en begrunnelse som forklarer hvorfor behandlingen henlegges. Dette kan gi andre
                            saksbehandlere bedre grunnlag hvis de gjenopptar saken, og kan gjøre det lettere for teamet
                            å feilsøke.
                        </BodyLong>
                    </Alert>
                    <FormProvider {...form}>
                        <form id={HENLEGG_BEHANDLING_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
                            <Fieldset legend={'Henlegg behandling'} hideLegend={true} error={submitError}>
                                <VStack gap={'4'}>
                                    <ÅrsakFelt />
                                    <BegrunnelseFelt />
                                </VStack>
                            </Fieldset>
                        </form>
                    </FormProvider>
                </VStack>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    form={HENLEGG_BEHANDLING_FORM_ID}
                    variant={'primary'}
                    size={'small'}
                    type={'submit'}
                    loading={form.formState.isSubmitting}
                >
                    {valgtÅrsak === HenleggÅrsak.SØKNAD_TRUKKET ? 'Bekreft og send brev' : 'Bekreft'}
                </Button>
                <Button variant={'tertiary'} size={'small'} onClick={() => lukkModal()}>
                    Avbryt
                </Button>
                {valgtÅrsak === HenleggÅrsak.SØKNAD_TRUKKET && <ForhåndsvisBrevLenke />}
            </Modal.Footer>
        </>
    );
}
