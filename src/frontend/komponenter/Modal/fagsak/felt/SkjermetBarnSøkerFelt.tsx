import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Box, TextField } from '@navikt/ds-react';
import { dnr, fnr } from '@navikt/fnrvalidator';

import { OpprettFagsakFeltnavn, type OpprettFagsakFormValues } from '../form/OpprettFagsakForm';

function er11Siffer(verdi: string): boolean {
    return /^\d{11}$/.test(verdi);
}

export function SkjermetBarnSøkerFelt() {
    const { control } = useFormContext<OpprettFagsakFormValues>();

    const { field, fieldState, formState } = useController({
        name: OpprettFagsakFeltnavn.SKJERMET_BARN_SØKER,
        control,
        rules: {
            required: 'Søkers ident er påkrevd.',
            validate: verdi => {
                if (!er11Siffer(verdi)) {
                    return 'Fødselsnummer eller d-nummer må være 11 siffer.';
                }
                const ugyldigFnr = fnr(verdi).status === 'invalid';
                const ugyldigDnr = dnr(verdi).status === 'invalid';
                if (ugyldigFnr && ugyldigDnr) {
                    return 'Ugyldig fødselsnummer eller d-nummer.';
                }
            },
        },
    });

    return (
        <Box as={'div'} width={'50%'}>
            <TextField
                label={'Søkers ident (fødselsnummer/d-nummer)'}
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
