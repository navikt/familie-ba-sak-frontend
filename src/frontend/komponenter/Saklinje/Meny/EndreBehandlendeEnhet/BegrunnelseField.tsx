import React, { type ChangeEvent } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Textarea } from '@navikt/ds-react';

import { EndreBehandlendeEnhetFormFields, type EndreBehandlendeEnhetFormValues } from './useEndreBehandlendeEnhetForm';

interface Props {
    readOnly: boolean;
}

export function BegrunnelseField({ readOnly }: Props) {
    const { control, clearErrors } = useFormContext<EndreBehandlendeEnhetFormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: EndreBehandlendeEnhetFormFields.BEGRUNNELSE,
        control,
        rules: {
            required: 'Begrunnelse må fylles ut.',
            minLength: { value: 3, message: 'Må bruke minst tre tegn.' },
            maxLength: { value: 4000, message: 'Maks 4000 tegn.' },
        },
    });

    function handleOnChange(event: ChangeEvent<HTMLTextAreaElement>) {
        clearErrors('root');
        onChange(event.target.value);
    }

    return (
        <Textarea
            label={'Begrunnelse'}
            value={value}
            maxLength={4000}
            onChange={handleOnChange}
            readOnly={readOnly || isSubmitting}
            error={error?.message}
        />
    );
}
