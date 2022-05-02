import { PersonType } from '../../typer/person';
import { Resultat, UtdypendeVilkårsvurdering, VilkårType } from '../../typer/vilkår';
import type { UtdypendeVilkårsvurderingAvhengigheter } from '../utdypendeVilkårsvurderinger';
import { erUtdypendeVilkårsvurderingerGyldig } from '../validators';

const avhengigheter: UtdypendeVilkårsvurderingAvhengigheter = {
    personType: PersonType.SØKER,
    vilkårType: VilkårType.BOSATT_I_RIKET,
    resultat: Resultat.OPPFYLT,
    vurderesEtter: null,
    brukEøs: true,
};

describe('Utdypende Vilkårsvurderinger', () => {
    it('UtdypendeVilkårsvurderingerGyldig er gyldig', () => {
        const actual = erUtdypendeVilkårsvurderingerGyldig(
            [
                UtdypendeVilkårsvurdering.VURDERING_ANNET_GRUNNLAG,
                UtdypendeVilkårsvurdering.DELT_BOSTED,
                UtdypendeVilkårsvurdering.DELT_BOSTED_SKAL_IKKE_DELES,
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
                UtdypendeVilkårsvurdering.VURDERT_MEDLEMSKAP,
                UtdypendeVilkårsvurdering.VURDERING_ANNET_GRUNNLAG,
                UtdypendeVilkårsvurdering.DELT_BOSTED,
                UtdypendeVilkårsvurdering.DELT_BOSTED_SKAL_IKKE_DELES,
            ],
            {
                ...avhengigheter,
                vilkårType: VilkårType.BOSATT_I_RIKET,
            }
        );
        expect(actual).toBe(false);
    });
});
