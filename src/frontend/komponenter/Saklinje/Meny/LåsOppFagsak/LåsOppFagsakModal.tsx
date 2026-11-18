import { ModalType } from '@context/ModalContext';
import { useModal } from '@hooks/useModal';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Button, Dialog, Fieldset, InfoCard, Textarea, VStack } from '@navikt/ds-react';
import { FormProvider, useController, useFormContext } from 'react-hook-form';

import {
    LAAS_OPP_FAGSAK_FORM_ID,
    LåsOppFagsakFormFields,
    type LåsOppFagsakFormValues,
    useLåsOppFagsakForm,
} from './useLåsOppFagsakForm';

export function LåsOppFagsakModal() {
    const { erModalÅpen, tittel, lukkModal, bredde } = useModal(ModalType.LAAS_OPP_FAGSAK);
    return (
        <Dialog open={erModalÅpen} onOpenChange={lukkModal}>
            <Dialog.Popup width={bredde} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>{tittel}</Dialog.Title>
                </Dialog.Header>
                <Innhold />
            </Dialog.Popup>
        </Dialog>
    );
}

function Innhold() {
    const { lukkModal } = useModal(ModalType.LAAS_OPP_FAGSAK);
    const { form, onSubmit } = useLåsOppFagsakForm();

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;
    return (
        <>
            <Dialog.Body>
                <VStack gap={'space-16'}>
                    <InfoCard data-color="info">
                        <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                            Skriv en begrunnelse som forklarer hvorfor fagsaken låses opp. Merk at fagsaken vil låses
                            ned igjen etter en periode dersom det ikke opprettes en ny behandling.
                        </InfoCard.Message>
                    </InfoCard>
                    <FormProvider {...form}>
                        <form id={LAAS_OPP_FAGSAK_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
                            <Fieldset legend={'Lås opp fagsak'} hideLegend={true} error={errors?.root?.message}>
                                <BegrunnelseFelt />
                            </Fieldset>
                        </form>
                    </FormProvider>
                </VStack>
            </Dialog.Body>
            <Dialog.Footer>
                <Button
                    form={LAAS_OPP_FAGSAK_FORM_ID}
                    variant={'primary'}
                    size={'small'}
                    type={'submit'}
                    loading={isSubmitting}
                >
                    Bekreft
                </Button>
                <Button variant={'tertiary'} size={'small'} onClick={() => lukkModal()} disabled={isSubmitting}>
                    Avbryt
                </Button>
            </Dialog.Footer>
        </>
    );
}

function BegrunnelseFelt() {
    const { control } = useFormContext<LåsOppFagsakFormValues>();

    const {
        field: { value, onBlur, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: LåsOppFagsakFormFields.BEGRUNNELSE,
        control,
        rules: {
            validate: verdi => {
                const trimmed = verdi.trim();
                if (trimmed.length < 5) {
                    return 'Skriv en begrunnelse med minst 5 tegn.';
                }
                if (trimmed.length > 4000) {
                    return 'Begrunnelsen kan ikke være lengre enn 4000 tegn.';
                }
            },
        },
    });

    return (
        <Textarea
            label={'Begrunnelse'}
            maxLength={4000}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            error={error?.message}
            disabled={isSubmitting}
        />
    );
}
