import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { HStack, Radio, RadioGroup } from '@navikt/ds-react';

import { Fields, type FormValues } from './useLeggTilBarnForm';

export function ErFolkeregistrertField() {
    const { control, resetField, clearErrors } = useFormContext<FormValues>();

    const { field, fieldState, formState } = useController({
        name: Fields.ER_FOLKEREGISTERT,
        control,
        rules: {
            validate: value => {
                if (value === undefined || value === null) {
                    return 'Du må velge om barnet er folkeregistrert / har fødselsnummer.';
                }
            },
        },
    });

    function onChange(value: boolean) {
        clearErrors();
        resetField(Fields.FØDSELSNUMMER);
        resetField(Fields.FØDSELSDATO);
        resetField(Fields.NAVN);
        field.onChange(value);
    }

    return (
        <RadioGroup
            legend={'Barnet er folkeregistrert / har fødselsnummer'}
            ref={field.ref}
            name={field.name}
            value={field.value}
            onChange={onChange}
            onBlur={field.onBlur}
            disabled={formState.isSubmitting}
            readOnly={formState.isSubmitting}
            error={fieldState.error?.message}
        >
            <HStack gap={'space-24'}>
                <Radio value={true} disabled={formState.isSubmitting}>
                    Ja
                </Radio>
                <Radio value={false} disabled={formState.isSubmitting}>
                    Nei
                </Radio>
            </HStack>
        </RadioGroup>
    );
}
