import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Textarea } from '@navikt/ds-react';

import { EndreBehandlendeEnhetFormFields, type EndreBehandlendeEnhetFormValues } from './useEndreBehandlendeEnhetForm';

interface Props {
    readOnly: boolean;
}

export function BegrunnelseField({ readOnly }: Props) {
    const { control } = useFormContext<EndreBehandlendeEnhetFormValues>();
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
        },
    });

    return (
        <Textarea
            disabled={isSubmitting}
            readOnly={readOnly}
            label={'Begrunnelse'}
            value={value}
            maxLength={4000}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                onChange(event.target.value);
            }}
            error={error?.message}
        />
    );
}
