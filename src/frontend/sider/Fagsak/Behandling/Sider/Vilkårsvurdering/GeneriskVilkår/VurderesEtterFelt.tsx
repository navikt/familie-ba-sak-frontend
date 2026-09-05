import { useErLesevisning } from '@hooks/useErLesevisning';
import { Select } from '@navikt/ds-react';
import type { PersonType } from '@typer/person';
import type { Regelverk, VilkårType } from '@typer/vilkår';
import { alleRegelverk } from '@utils/vilkår';
import { useController, useFormContext } from 'react-hook-form';

import { useFjernUmuligeUtdypendeVilkårsvurderinger } from './useFjernUmuligeUtdypendeVilkårsvurderinger';
import { VilkårResultatFelt, type VilkårResultatFormValues } from './useVilkårResultatSkjema';

interface Props {
    personType: PersonType;
    vilkårType: VilkårType;
}

export function VurderesEtterFelt({ personType, vilkårType }: Props) {
    const erLesevisning = useErLesevisning();

    const { control, setValue } = useFormContext<VilkårResultatFormValues>();

    const fjernUmuligeUtdypendeVilkårsvurderinger = useFjernUmuligeUtdypendeVilkårsvurderinger({
        personType,
        vilkårType,
    });

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: VilkårResultatFelt.VURDERES_ETTER,
        control,
        rules: {
            deps: [
                VilkårResultatFelt.RESULTAT,
                VilkårResultatFelt.UTDYPENDE_VILKÅRSVURDERINGER,
                VilkårResultatFelt.BEGRUNNELSE,
            ],
        },
    });

    return (
        <Select
            ref={ref}
            onBlur={onBlur}
            readOnly={erLesevisning || isSubmitting}
            label={'Vurderes etter'}
            value={value ?? ''}
            error={error?.message}
            onChange={event => {
                const nyttRegelverk = event.target.value as Regelverk;
                onChange(nyttRegelverk);
                setValue(VilkårResultatFelt.AVSLAG_BEGRUNNELSER, [], { shouldDirty: true });
                fjernUmuligeUtdypendeVilkårsvurderinger({ vurderesEtter: nyttRegelverk });
            }}
        >
            <option value={''} disabled>
                Velg regelverk
            </option>
            {Object.entries(alleRegelverk).map(([regelverk, { tekst }]) => (
                <option key={regelverk} value={regelverk}>
                    {tekst}
                </option>
            ))}
        </Select>
    );
}
