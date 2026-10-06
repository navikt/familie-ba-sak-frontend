import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { TextField } from '@navikt/ds-react';
import { useController, useFormContext } from 'react-hook-form';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';

export function PoststedField() {
    const erLesevisning = useErLesevisningFagsak();

    const { control } = useFormContext<BrevmottakerFormValues>();

    const {
        field: { name, ref, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: BrevmottakerField.POSTSTED,
        control,
        rules: {
            required: 'Poststed er påkrevd.',
            maxLength: { value: 50, message: 'Poststed kan ikke være mer enn 50 tegn.' },
            validate: value => value.trim() !== '' || 'Poststed er påkrevd.',
        },
    });

    return (
        <TextField
            name={name}
            ref={ref}
            label={'Poststed'}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={erLesevisning || isSubmitting}
            error={error?.message}
        />
    );
}
