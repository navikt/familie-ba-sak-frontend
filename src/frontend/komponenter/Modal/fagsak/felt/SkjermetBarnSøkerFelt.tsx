import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Box, TextField } from '@navikt/ds-react';
import { idnr } from '@navikt/fnrvalidator';

import { OpprettFagsakFeltnavn, type OpprettFagsakFormValues } from '../form/OpprettFagsakForm';

export function SkjermetBarnSøkerFelt() {
    const { control } = useFormContext<OpprettFagsakFormValues>();

    const { field, fieldState, formState } = useController({
        name: OpprettFagsakFeltnavn.SKJERMET_BARN_SØKER,
        control,
        rules: {
            required: 'Skjermet barn søker er påkrevd.',
            validate: verdi => {
                if (idnr(verdi).status === 'invalid') {
                    return 'Ugyldig ident.';
                }
            },
        },
    });

    return (
        <Box as={'div'} width={'50%'}>
            <TextField
                label={'Skjermet barn søker'}
                size={'small'}
                name={field.name}
                value={field.value}
                ref={field.ref}
                onBlur={field.onBlur}
                onChange={field.onChange}
                error={fieldState.error?.message}
                readOnly={formState.isSubmitting}
            />
        </Box>
    );
}
