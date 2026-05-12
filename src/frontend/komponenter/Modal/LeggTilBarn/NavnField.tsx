import { useController, useFormContext } from 'react-hook-form';

import { TextField } from '@navikt/ds-react';

import { Fields, type FormValues } from './useLeggTilBarnForm';

export function NavnField() {
    const { control } = useFormContext<FormValues>();

    const { field, fieldState, formState } = useController({
        name: Fields.NAVN,
        control,
        rules: { required: 'Navn er påkrevd.' },
    });

    return (
        <TextField
            label={'Barnets navn'}
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
