import { BodyShort, Box, Button, Dialog, Fieldset, VStack } from '@navikt/ds-react';
import { FormProvider } from 'react-hook-form';

import { FristFelt } from './FristFelt';
import { SETT_PÅ_VENT_FORM_ID, useSettPåVentSkjema } from './useSettPåVentSkjema';
import { ÅrsakFelt } from './ÅrsakFelt';

interface Props {
    lukkModal: () => void;
}

export function SettBehandlingPåVentModal({ lukkModal }: Props) {
    const { form, onSubmit, erBehandlingAlleredePåVent } = useSettPåVentSkjema({ lukkModal });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    const tittel = erBehandlingAlleredePåVent ? 'Endre ventende behandling' : 'Sett behandling på vent';

    return (
        <Dialog open onOpenChange={lukkModal}>
            <Dialog.Popup width={'35rem'} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>{tittel}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <Fieldset
                        legend={'Sett behandling på vent'}
                        hideLegend
                        errorPropagation={false}
                        error={errors.root?.message}
                    >
                        {erBehandlingAlleredePåVent && (
                            <Box marginBlock={'space-8 space-40'}>
                                <BodyShort>Behandlingen er satt på vent.</BodyShort>
                            </Box>
                        )}
                        <FormProvider {...form}>
                            <form id={SETT_PÅ_VENT_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
                                <VStack gap={'space-32'}>
                                    <FristFelt />
                                    <ÅrsakFelt />
                                </VStack>
                            </form>
                        </FormProvider>
                    </Fieldset>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        form={SETT_PÅ_VENT_FORM_ID}
                        type={'submit'}
                        variant={'primary'}
                        size={'medium'}
                        loading={isSubmitting}
                    >
                        {erBehandlingAlleredePåVent ? 'Oppdater' : 'Bekreft'}
                    </Button>
                    <Button variant={'tertiary'} size={'medium'} onClick={lukkModal}>
                        Avbryt
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
}
