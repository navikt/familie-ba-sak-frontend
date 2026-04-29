import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { TextField } from '@navikt/ds-react';

import { useLeggTilBarnModalContext } from './LeggTilBarnModalContext';
import { Fields, type FormValues } from './useLeggTilBarnForm';
import { sjekkEr11Tall, sjekkErGyldigIdent } from '../../../utils/validators';

export function FødselsnummerField() {
    const { control } = useFormContext<FormValues>();
    const { barn } = useLeggTilBarnModalContext();

    const alleredeLagtTilFødslesnummer = barn.map(b => b.ident);

    const { field, fieldState, formState } = useController({
        name: Fields.FØDSELSNUMMER,
        control,
        rules: {
            validate: value => {
                if (!value) {
                    return 'Fødselsnummer eller D-nummer er påkrevd.';
                }
                if (alleredeLagtTilFødslesnummer.includes(value)) {
                    return 'Barnet er allerede lagt til.';
                }
                if (!sjekkEr11Tall(value)) {
                    return 'Fødselsnummer eller D-nummer har ikke 11 tall.';
                }
                if (!sjekkErGyldigIdent(value)) {
                    return 'Fødselsnummer eller D-nummer er ugyldig.';
                }
            },
        },
    });

    return (
        <TextField
            label={'Fødselsnummer / D-nummer'}
            placeholder={'11 siffer'}
            ref={field.ref}
            name={field.name}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            error={fieldState.error?.message}
            readOnly={formState.isSubmitting}
            disabled={formState.isSubmitting}
        />
    );
}
