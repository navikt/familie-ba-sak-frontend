import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { TextField } from '@navikt/ds-react';
import { useController, useFormContext } from 'react-hook-form';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';

export function Adresselinje2Field() {
    const erLesevisning = useErLesevisningFagsak();

    const { control } = useFormContext<BrevmottakerFormValues>();

    const {
        field: { name, ref, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: BrevmottakerField.ADRESSELINJE_2,
        control,
        rules: { maxLength: { value: 80, message: 'Adresselinje 2 kan ikke være mer enn 80 tegn.' } },
    });

    return (
        <TextField
            name={name}
            ref={ref}
            label={'Adresselinje 2 (valgfri)'}
            value={value}
            readOnly={erLesevisning || isSubmitting}
            onChange={onChange}
            onBlur={onBlur}
            error={error?.message}
        />
    );
}
