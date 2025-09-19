import type { FeltState } from '@navikt/familie-skjema';

import { PersonType } from '../typer/person';
import type { IVilkårResultat, UtdypendeVilkårsvurdering } from '../typer/vilkår';
import {
    Regelverk,
    Resultat,
    UtdypendeVilkårsvurderingDeltBosted,
    UtdypendeVilkårsvurderingEøsBarnBorMedSøker,
    UtdypendeVilkårsvurderingEøsBarnBosattIRiket,
    UtdypendeVilkårsvurderingEøsSøkerBosattIRiket,
    UtdypendeVilkårsvurderingGenerell,
    UtdypendeVilkårsvurderingNasjonal,
    VilkårType,
} from '../typer/vilkår';

export interface UtdypendeVilkårsvurderingAvhengigheter {
    personType: PersonType;
    vilkårType: VilkårType;
    resultat: Resultat;
    vurderesEtter: Regelverk | null;
}

export const bestemMuligeUtdypendeVilkårsvurderinger = (
    avhengigheter: UtdypendeVilkårsvurderingAvhengigheter
): UtdypendeVilkårsvurdering[] => {
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
                UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING,
                UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING_UTLAND,
                UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.ANNEN_FORELDER_OMFATTET_AV_NORSK_LOVGIVNING,
                UtdypendeVilkårsvurderingGenerell.BOSATT_I_FINNMARK_NORD_TROMS,
            ];
        }
        if (vilkårType === VilkårType.BOSATT_I_RIKET && personType === PersonType.BARN) {
            return [
                UtdypendeVilkårsvurderingEøsBarnBosattIRiket.BARN_BOR_I_NORGE,
                UtdypendeVilkårsvurderingEøsBarnBosattIRiket.BARN_BOR_I_EØS,
                UtdypendeVilkårsvurderingEøsBarnBosattIRiket.BARN_BOR_I_STORBRITANNIA,
                UtdypendeVilkårsvurderingGenerell.BOSATT_I_FINNMARK_NORD_TROMS,
            ];
        }
        if (vilkårType === VilkårType.BOR_MED_SØKER) {
            return [
                UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_EØS_MED_SØKER,
                UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_EØS_MED_ANNEN_FORELDER,
                UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_NORGE_MED_SØKER,
                UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_STORBRITANNIA_MED_SØKER,
                UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER,
                UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_ALENE_I_ANNET_EØS_LAND,
                UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED,
                UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED_SKAL_IKKE_DELES,
                UtdypendeVilkårsvurderingGenerell.VURDERING_ANNET_GRUNNLAG,
            ];
        }
    }

    return [
        UtdypendeVilkårsvurderingGenerell.VURDERING_ANNET_GRUNNLAG,
        ...(vilkårType === VilkårType.BOSATT_I_RIKET
            ? [
                  UtdypendeVilkårsvurderingNasjonal.VURDERT_MEDLEMSKAP,
                  UtdypendeVilkårsvurderingGenerell.BOSATT_PÅ_SVALBARD,
                  UtdypendeVilkårsvurderingGenerell.BOSATT_I_FINNMARK_NORD_TROMS,
              ]
            : []),
        ...(vilkårType === VilkårType.BOR_MED_SØKER
            ? [
                  UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED_SKAL_IKKE_DELES,
                  UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED,
              ]
            : []),
    ];
};

export const bestemFeilmeldingForUtdypendeVilkårsvurdering = (
    utdypendeVilkårsvurderinger: UtdypendeVilkårsvurdering[],
    avhengigheter: UtdypendeVilkårsvurderingAvhengigheter
): string | undefined => {
    const muligeUtdypendeVilkårsvurderinger: UtdypendeVilkårsvurdering[] =
        bestemMuligeUtdypendeVilkårsvurderinger(avhengigheter);

    if (muligeUtdypendeVilkårsvurderinger.length === 0) {
        return;
    }
    if (!utdypendeVilkårsvurderinger.every(item => muligeUtdypendeVilkårsvurderinger.includes(item))) {
        return 'Du har valgt en ugyldig kombinasjon';
    }

    if (avhengigheter.vilkårType === VilkårType.BOR_MED_SØKER) {
        const antallValgteAlternativerForDeltBosted = utdypendeVilkårsvurderinger.filter(item =>
            Object.keys(UtdypendeVilkårsvurderingDeltBosted).includes(item)
        ).length;
        if (antallValgteAlternativerForDeltBosted > 1) {
            return 'Du kan kun velge ett alternativ for delt bosted';
        }
    }

    if (avhengigheter.vurderesEtter === Regelverk.EØS_FORORDNINGEN) {
        if (avhengigheter.vilkårType === VilkårType.BOSATT_I_RIKET) {
            const antallValgteEøsAlternativerForBosattIRiket = utdypendeVilkårsvurderinger.filter(
                item =>
                    item in UtdypendeVilkårsvurderingEøsSøkerBosattIRiket ||
                    item in UtdypendeVilkårsvurderingEøsBarnBosattIRiket
            );

            if (antallValgteEøsAlternativerForBosattIRiket.length === 0) {
                return 'Du må velge ett alternativ';
            }
            if (antallValgteEøsAlternativerForBosattIRiket.length > 1) {
                return 'Du kan kun velge ett av disse alternativene: ' + antallValgteEøsAlternativerForBosattIRiket;
            }
        }
        if (avhengigheter.vilkårType === VilkårType.BOR_MED_SØKER) {
            const antallValgteAlternativerForHvemBarnetBorMed = utdypendeVilkårsvurderinger.filter(item =>
                Object.keys(UtdypendeVilkårsvurderingEøsBarnBorMedSøker).includes(item)
            ).length;
            if (antallValgteAlternativerForHvemBarnetBorMed === 0) {
                return 'Du må velge ett alternativ for hvem barnet bor med';
            }
            if (antallValgteAlternativerForHvemBarnetBorMed > 1) {
                return 'Du kan kun velge ett alternativ for hvem barnet bor med';
            }
        }
    }
};

const inneholderUmuligeAlternativer = (
    valgteAlternativer: UtdypendeVilkårsvurdering[],
    muligeAlternativer: UtdypendeVilkårsvurdering[]
): boolean => {
    return valgteAlternativer.some(item => !muligeAlternativer.includes(item));
};

const filtrerUtUmuligeAlternativer = (
    valgteAlternativer: UtdypendeVilkårsvurdering[],
    muligeAlternativer: UtdypendeVilkårsvurdering[]
): UtdypendeVilkårsvurdering[] => {
    return valgteAlternativer.filter(item => muligeAlternativer.includes(item));
};

export const fjernUmuligeAlternativerFraRedigerbartVilkår = (
    validerOgSettRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void,
    redigerbartVilkår: FeltState<IVilkårResultat>,
    muligeAlternativer: UtdypendeVilkårsvurdering[]
) => {
    if (inneholderUmuligeAlternativer(redigerbartVilkår.verdi.utdypendeVilkårsvurderinger.verdi, muligeAlternativer)) {
        validerOgSettRedigerbartVilkår({
            ...redigerbartVilkår,
            verdi: {
                ...redigerbartVilkår.verdi,
                utdypendeVilkårsvurderinger: {
                    ...redigerbartVilkår.verdi.utdypendeVilkårsvurderinger,
                    verdi: filtrerUtUmuligeAlternativer(
                        redigerbartVilkår.verdi.utdypendeVilkårsvurderinger.verdi,
                        muligeAlternativer
                    ),
                },
            },
        });
    }
};
