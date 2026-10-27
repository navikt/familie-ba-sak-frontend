import { TextField } from '@navikt/ds-react';
import { useController, useFormContext } from 'react-hook-form';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';
import { useErNavnPreutfylt } from './useErNavnPreutfylt';

interface Props {
    erLesevisning: boolean;
}

export function NavnField({ erLesevisning }: Props) {
    const { control } = useFormContext<BrevmottakerFormValues>();

    const {
        field: { name, ref, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: BrevmottakerField.NAVN,
        control,
        rules: {
            required: 'Navn er påkrevd.',
            maxLength: { value: 80, message: 'Navn kan ikke være mer enn 80 tegn.' },
            validate: value => value.trim() !== '' || 'Navn er påkrevd.',
        },
    });

    const erNavnPreutfylt = useErNavnPreutfylt();

    return (
        <TextField
            name={name}
            ref={ref}
            label={'Navn'}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={erLesevisning || isSubmitting || erNavnPreutfylt}
            error={error?.message}
        />
    );
}
