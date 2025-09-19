import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Textarea } from '@navikt/ds-react';

import { HenleggBehandlingFormFields, type HenleggBehandlingFormValues } from './useHenleggBehandlingForm';

export function BegrunnelseFelt() {
    const { control } = useFormContext<HenleggBehandlingFormValues>();

    const { field, fieldState, formState } = useController({
        name: HenleggBehandlingFormFields.BEGRUNNELSE,
        control,
        rules: {
            validate: verdi => {
                if (verdi.length < 5) {
                    return 'Skriv en begrunnelse som forklarer henleggelsen med minst 5 tegn.';
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
        />
    );
}
