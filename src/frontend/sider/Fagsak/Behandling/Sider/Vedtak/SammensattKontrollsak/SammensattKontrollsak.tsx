import { useErLesevisning } from '@hooks/useErLesevisning';
import { FormProvider } from 'react-hook-form';

import { Box, Button, Fieldset, LocalAlert, VStack } from '@navikt/ds-react';

import { FritekstFelt } from './FritekstFelt';
import { useSammensattKontrollsakForm } from './useSammensattKontrollsakForm';

export function SammensattKontrollsak() {
    const erLesevisning = useErLesevisning();
    const { form, onSubmit } = useSammensattKontrollsakForm();
    const {
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
    } = form;

    return (
        <Box marginBlock={'space-0 space-24'}>
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap={'space-20'}>
                        <Fieldset legend={'Fritekst til vedtaksbrev'} hideLegend={true} error={errors.root?.message}>
                            <FritekstFelt erLesevisning={erLesevisning} />
                        </Fieldset>
                        {isDirty && (
                            <LocalAlert status={'warning'} size={'small'}>
                                <LocalAlert.Header>
                                    <LocalAlert.Title>
                                        Du har ikke lagret dine siste endringer, og vil miste disse om du forlater siden
                                        uten å lagre.
                                    </LocalAlert.Title>
                                </LocalAlert.Header>
                            </LocalAlert>
                        )}
                        {!erLesevisning && (
                            <Box>
                                <Button type={'submit'} variant={'primary'} size={'small'} loading={isSubmitting}>
                                    Lagre
                                </Button>
                            </Box>
                        )}
                    </VStack>
                </form>
            </FormProvider>
        </Box>
    );
}
