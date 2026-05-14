import { ModalType } from '@context/ModalContext';
import { useModal } from '@hooks/useModal';
import { FormProvider, useController, useFormContext } from 'react-hook-form';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Button, Fieldset, InfoCard, Modal, Textarea, VStack } from '@navikt/ds-react';

import {
    LAAS_OPP_FAGSAK_FORM_ID,
    LåsOppFagsakFormFields,
    type LåsOppFagsakFormValues,
    LåsOppFagsakServerErrors,
    useLåsOppFagsakForm,
} from './useLåsOppFagsakForm';

export function LåsOppFagsakModal() {
    const { erModalÅpen, tittel, lukkModal, bredde } = useModal(ModalType.LAAS_OPP_FAGSAK);
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
    const { lukkModal } = useModal(ModalType.LAAS_OPP_FAGSAK);
    const { form, onSubmit } = useLåsOppFagsakForm();

    const {
        handleSubmit,
        formState: { errors },
    } = form;

    const submitError = LåsOppFagsakServerErrors.onSubmitError.lookup(errors);

    return (
        <>
            <Modal.Body>
                <VStack gap={'space-16'}>
                    <InfoCard data-color="info">
                        <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                            Skriv en begrunnelse som forklarer hvorfor fagsaken låses opp. Merk at fagsaken vil låses
                            ned igjen etter en periode dersom det ikke opprettes en ny behandling.
                        </InfoCard.Message>
                    </InfoCard>
                    <FormProvider {...form}>
                        <form id={LAAS_OPP_FAGSAK_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
                            <Fieldset legend={'Lås opp fagsak'} hideLegend={true} error={submitError}>
                                <BegrunnelseFelt />
                            </Fieldset>
                        </form>
                    </FormProvider>
                </VStack>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    form={LAAS_OPP_FAGSAK_FORM_ID}
                    variant={'primary'}
                    size={'small'}
                    type={'submit'}
                    loading={form.formState.isSubmitting}
                >
                    Bekreft
                </Button>
                <Button
                    variant={'tertiary'}
                    size={'small'}
                    onClick={() => lukkModal()}
                    disabled={form.formState.isSubmitting}
                >
                    Avbryt
                </Button>
            </Modal.Footer>
        </>
    );
}

function BegrunnelseFelt() {
    const { control } = useFormContext<LåsOppFagsakFormValues>();

    const { field, fieldState, formState } = useController({
        name: LåsOppFagsakFormFields.BEGRUNNELSE,
        control,
        rules: {
            validate: verdi => {
                if (verdi.trim().length < 5) {
                    return 'Skriv en begrunnelse med minst 5 tegn.';
                }
            },
        },
    });

    return (
        <Textarea
            label={'Begrunnelse'}
            maxLength={4000}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            error={fieldState.error?.message}
            readOnly={formState.isSubmitting}
            disabled={formState.isSubmitting}
        />
    );
}
