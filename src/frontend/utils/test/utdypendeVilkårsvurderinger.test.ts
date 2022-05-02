import { PersonType } from '../../typer/person';
import {
    Resultat,
    UtdypendeVilkårsvurderingDeltBosted,
    UtdypendeVilkårsvurderingGenerell,
    UtdypendeVilkårsvurderingNasjonal,
    VilkårType,
} from '../../typer/vilkår';
import type { UtdypendeVilkårsvurderingAvhengigheter } from '../utdypendeVilkårsvurderinger';
import { erUtdypendeVilkårsvurderingerGyldig } from '../validators';

const avhengigheter: UtdypendeVilkårsvurderingAvhengigheter = {
    personType: PersonType.SØKER,
    vilkårType: VilkårType.BOSATT_I_RIKET,
    resultat: Resultat.OPPFYLT,
    vurderesEtter: null,
    brukEøs: true,
};

describe('Utdypende-Vilkårsvurderinger', () => {
    it('UtdypendeVilkårsvurderingerGyldig er gyldig', () => {
        const actual = erUtdypendeVilkårsvurderingerGyldig(
            [
                UtdypendeVilkårsvurderingGenerell.VURDERING_ANNET_GRUNNLAG,
                UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED,
                UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED_SKAL_IKKE_DELES,
            ],
            {
                ...avhengigheter,
                vilkårType: VilkårType.BOR_MED_SØKER,
            }
        );
        expect(actual).toBe(true);
    });

    it('kan ikke velge DELT_BOSTED for VilkårType BOSATT_I_RIKET', () => {
        const actual = erUtdypendeVilkårsvurderingerGyldig(
            [
                UtdypendeVilkårsvurderingNasjonal.VURDERT_MEDLEMSKAP,
                UtdypendeVilkårsvurderingGenerell.VURDERING_ANNET_GRUNNLAG,
                UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED,
                UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED_SKAL_IKKE_DELES,
            ],
            {
                ...avhengigheter,
                vilkårType: VilkårType.BOSATT_I_RIKET,
            }
        );
        expect(actual).toBe(false);
    });
});
