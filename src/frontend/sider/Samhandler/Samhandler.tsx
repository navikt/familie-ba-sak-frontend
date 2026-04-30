import { useEffect, useState } from 'react';

import { FormProvider } from 'react-hook-form';
import { useLocation } from 'react-router';

import { Box, Button, Fieldset, Heading, HStack } from '@navikt/ds-react';

import { OrganisasjonsnummerFelt } from './OrganisasjonsnummerFelt';
import { SamhandlerFeltnavn, useSamhandlerForm } from './useSamhandlerForm';
import type { ISamhandlerInfo } from '../../typer/samhandler';

export const Samhandler = () => {
    const location = useLocation();
    const [samhandler, setSamhandler] = useState<ISamhandlerInfo | null>(null);

    const { form, onSubmit } = useSamhandlerForm({
        settSamhandler: samhandler => {
            setSamhandler(samhandler);
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        setValue,
    } = form;

    useEffect(() => {
        if (location.state) {
            const state = location.state as { bruker: string };
            setValue(SamhandlerFeltnavn.ORGNR, state.bruker);
            handleSubmit(onSubmit)();
        }
    }, []);

    return (
        <Box height={'calc(100vh - 50px)'} padding={'space-16'} overflow={'auto'}>
            <Heading size={'large'} level={'1'}>
                Søk samhandler
            </Heading>
            <FormProvider {...form}>
                <form
                    onSubmit={e => {
                        handleSubmit(onSubmit)(e);
                        if (e.target.value !== samhandler?.orgNummer) {
                            setSamhandler(null);
                        }
                    }}
                >
                    <HStack marginBlock={'space-32'} align={'start'}>
                        <Fieldset error={errors.root?.message} legend="Søk samhandler" hideLegend>
                            <OrganisasjonsnummerFelt />
                        </Fieldset>
                        <Box marginBlock={'space-32 auto'} marginInline={'space-16 auto'} height={'3rem'}>
                            <Button variant={'primary'} type={'submit'} loading={isSubmitting}>
                                Hent samhandler
                            </Button>
                        </Box>
                    </HStack>
                </form>
            </FormProvider>

            {samhandler !== null && (
                <Heading size={'large'}>
                    {samhandler.tssEksternId} {samhandler.navn} <br />
                    {samhandler.adresser[0].adresseType} {samhandler.adresser[0].postSted}
                </Heading>
            )}
        </Box>
    );
};
