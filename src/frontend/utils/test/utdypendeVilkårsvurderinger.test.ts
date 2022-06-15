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
import { bestemFeilmeldingForUtdypendeVilkårsvurdering } from '../utdypendeVilkårsvurderinger';

const avhengigheter: UtdypendeVilkårsvurderingAvhengigheter = {
    personType: PersonType.SØKER,
    vilkårType: VilkårType.BOSATT_I_RIKET,
    resultat: Resultat.OPPFYLT,
    vurderesEtter: null,
    brukEøs: true,
};

describe('Utdypende Vilkårsvurderinger', () => {
    it('Bor med søker - kan velge alternativer for delt bosted', () => {
        const actualUgyldig = bestemFeilmeldingForUtdypendeVilkårsvurdering(
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
        expect(actualUgyldig).toBe('Du kan kun velge ett alternativ for delt bosted');
        const actualGyldig = bestemFeilmeldingForUtdypendeVilkårsvurdering(
            [
                UtdypendeVilkårsvurderingGenerell.VURDERING_ANNET_GRUNNLAG,
                UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED,
            ],
            {
                ...avhengigheter,
                vilkårType: VilkårType.BOR_MED_SØKER,
            }
        );
        expect(actualGyldig).toBe(undefined);
    });

    it('Nasjonal - bosatt i riket - kan ikke velge alternativer for delt bosted', () => {
        const actual = bestemFeilmeldingForUtdypendeVilkårsvurdering(
            [
                UtdypendeVilkårsvurderingNasjonal.VURDERT_MEDLEMSKAP,
                UtdypendeVilkårsvurderingGenerell.VURDERING_ANNET_GRUNNLAG,
                UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED,
            ],
            {
                ...avhengigheter,
                vurderesEtter: Regelverk.NASJONALE_REGLER,
                vilkårType: VilkårType.BOSATT_I_RIKET,
            }
        );
        expect(actual).toBe('Du har valgt en ugyldig kombinasjon');
    });

    it('EØS - Bosatt i riket - obligatorisk å velge nøyaktig ett alternativ', () => {
        const actualIkkeUtfylt = bestemFeilmeldingForUtdypendeVilkårsvurdering([], {
            ...avhengigheter,
            vurderesEtter: Regelverk.EØS_FORORDNINGEN,
        });
        expect(actualIkkeUtfylt).toBe('Du må velge ett alternativ');

        const actualKunEttValgGyldig = bestemFeilmeldingForUtdypendeVilkårsvurdering(
            [UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING],
            { ...avhengigheter, vurderesEtter: Regelverk.EØS_FORORDNINGEN }
        );
        expect(actualKunEttValgGyldig).toBe(undefined);

        const actualKunEttValgUgyldig = bestemFeilmeldingForUtdypendeVilkårsvurdering(
            [UtdypendeVilkårsvurderingNasjonal.VURDERT_MEDLEMSKAP],
            { ...avhengigheter, vurderesEtter: Regelverk.EØS_FORORDNINGEN }
        );
        expect(actualKunEttValgUgyldig).toBe('Du har valgt en ugyldig kombinasjon');

        const actualForMangeValg = bestemFeilmeldingForUtdypendeVilkårsvurdering(
            [
                UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING,
                UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING_UTLAND,
            ],
            { ...avhengigheter, vurderesEtter: Regelverk.EØS_FORORDNINGEN }
        );
        expect(actualForMangeValg).toBe('Du kan kun velge ett alternativ');
    });

    it('EØS - Lovlig opphold - Skal ikke fylles ut', () => {
        const actualIkkeUtfylt = bestemFeilmeldingForUtdypendeVilkårsvurdering([], {
            ...avhengigheter,
            vurderesEtter: Regelverk.EØS_FORORDNINGEN,
            vilkårType: VilkårType.LOVLIG_OPPHOLD,
        });

        expect(actualIkkeUtfylt).toBe(undefined);
    });

    it('EØS - Barn - Bor med søker - obligatorisk å velge nøyaktig ett alternativ for barns bosted, i fri kombinasjon med generelle alternativer', () => {
        const actualIkkeUtfylt = bestemFeilmeldingForUtdypendeVilkårsvurdering([], {
            ...avhengigheter,
            personType: PersonType.BARN,
            vurderesEtter: Regelverk.EØS_FORORDNINGEN,
            vilkårType: VilkårType.BOR_MED_SØKER,
        });
        expect(actualIkkeUtfylt).toBe('Du må velge ett alternativ for hvem barnet bor med');

        const actualKunEttValgGyldig = bestemFeilmeldingForUtdypendeVilkårsvurdering(
            [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_EØS_MED_SØKER],
            {
                ...avhengigheter,
                personType: PersonType.BARN,
                vurderesEtter: Regelverk.EØS_FORORDNINGEN,
                vilkårType: VilkårType.BOR_MED_SØKER,
            }
        );
        expect(actualKunEttValgGyldig).toBe(undefined);

        const actualKombinasjonGyldig = bestemFeilmeldingForUtdypendeVilkårsvurdering(
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
        expect(actualKombinasjonGyldig).toBe(undefined);

        const actualKombinasjonUgyldig = bestemFeilmeldingForUtdypendeVilkårsvurdering(
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
        expect(actualKombinasjonUgyldig).toBe(
            'Du kan kun velge ett alternativ for hvem barnet bor med'
        );
    });

    it('EØS - vilkår ikke oppfylt - feltet skal ikke fylles ut og skal ikke være obligatorisk', () => {
        const actualKombinasjonGyldig = bestemFeilmeldingForUtdypendeVilkårsvurdering([], {
            ...avhengigheter,
            resultat: Resultat.IKKE_OPPFYLT,
        });

        expect(actualKombinasjonGyldig).toBe(undefined);
    });
});
