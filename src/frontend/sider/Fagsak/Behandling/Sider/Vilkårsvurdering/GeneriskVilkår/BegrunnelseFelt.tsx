import { useErLesevisning } from '@hooks/useErLesevisning';
import { Textarea } from '@navikt/ds-react';
import type { PersonType } from '@typer/person';
import type { VilkårType } from '@typer/vilkår';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { erBegrunnelsePåkrevd, validerBegrunnelse } from '../validering';
import { VilkårResultatFelt, type VilkårResultatFormValues } from './useVilkårResultatSkjema';

interface Props {
    personType: PersonType;
    vilkårType: VilkårType;
}

export function BegrunnelseFelt({ personType, vilkårType }: Props) {
    const erLesevisning = useErLesevisning();

    const { control } = useFormContext<VilkårResultatFormValues>();

    const vurderesEtter = useWatch({ control, name: VilkårResultatFelt.VURDERES_ETTER });
    const utdypendeVilkårsvurderinger = useWatch({
        control,
        name: VilkårResultatFelt.UTDYPENDE_VILKÅRSVURDERINGER,
    });

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: VilkårResultatFelt.BEGRUNNELSE,
        control,
        rules: {
            validate: (begrunnelse, formValues) =>
                validerBegrunnelse(begrunnelse, {
                    vilkårType,
                    regelverk: formValues.vurderesEtter,
                    utdypendeVilkårsvurderinger: formValues.utdypendeVilkårsvurderinger,
                    personType,
                }),
        },
    });

    const påkrevd = erBegrunnelsePåkrevd({
        vilkårType,
        regelverk: vurderesEtter,
        utdypendeVilkårsvurderinger,
        personType,
    });

    return (
        <Textarea
            ref={ref}
            onBlur={onBlur}
            readOnly={erLesevisning || isSubmitting}
            value={value}
            onChange={onChange}
            label={påkrevd ? 'Begrunnelse' : 'Begrunnelse (valgfri)'}
            placeholder={'Begrunn hvorfor det er gjort endringer på vilkåret.'}
            error={error?.message}
        />
    );
}
