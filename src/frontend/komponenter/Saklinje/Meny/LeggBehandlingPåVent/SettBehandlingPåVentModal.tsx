import { FormProvider } from 'react-hook-form';

import { BodyShort, Box, Button, Fieldset, Modal, VStack } from '@navikt/ds-react';

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
        <Modal open onClose={lukkModal} width={'35rem'} header={{ heading: tittel, size: 'small' }} portal>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
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
            </Modal.Footer>
        </Modal>
    );
}
