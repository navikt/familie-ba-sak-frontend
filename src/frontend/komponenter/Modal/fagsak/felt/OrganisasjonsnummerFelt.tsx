import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { TextField } from '@navikt/ds-react';

import { SamhandlerFeltnavn, type SamhandlerFormValues } from '../form/SamhandlerForm';

function sjekkErGyldigOrgnr(orgnr: string) {
    return /^\d{9}$/.test(orgnr);
}

export function OrganisasjonsnummerFelt() {
    const { control } = useFormContext<SamhandlerFormValues>();

    const { field, fieldState, formState } = useController({
        name: SamhandlerFeltnavn.ORGNR,
        control,
        rules: {
            required: `Organisasjonsnummer er påkrevd.`,
            validate: value => {
                if (!sjekkErGyldigOrgnr(value)) {
                    return 'Organisasjonsnummer må være 9 siffer.';
                }
            },
        },
    });

    return (
        <TextField
            label={'Organisasjonsnummer'}
            size={'small'}
            name={field.name}
            value={field.value}
            ref={field.ref}
            onBlur={field.onBlur}
            onChange={field.onChange}
            onKeyDown={event => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    field.onChange(field.value);
                }
            }}
            error={fieldState.error?.message}
            readOnly={formState.isSubmitting}
        />
    );
}
