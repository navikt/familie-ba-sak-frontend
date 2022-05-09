import { PersonType } from '../../typer/person';
import {
    Regelverk,
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

describe('Utdypende Vilkårsvurderinger', () => {
    it('Bor med søker - kan velge alternativer for delt bosted', () => {
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

    it('Nasjonal - bosatt i riket - kan ikke velge alternativer for delt bosted', () => {
        const actual = erUtdypendeVilkårsvurderingerGyldig(
            [
                UtdypendeVilkårsvurderingNasjonal.VURDERT_MEDLEMSKAP,
                UtdypendeVilkårsvurderingGenerell.VURDERING_ANNET_GRUNNLAG,
                UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED,
                UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED_SKAL_IKKE_DELES,
            ],
            {
                ...avhengigheter,
                vurderesEtter: Regelverk.NASJONALE_REGLER,
                vilkårType: VilkårType.BOSATT_I_RIKET,
            }
        );
        expect(actual).toBe(false);
    });
});
