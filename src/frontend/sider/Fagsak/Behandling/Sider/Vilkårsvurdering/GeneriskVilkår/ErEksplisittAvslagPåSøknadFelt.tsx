import { useErLesevisning } from '@hooks/useErLesevisning';
import { BodyShort, Checkbox } from '@navikt/ds-react';
import { useController, useFormContext } from 'react-hook-form';

import { VilkårResultatFelt, type VilkårResultatFormValues } from './useVilkårResultatSkjema';

export function ErEksplisittAvslagPåSøknadFelt() {
    const erLesevisning = useErLesevisning();

    const { control, setValue } = useFormContext<VilkårResultatFormValues>();

    const {
        field: { value, onChange, onBlur, ref },
        formState: { isSubmitting },
    } = useController({
        name: VilkårResultatFelt.ER_EKSPLISITT_AVSLAG_PÅ_SØKNAD,
        control,
        rules: {
            deps: [VilkårResultatFelt.PERIODE, VilkårResultatFelt.AVSLAG_BEGRUNNELSER],
        },
    });

    if (erLesevisning) {
        return value ? <BodyShort>Vurderingen er et avslag</BodyShort> : null;
    }

    return (
        <Checkbox
            ref={ref}
            onBlur={onBlur}
            checked={value}
            readOnly={isSubmitting}
            onChange={event => {
                onChange(event.target.checked);
                setValue(VilkårResultatFelt.AVSLAG_BEGRUNNELSER, [], { shouldDirty: true });
            }}
        >
            Vurderingen er et avslag
        </Checkbox>
    );
}
