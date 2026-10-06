import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import {
    BrevmottakerField,
    type BrevmottakerFormValues,
} from '@komponenter/Saklinje/Meny/Brevmottaker/Fagsak/useBrevmottakerForm';
import { TextField } from '@navikt/ds-react';
import { useController, useFormContext } from 'react-hook-form';

export function Adresselinje1Field() {
    const erLesevisning = useErLesevisningFagsak();

    const { control } = useFormContext<BrevmottakerFormValues>();

    const {
        field: { name, ref, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: BrevmottakerField.ADRESSELINJE_1,
        control,
        rules: {
            required: 'Adresselinje 1 er påkrevd.',
            maxLength: { value: 80, message: 'Adresselinje 1 kan kun ha maks 80 tegn.' },
        },
    });

    return (
        <TextField
            name={name}
            ref={ref}
            label={'Adresselinje 1'}
            value={value}
            readOnly={erLesevisning || isSubmitting}
            onChange={onChange}
            onBlur={onBlur}
            error={error?.message}
        />
    );
}
