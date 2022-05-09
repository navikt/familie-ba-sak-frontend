import { PersonType } from '../../typer/person';
import {
    Regelverk,
    Resultat,
    UtdypendeVilkårsvurderingDeltBosted,
    UtdypendeVilkårsvurderingGenerell,
    UtdypendeVilkårsvurderingNasjonal,
    UtdypendeVilkårsvurderingEøsSøkerBosattIRiket,
    UtdypendeVilkårsvurderingEøsBarnBorMedSøker,
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

    it('EØS - Bosatt i riket - obligatorisk å velge nøyaktig ett alternativ', () => {
        const actualIkkeUtfylt = erUtdypendeVilkårsvurderingerGyldig([], {
            ...avhengigheter,
            vurderesEtter: Regelverk.EØS_FORORDNINGEN,
        });
        expect(actualIkkeUtfylt).toBe(false);

        const actualKunEttValgGyldig = erUtdypendeVilkårsvurderingerGyldig(
            [UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING],
            { ...avhengigheter, vurderesEtter: Regelverk.EØS_FORORDNINGEN }
        );
        expect(actualKunEttValgGyldig).toBe(true);

        const actualKunEttValgUgyldig = erUtdypendeVilkårsvurderingerGyldig(
            [UtdypendeVilkårsvurderingNasjonal.VURDERT_MEDLEMSKAP],
            { ...avhengigheter, vurderesEtter: Regelverk.EØS_FORORDNINGEN }
        );
        expect(actualKunEttValgUgyldig).toBe(false);

        const actualForMangeValg = erUtdypendeVilkårsvurderingerGyldig(
            [
                UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING,
                UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING_UTLAND,
            ],
            { ...avhengigheter, vurderesEtter: Regelverk.EØS_FORORDNINGEN }
        );
        expect(actualForMangeValg).toBe(false);
    });

    it('EØS - Lovlig opphold - Skal ikke fylles ut', () => {
        const actualIkkeUtfylt = erUtdypendeVilkårsvurderingerGyldig([], {
            ...avhengigheter,
            vurderesEtter: Regelverk.EØS_FORORDNINGEN,
            vilkårType: VilkårType.LOVLIG_OPPHOLD,
        });

        expect(actualIkkeUtfylt).toBe(true);
    });

    it('EØS - Barn - Bor med søker - obligatorisk å velge nøyaktig ett alternativ for barns bosted, i fri kombinasjon med generelle alternativer', () => {
        const actualIkkeUtfylt = erUtdypendeVilkårsvurderingerGyldig([], {
            ...avhengigheter,
            personType: PersonType.BARN,
            vurderesEtter: Regelverk.EØS_FORORDNINGEN,
            vilkårType: VilkårType.BOR_MED_SØKER,
        });
        expect(actualIkkeUtfylt).toBe(false);

        const actualKunEttValgGyldig = erUtdypendeVilkårsvurderingerGyldig(
            [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_EØS_MED_SØKER],
            {
                ...avhengigheter,
                personType: PersonType.BARN,
                vurderesEtter: Regelverk.EØS_FORORDNINGEN,
                vilkårType: VilkårType.BOR_MED_SØKER,
            }
        );
        expect(actualKunEttValgGyldig).toBe(true);

        const actualKombinasjonGyldig = erUtdypendeVilkårsvurderingerGyldig(
            [
                UtdypendeVilkårsvurderingGenerell.VURDERING_ANNET_GRUNNLAG,
                UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED,
                UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_EØS_MED_ANNEN_FORELDER,
            ],
            {
                ...avhengigheter,
                personType: PersonType.BARN,
                vurderesEtter: Regelverk.EØS_FORORDNINGEN,
                vilkårType: VilkårType.BOR_MED_SØKER,
            }
        );
        expect(actualKombinasjonGyldig).toBe(true);

        const actualKombinasjonUgyldig = erUtdypendeVilkårsvurderingerGyldig(
            [
                UtdypendeVilkårsvurderingGenerell.VURDERING_ANNET_GRUNNLAG,
                UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_ALENE_I_ANNET_EØS_LAND,
                UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_NORGE_MED_SØKER,
            ],
            {
                ...avhengigheter,
                personType: PersonType.BARN,
                vurderesEtter: Regelverk.EØS_FORORDNINGEN,
                vilkårType: VilkårType.BOR_MED_SØKER,
            }
        );
        expect(actualKombinasjonUgyldig).toBe(false);
    });
});
