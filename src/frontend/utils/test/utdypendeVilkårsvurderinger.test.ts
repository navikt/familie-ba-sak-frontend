import { PersonType } from '../../typer/person';
import { Resultat, UtdypendeVilkårsvurdering, VilkårType } from '../../typer/vilkår';
import { UtdypendeVilkRsvurderingAvhengigheter } from '../utdypendeVilkårsvurderinger';
import { erUtdypendeVilkårsvurderingerGyldig } from '../validators';

const avhengigheter: UtdypendeVilkRsvurderingAvhengigheter = {
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
            ],
            {
                ...avhengigheter,
                vilkårType: VilkårType.BOSATT_I_RIKET,
            }
        );
        expect(actual).toBe(false);
    });
});
