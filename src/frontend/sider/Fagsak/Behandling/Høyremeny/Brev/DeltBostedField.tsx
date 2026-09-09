import { validerAvtalerOmDeltBostedPerBarn, validerBarnMedDeltBosted } from '@utils/deltBostedSkjemaFelter';
import { useController, useFormContext } from 'react-hook-form';

import DeltBostedSkjema from './DeltBosted/DeltBostedSkjema';
import type { BrevModulFormValues } from './useBrevModul';

export function DeltBostedField() {
    const {
        control,
        formState: { isSubmitted },
    } = useFormContext<BrevModulFormValues>();

    const {
        field: barnField,
        fieldState: { error },
    } = useController({
        name: 'barnMedDeltBosted',
        control,
        rules: { validate: verdi => validerBarnMedDeltBosted(verdi) ?? true },
    });

    const { field: avtaleField } = useController({
        name: 'avtalerOmDeltBostedPerBarn',
        control,
        rules: {
            validate: (verdi, values) => validerAvtalerOmDeltBostedPerBarn(verdi, values.barnMedDeltBosted) ?? true,
        },
    });

    return (
        <DeltBostedSkjema
            barnMedDeltBosted={barnField.value}
            settBarnMedDeltBosted={barnField.onChange}
            avtalerOmDeltBostedPerBarn={avtaleField.value}
            settAvtalerOmDeltBostedPerBarn={avtaleField.onChange}
            visFeilmeldinger={isSubmitted}
            error={error?.message}
        />
    );
}
