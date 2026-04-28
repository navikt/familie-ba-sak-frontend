import React from 'react';

import { type FieldErrors, FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';

import { Box, Button, HGrid, LocalAlert } from '@navikt/ds-react';

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
    [SamhandlerFeltnavn.ORGNR]: string;
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
                <HGrid columns={2} gap={'space-16'} align={'start'}>
                    <OrganisasjonsnummerFelt />
                    <Box as={'div'} marginBlock={'space-28'}>
                        <Button type={'submit'} variant={'secondary'} size={'small'} loading={isSubmitting}>
                            Hent institusjon
                        </Button>
                    </Box>
                </HGrid>
                {onSubmitFeilmelding && (
                    <LocalAlert status="error">
                        <LocalAlert.Header>
                            <LocalAlert.Title>{onSubmitFeilmelding}</LocalAlert.Title>
                            <LocalAlert.CloseButton
                                onClick={() => clearErrors(SamhandlerFormServerErrors.onSubmitError.id)}
                            />
                        </LocalAlert.Header>
                    </LocalAlert>
                )}
            </form>
        </FormProvider>
    );
}
