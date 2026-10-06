import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import {
    BrevmottakerField,
    type BrevmottakerFormValues,
} from '@komponenter/Saklinje/Meny/Brevmottaker/Fagsak/useBrevmottakerForm';
import { TextField } from '@navikt/ds-react';
import { useController, useFormContext } from 'react-hook-form';

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
            required: 'Poststed er påkrevd',
            maxLength: { value: 80, message: 'Poststed kan ikke være mer enn 80 tegn.' },
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
