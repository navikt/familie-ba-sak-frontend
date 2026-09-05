import { useErLesevisning } from '@hooks/useErLesevisning';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import type { OptionType } from '@typer/common';
import type { PersonType } from '@typer/person';
import {
    Regelverk,
    type UtdypendeVilkårsvurdering,
    UtdypendeVilkårsvurderingDeltBosted,
    UtdypendeVilkårsvurderingEøsBarnBorMedSøker,
    UtdypendeVilkårsvurderingEøsBarnBosattIRiket,
    UtdypendeVilkårsvurderingEøsSøkerBosattIRiket,
    UtdypendeVilkårsvurderingGenerell,
    UtdypendeVilkårsvurderingNasjonal,
    type VilkårType,
} from '@typer/vilkår';
import { bestemMuligeUtdypendeVilkårsvurderinger } from '@utils/utdypendeVilkårsvurderinger';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { tilResultat, validerUtdypendeVilkårsvurderinger } from '../validering';
import { VilkårResultatFelt, type VilkårResultatFormValues } from './useVilkårResultatSkjema';

const utdypendeVilkårsvurderingTekst: Record<UtdypendeVilkårsvurdering, string> = {
    [UtdypendeVilkårsvurderingGenerell.VURDERING_ANNET_GRUNNLAG]: 'Vurdering annet grunnlag',
    [UtdypendeVilkårsvurderingGenerell.BOSATT_PÅ_SVALBARD]: 'Bosatt på Svalbard',
    [UtdypendeVilkårsvurderingGenerell.BOSATT_I_FINNMARK_NORD_TROMS]: 'Bosatt i Finnmark/Nord-Troms',
    [UtdypendeVilkårsvurderingNasjonal.VURDERT_MEDLEMSKAP]: 'Vurdert medlemskap',
    [UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED]: 'Delt bosted: skal deles',
    [UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED_SKAL_IKKE_DELES]: 'Delt bosted: skal ikke deles',
    [UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING]: 'Søker omfattet av norsk lovgivning',
    [UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING_UTLAND]:
        'Søker omfattet av norsk lovgivning Utland',
    [UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.ANNEN_FORELDER_OMFATTET_AV_NORSK_LOVGIVNING]:
        'Annen forelder omfattet av norsk lovgivning',
    [UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.SØKER_OMFATTET_AV_UTENLANDSK_LOVGIVNING_BOSATT_I_NORGE]:
        'Søker omfattet av utenlandsk lovgivning – bosatt i Norge',
    [UtdypendeVilkårsvurderingEøsBarnBosattIRiket.BARN_BOR_I_NORGE]: 'Barn bor i Norge',
    [UtdypendeVilkårsvurderingEøsBarnBosattIRiket.BARN_BOR_I_EØS]: 'Barn bor i EØS-land',
    [UtdypendeVilkårsvurderingEøsBarnBosattIRiket.BARN_BOR_I_STORBRITANNIA]: 'Barn bor i Storbritannia',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_NORGE_MED_SØKER]: 'Barn bor i Norge med søker',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_EØS_MED_SØKER]: 'Barn bor i EØS-land med søker',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_EØS_MED_ANNEN_FORELDER]:
        'Barn bor i EØS-land med annen forelder (EFTA)',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_STORBRITANNIA_MED_SØKER]:
        'Barn bor i Storbritannia med søker',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER]:
        'Barn bor i Storbritannia med annen forelder (EFTA)',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_ALENE_I_ANNET_EØS_LAND]: 'Barn bor alene i annet EØS-land',
};

const tilOption = (utdypendeVilkårsvurdering: UtdypendeVilkårsvurdering): OptionType => ({
    value: utdypendeVilkårsvurdering,
    label: utdypendeVilkårsvurderingTekst[utdypendeVilkårsvurdering],
});

interface Props {
    personType: PersonType;
    vilkårType: VilkårType;
}

export function UtdypendeVilkårsvurderingerFelt({ personType, vilkårType }: Props) {
    const erLesevisning = useErLesevisning();

    const { control } = useFormContext<VilkårResultatFormValues>();

    const vurderesEtter = useWatch({ control, name: VilkårResultatFelt.VURDERES_ETTER });
    const resultat = useWatch({ control, name: VilkårResultatFelt.RESULTAT });

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: VilkårResultatFelt.UTDYPENDE_VILKÅRSVURDERINGER,
        control,
        rules: {
            deps: [VilkårResultatFelt.BEGRUNNELSE],
            validate: (utdypendeVilkårsvurderinger, formValues) =>
                validerUtdypendeVilkårsvurderinger(utdypendeVilkårsvurderinger, {
                    personType,
                    vilkårType,
                    resultat: tilResultat(formValues.resultat),
                    vurderesEtter: formValues.vurderesEtter,
                }),
        },
    });

    const muligeUtdypendeVilkårsvurderinger = bestemMuligeUtdypendeVilkårsvurderinger({
        personType,
        vilkårType,
        resultat: tilResultat(resultat),
        vurderesEtter,
    });

    if (muligeUtdypendeVilkårsvurderinger.length === 0) {
        return null;
    }

    const onToggleSelected = (optionValue: string, isSelected: boolean) => {
        const valg = optionValue as UtdypendeVilkårsvurdering;
        if (isSelected) {
            onChange([...value, valg]);
        } else {
            onChange(value.filter(utdypendeVilkårsvurdering => utdypendeVilkårsvurdering !== valg));
        }
    };

    return (
        <UNSAFE_Combobox
            isMultiSelect
            label={
                vurderesEtter === Regelverk.NASJONALE_REGLER
                    ? 'Utdypende vilkårsvurdering (valgfri)'
                    : 'Utdypende vilkårsvurdering'
            }
            options={muligeUtdypendeVilkårsvurderinger.map(tilOption)}
            selectedOptions={value.map(tilOption)}
            onToggleSelected={onToggleSelected}
            onBlur={onBlur}
            ref={ref}
            readOnly={erLesevisning || isSubmitting}
            error={error?.message}
        />
    );
}
