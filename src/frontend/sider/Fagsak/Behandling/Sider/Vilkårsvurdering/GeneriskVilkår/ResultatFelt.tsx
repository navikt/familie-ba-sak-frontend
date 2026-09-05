import { useErLesevisning } from '@hooks/useErLesevisning';
import { Radio, RadioGroup } from '@navikt/ds-react';
import type { PersonType } from '@typer/person';
import { Regelverk, Resultat, ResultatBegrunnelse, VilkårType } from '@typer/vilkår';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { tilResultat, type VilkårResultatUi, validerResultat } from '../validering';
import { useFjernUmuligeUtdypendeVilkårsvurderinger } from './useFjernUmuligeUtdypendeVilkårsvurderinger';
import { VilkårResultatFelt, type VilkårResultatFormValues } from './useVilkårResultatSkjema';

interface Props {
    legend: string;
    personType: PersonType;
    vilkårType: VilkårType;
}

export function ResultatFelt({ legend, personType, vilkårType }: Props) {
    const erLesevisning = useErLesevisning();

    const { control, setValue } = useFormContext<VilkårResultatFormValues>();

    const fjernUmuligeUtdypendeVilkårsvurderinger = useFjernUmuligeUtdypendeVilkårsvurderinger({
        personType,
        vilkårType,
    });

    const vurderesEtter = useWatch({ control, name: VilkårResultatFelt.VURDERES_ETTER });

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: VilkårResultatFelt.RESULTAT,
        control,
        rules: {
            deps: [VilkårResultatFelt.UTDYPENDE_VILKÅRSVURDERINGER, VilkårResultatFelt.PERIODE],
            validate: (resultat, formValues) => validerResultat(resultat, { vurderesEtter: formValues.vurderesEtter }),
        },
    });

    const erGiftPartnerskap = vilkårType === VilkårType.GIFT_PARTNERSKAP;
    const skalViseIkkeAktuelt =
        vilkårType === VilkårType.LOVLIG_OPPHOLD && vurderesEtter === Regelverk.EØS_FORORDNINGEN;

    return (
        <RadioGroup
            ref={ref}
            onBlur={onBlur}
            readOnly={erLesevisning || isSubmitting}
            value={value}
            legend={legend}
            error={error?.message}
            onChange={(nyttResultat: VilkårResultatUi) => {
                onChange(nyttResultat);
                setValue(VilkårResultatFelt.ER_EKSPLISITT_AVSLAG_PÅ_SØKNAD, false, { shouldDirty: true });
                setValue(VilkårResultatFelt.AVSLAG_BEGRUNNELSER, [], { shouldDirty: true });
                fjernUmuligeUtdypendeVilkårsvurderinger({ resultat: tilResultat(nyttResultat) });
            }}
        >
            <Radio value={erGiftPartnerskap ? Resultat.IKKE_OPPFYLT : Resultat.OPPFYLT}>Ja</Radio>
            <Radio value={erGiftPartnerskap ? Resultat.OPPFYLT : Resultat.IKKE_OPPFYLT}>Nei</Radio>
            {skalViseIkkeAktuelt && <Radio value={ResultatBegrunnelse.IKKE_AKTUELT}>Ikke aktuelt</Radio>}
        </RadioGroup>
    );
}
