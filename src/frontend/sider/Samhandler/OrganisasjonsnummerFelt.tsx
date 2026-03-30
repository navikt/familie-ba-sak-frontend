import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { TextField } from '@navikt/ds-react';

import { SamhandlerFeltnavn, type SamhandlerFormValues } from './useSamhandlerForm';

function sjekkErGyldigOrgnr(orgnr: string) {
    return /^\d{9}$/.test(orgnr);
}

export function OrganisasjonsnummerFelt() {
    const { control } = useFormContext<SamhandlerFormValues>();

    const {
        field: { name, value, ref, onBlur, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: SamhandlerFeltnavn.ORGNR,
        control,
        rules: {
            required: `Orgnummer er påkrevd.`,
            validate: value => {
                if (!sjekkErGyldigOrgnr(value)) {
                    return 'Orgnummer har ikke 9 tall.';
                }
            },
        },
    });

    return (
        <TextField
            error={error?.message}
            label={'Skriv inn orgnr'}
            size="medium"
            name={name}
            value={value}
            ref={ref}
            onBlur={onBlur}
            onChange={onChange}
            onKeyDown={event => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    onChange(value);
                }
            }}
            readOnly={isSubmitting}
            placeholder={'orgnr'}
        />
    );
}
