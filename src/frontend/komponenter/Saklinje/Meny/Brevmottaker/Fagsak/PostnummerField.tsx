import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import {
    BrevmottakerField,
    type BrevmottakerFormValues,
} from '@komponenter/Saklinje/Meny/Brevmottaker/Fagsak/useBrevmottakerForm';
import { Box, TextField } from '@navikt/ds-react';
import { useController, useFormContext } from 'react-hook-form';

export function PostnummerField() {
    const erLesevisning = useErLesevisningFagsak();

    const { control } = useFormContext<BrevmottakerFormValues>();

    const {
        field: { name, ref, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: BrevmottakerField.POSTNUMMER,
        control,
        rules: {
            required: 'Postnummer er påkrevd',
            minLength: { value: 4, message: 'Postnummer må være 4 siffer.' },
            maxLength: { value: 4, message: 'Postnummer må være 4 siffer.' },
        },
    });

    return (
        <Box width={'10rem'}>
            <TextField
                name={name}
                ref={ref}
                label={'Postnummer'}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                readOnly={erLesevisning || isSubmitting}
                error={error?.message}
                maxLength={4}
            />
        </Box>
    );
}
