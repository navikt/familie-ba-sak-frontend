import { validerAvtalerOmDeltBostedPerBarn, validerBarnMedDeltBosted } from '@utils/deltBostedSkjemaFelter';
import { useController, useFormContext } from 'react-hook-form';

import DeltBostedSkjema from './DeltBosted/DeltBostedSkjema';
import { type BrevModulFormValues, BrevmodulFeltnavn } from './useBrevModul';

export function DeltBostedField() {
    const { control } = useFormContext<BrevModulFormValues>();

    const {
        fieldState: { error },
    } = useController({
        name: BrevmodulFeltnavn.BARN_MED_DELT_BOSTED,
        control,
        rules: { validate: verdi => validerBarnMedDeltBosted(verdi) ?? true },
    });

    // Registrerer validering av avtalene slik at innsending blokkeres ved ugyldige datoer.
    // Selve feilmeldingene vises inline per dato i DeltBostedAvtaler.
    useController({
        name: BrevmodulFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN,
        control,
        rules: {
            validate: (verdi, values) => validerAvtalerOmDeltBostedPerBarn(verdi, values.barnMedDeltBosted) ?? true,
        },
    });

    return <DeltBostedSkjema error={error?.message} />;
}
