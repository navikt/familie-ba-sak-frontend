import React from 'react';

import { type FieldErrors, FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';

import { Alert, Box, Button, HGrid } from '@navikt/ds-react';

import { OrganisasjonsnummerFelt } from '../felt/OrganisasjonsnummerFelt';

export const SamhandlerFormServerErrors: Record<
    'onSubmitError',
    {
        id: `root.${string}`;
        lookup: (errors: FieldErrors<SamhandlerFormValues>) => string | undefined;
    }
> = {
    onSubmitError: {
        id: 'root.onSubmitError',
        lookup: errors => errors?.root?.onSubmitError?.message,
    },
};

export interface SamhandlerFormValues {
    [SamhandlerFeltnavn.ORGNR]: '';
}

export enum SamhandlerFeltnavn {
    ORGNR = 'orgnr',
}

interface Props {
    form: UseFormReturn<SamhandlerFormValues>;
    onSubmit: SubmitHandler<SamhandlerFormValues>;
}

export function SamhandlerForm({ form, onSubmit }: Props) {
    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        clearErrors,
    } = form;

    const onSubmitFeilmelding = SamhandlerFormServerErrors.onSubmitError.lookup(errors);

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <HGrid columns={2} gap={'4'} align={'start'}>
                    <OrganisasjonsnummerFelt />
                    <Box as={'div'} marginBlock={'space-28'}>
                        <Button type={'submit'} variant={'secondary'} size={'small'} loading={isSubmitting}>
                            Hent institusjon
                        </Button>
                    </Box>
                </HGrid>
                {onSubmitFeilmelding && (
                    <Alert
                        variant={'error'}
                        closeButton={true}
                        onClose={() => clearErrors(SamhandlerFormServerErrors.onSubmitError.id)}
                    >
                        {onSubmitFeilmelding}
                    </Alert>
                )}
            </form>
        </FormProvider>
    );
}
