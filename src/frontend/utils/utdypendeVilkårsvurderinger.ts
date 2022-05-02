import { PersonType } from '../typer/person';
import { Resultat } from '../typer/vilkår';
import { Regelverk } from '../typer/vilkår';
import { UtdypendeVilkårsvurdering, VilkårType } from '../typer/vilkår';

export interface UtdypendeVilkårsvurderingAvhengigheter {
    personType: PersonType;
    vilkårType: VilkårType;
    resultat: Resultat;
    vurderesEtter: Regelverk | null;
    brukEøs: boolean;
}

export const bestemMuligeUtdypendeVilkårsvurderinger = (
    avhengigheter: UtdypendeVilkårsvurderingAvhengigheter
): UtdypendeVilkårsvurdering[] => {
    /*
    Det er mange ting på avhengigheter her som ikke brukes for øyeblikket, men som vil bli nødvendig å ha tilgjengelig senere
    når reglene for hvilke som skal være mulig å velge endres
     */
    const { vilkårType, vurderesEtter, personType, resultat } = avhengigheter;

    if (vilkårType === VilkårType.UTVIDET_BARNETRYGD) {
        return [];
    }

    if (vurderesEtter === Regelverk.EØS_FORORDNINGEN) {
        if (resultat === Resultat.IKKE_OPPFYLT) {
            return [];
        }
        if (vilkårType === VilkårType.LOVLIG_OPPHOLD) {
            return [];
        }
        if (vilkårType === VilkårType.BOSATT_I_RIKET && personType === PersonType.SØKER) {
            return [
                UtdypendeVilkårsvurdering.OMFATTET_AV_NORSK_LOVGIVNING,
                UtdypendeVilkårsvurdering.OMFATTET_AV_NORSK_LOVGIVNING_UTLAND,
            ];
        }
        if (vilkårType === VilkårType.BOSATT_I_RIKET && personType === PersonType.BARN) {
            return [
                UtdypendeVilkårsvurdering.BARN_BOR_I_NORGE,
                UtdypendeVilkårsvurdering.BARN_BOR_I_EØS,
                UtdypendeVilkårsvurdering.BARN_BOR_I_STORBRITANNIA,
            ];
        }
        if (vilkårType === VilkårType.BOR_MED_SØKER) {
            return [
                UtdypendeVilkårsvurdering.VURDERING_ANNET_GRUNNLAG,
                UtdypendeVilkårsvurdering.DELT_BOSTED,
                UtdypendeVilkårsvurdering.DELT_BOSTED_SKAL_IKKE_DELES,
                UtdypendeVilkårsvurdering.BARN_BOR_I_NORGE_MED_SØKER,
                UtdypendeVilkårsvurdering.BARN_BOR_I_EØS_MED_SØKER,
                UtdypendeVilkårsvurdering.BARN_BOR_I_EØS_MED_ANNEN_FORELDER,
                UtdypendeVilkårsvurdering.BARN_BOR_I_STORBRITANNIA_MED_SØKER,
                UtdypendeVilkårsvurdering.BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER,
                UtdypendeVilkårsvurdering.BARN_BOR_ALENE_I_ANNET_EØS_LAND,
            ];
        }
    }

    return [
        UtdypendeVilkårsvurdering.VURDERING_ANNET_GRUNNLAG,
        ...(vilkårType === VilkårType.BOSATT_I_RIKET
            ? [UtdypendeVilkårsvurdering.VURDERT_MEDLEMSKAP]
            : []),
        ...(vilkårType === VilkårType.BOR_MED_SØKER
            ? [
                  UtdypendeVilkårsvurdering.DELT_BOSTED_SKAL_IKKE_DELES,
                  UtdypendeVilkårsvurdering.DELT_BOSTED,
              ]
            : []),
    ];
};
