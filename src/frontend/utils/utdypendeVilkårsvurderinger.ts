import { PersonType } from '../typer/person';
import { Regelverk, Resultat, UtdypendeVilkårsvurdering, VilkårType } from '../typer/vilkår';

export interface UtdypendeVilkRsvurderingAvhengigheter {
    personType: PersonType;
    vilkårType: VilkårType;
    resultat: Resultat;
    vurderesEtter: Regelverk | null;
    brukEøs: boolean;
}

export const bestemMuligeUtdypendeVilkårsvurderinger = (
    avhengigheter: UtdypendeVilkRsvurderingAvhengigheter
): UtdypendeVilkårsvurdering[] => {
    /*
    Det er mange ting på avhengigheter her som ikke brukes for øyeblikket, men som vil bli nødvendig å ha tilgjengelig senere
    når reglene for hvilke som skal være mulig å velge endres
     */
    const { vilkårType } = avhengigheter;

    if (vilkårType === VilkårType.UTVIDET_BARNETRYGD) {
        return [];
    }

    return [
        UtdypendeVilkårsvurdering.VURDERING_ANNET_GRUNNLAG,
        ...(vilkårType === VilkårType.BOSATT_I_RIKET
            ? [UtdypendeVilkårsvurdering.VURDERT_MEDLEMSKAP]
            : []),
        ...(vilkårType === VilkårType.BOR_MED_SØKER ? [UtdypendeVilkårsvurdering.DELT_BOSTED] : []),
    ];
};
