import { PersonType } from './person';
export var Resultat;
(function (Resultat) {
    Resultat["IKKE_OPPFYLT"] = "IKKE_OPPFYLT";
    Resultat["OPPFYLT"] = "OPPFYLT";
    Resultat["IKKE_VURDERT"] = "IKKE_VURDERT";
})(Resultat || (Resultat = {}));
export var ResultatBegrunnelse;
(function (ResultatBegrunnelse) {
    ResultatBegrunnelse["IKKE_AKTUELT"] = "IKKE_AKTUELT";
})(ResultatBegrunnelse || (ResultatBegrunnelse = {}));
export const resultatVisningsnavn = {
    OPPFYLT: 'Oppfylt',
    IKKE_OPPFYLT: 'Ikke oppfylt',
    IKKE_VURDERT: 'Ikke vurdert',
    IKKE_AKTUELT: 'Ikke aktuelt',
};
export const resultater = {
    OPPFYLT: 'Ja',
    IKKE_OPPFYLT: 'Nei',
    IKKE_VURDERT: 'Kanskje',
};
export var AnnenVurderingType;
(function (AnnenVurderingType) {
    AnnenVurderingType["OPPLYSNINGSPLIKT"] = "OPPLYSNINGSPLIKT";
})(AnnenVurderingType || (AnnenVurderingType = {}));
export var VilkårType;
(function (VilkårType) {
    VilkårType["UNDER_18_\u00C5R"] = "UNDER_18_\u00C5R";
    VilkårType["BOR_MED_S\u00D8KER"] = "BOR_MED_S\u00D8KER";
    VilkårType["GIFT_PARTNERSKAP"] = "GIFT_PARTNERSKAP";
    VilkårType["BOSATT_I_RIKET"] = "BOSATT_I_RIKET";
    VilkårType["LOVLIG_OPPHOLD"] = "LOVLIG_OPPHOLD";
    VilkårType["UTVIDET_BARNETRYGD"] = "UTVIDET_BARNETRYGD";
})(VilkårType || (VilkårType = {}));
export var Regelverk;
(function (Regelverk) {
    Regelverk["NASJONALE_REGLER"] = "NASJONALE_REGLER";
    Regelverk["E\u00D8S_FORORDNINGEN"] = "E\u00D8S_FORORDNINGEN";
})(Regelverk || (Regelverk = {}));
export const vilkårConfig = {
    BOSATT_I_RIKET: {
        beskrivelse: 'bosatt i riket',
        key: VilkårType.BOSATT_I_RIKET,
        tittel: 'Bosatt i riket',
        spørsmål: (part) => `Er ${part} bosatt i riket?`,
        parterDetteGjelderFor: [PersonType.BARN, PersonType.SØKER],
    },
    LOVLIG_OPPHOLD: {
        beskrivelse: 'lovlig opphold',
        key: VilkårType.LOVLIG_OPPHOLD,
        tittel: 'Lovlig opphold',
        spørsmål: (part) => `Har ${part} lovlig opphold?`,
        parterDetteGjelderFor: [PersonType.BARN, PersonType.SØKER],
    },
    UTVIDET_BARNETRYGD: {
        beskrivelse: 'utvidet barnetrygd',
        key: VilkårType.UTVIDET_BARNETRYGD,
        tittel: 'Utvidet barnetrygd',
        spørsmål: () => 'Foreligger det rett på utvidet barnetrygd?',
        parterDetteGjelderFor: [PersonType.SØKER],
    },
    BOR_MED_SØKER: {
        beskrivelse: 'bor med søker',
        key: VilkårType.BOR_MED_SØKER,
        tittel: 'Bor fast hos søker',
        spørsmål: () => `Bor barnet fast hos søker?`,
        parterDetteGjelderFor: [PersonType.BARN],
    },
    UNDER_18_ÅR: {
        beskrivelse: 'under 18 år',
        key: VilkårType.UNDER_18_ÅR,
        tittel: 'Under 18 år',
        spørsmål: () => `Er barnet under 18 år?`,
        parterDetteGjelderFor: [PersonType.BARN],
    },
    GIFT_PARTNERSKAP: {
        beskrivelse: 'inngått ekteskap eller partnerskap',
        key: VilkårType.GIFT_PARTNERSKAP,
        tittel: 'Inngått ekteskap eller partnerskap',
        spørsmål: () => 'Har barnet inngått ekteskap eller partnerskap?',
        parterDetteGjelderFor: [PersonType.BARN],
    },
};
export const vilkårConfigInstitusjon = Object.values(vilkårConfig).filter(vilkår => vilkår.parterDetteGjelderFor.includes(PersonType.BARN));
export const vilkårConfigEnsligMindreårig = {
    BOSATT_I_RIKET: vilkårConfig.BOSATT_I_RIKET,
    LOVLIG_OPPHOLD: vilkårConfig.LOVLIG_OPPHOLD,
    BOR_MED_SØKER: Object.assign(Object.assign({}, vilkårConfig.BOR_MED_SØKER), { beskrivelse: 'enslig mindreårig', tittel: 'Enslig mindreårig', spørsmål: () => 'Er barnet enslig mindreårig asylsøker eller flyktning?' }),
    UTVIDET_BARNETRYGD: Object.assign(Object.assign({}, vilkårConfig.UTVIDET_BARNETRYGD), { parterDetteGjelderFor: [PersonType.BARN] }),
    UNDER_18_ÅR: vilkårConfig.UNDER_18_ÅR,
    GIFT_PARTNERSKAP: vilkårConfig.GIFT_PARTNERSKAP,
};
export const annenVurderingConfig = {
    OPPLYSNINGSPLIKT: {
        beskrivelse: 'Opplysningsplikt',
        key: 'OPPLYSNINGSPLIKT',
        tittel: 'Opplysningsplikt',
        parterDetteGjelderFor: [PersonType.SØKER],
        spørsmål: () => 'Er opplysningsplikten oppfylt?',
    },
};
export var UtdypendeVilkårsvurderingGenerell;
(function (UtdypendeVilkårsvurderingGenerell) {
    UtdypendeVilkårsvurderingGenerell["VURDERING_ANNET_GRUNNLAG"] = "VURDERING_ANNET_GRUNNLAG";
    UtdypendeVilkårsvurderingGenerell["BOSATT_P\u00C5_SVALBARD"] = "BOSATT_P\u00C5_SVALBARD";
    UtdypendeVilkårsvurderingGenerell["BOSATT_I_FINNMARK_NORD_TROMS"] = "BOSATT_I_FINNMARK_NORD_TROMS";
})(UtdypendeVilkårsvurderingGenerell || (UtdypendeVilkårsvurderingGenerell = {}));
export var UtdypendeVilkårsvurderingNasjonal;
(function (UtdypendeVilkårsvurderingNasjonal) {
    UtdypendeVilkårsvurderingNasjonal["VURDERT_MEDLEMSKAP"] = "VURDERT_MEDLEMSKAP";
})(UtdypendeVilkårsvurderingNasjonal || (UtdypendeVilkårsvurderingNasjonal = {}));
export var UtdypendeVilkårsvurderingDeltBosted;
(function (UtdypendeVilkårsvurderingDeltBosted) {
    UtdypendeVilkårsvurderingDeltBosted["DELT_BOSTED"] = "DELT_BOSTED";
    UtdypendeVilkårsvurderingDeltBosted["DELT_BOSTED_SKAL_IKKE_DELES"] = "DELT_BOSTED_SKAL_IKKE_DELES";
})(UtdypendeVilkårsvurderingDeltBosted || (UtdypendeVilkårsvurderingDeltBosted = {}));
export var UtdypendeVilkårsvurderingEøsSøkerBosattIRiket;
(function (UtdypendeVilkårsvurderingEøsSøkerBosattIRiket) {
    UtdypendeVilkårsvurderingEøsSøkerBosattIRiket["OMFATTET_AV_NORSK_LOVGIVNING"] = "OMFATTET_AV_NORSK_LOVGIVNING";
    UtdypendeVilkårsvurderingEøsSøkerBosattIRiket["OMFATTET_AV_NORSK_LOVGIVNING_UTLAND"] = "OMFATTET_AV_NORSK_LOVGIVNING_UTLAND";
    UtdypendeVilkårsvurderingEøsSøkerBosattIRiket["ANNEN_FORELDER_OMFATTET_AV_NORSK_LOVGIVNING"] = "ANNEN_FORELDER_OMFATTET_AV_NORSK_LOVGIVNING";
    UtdypendeVilkårsvurderingEøsSøkerBosattIRiket["S\u00D8KER_OMFATTET_AV_UTENLANDSK_LOVGIVNING_BOSATT_I_NORGE"] = "S\u00D8KER_OMFATTET_AV_UTENLANDSK_LOVGIVNING_BOSATT_I_NORGE";
})(UtdypendeVilkårsvurderingEøsSøkerBosattIRiket || (UtdypendeVilkårsvurderingEøsSøkerBosattIRiket = {}));
export var UtdypendeVilkårsvurderingEøsBarnBosattIRiket;
(function (UtdypendeVilkårsvurderingEøsBarnBosattIRiket) {
    UtdypendeVilkårsvurderingEøsBarnBosattIRiket["BARN_BOR_I_NORGE"] = "BARN_BOR_I_NORGE";
    UtdypendeVilkårsvurderingEøsBarnBosattIRiket["BARN_BOR_I_E\u00D8S"] = "BARN_BOR_I_E\u00D8S";
    UtdypendeVilkårsvurderingEøsBarnBosattIRiket["BARN_BOR_I_STORBRITANNIA"] = "BARN_BOR_I_STORBRITANNIA";
})(UtdypendeVilkårsvurderingEøsBarnBosattIRiket || (UtdypendeVilkårsvurderingEøsBarnBosattIRiket = {}));
export var UtdypendeVilkårsvurderingEøsBarnBorMedSøker;
(function (UtdypendeVilkårsvurderingEøsBarnBorMedSøker) {
    UtdypendeVilkårsvurderingEøsBarnBorMedSøker["BARN_BOR_I_NORGE_MED_S\u00D8KER"] = "BARN_BOR_I_NORGE_MED_S\u00D8KER";
    UtdypendeVilkårsvurderingEøsBarnBorMedSøker["BARN_BOR_I_E\u00D8S_MED_S\u00D8KER"] = "BARN_BOR_I_E\u00D8S_MED_S\u00D8KER";
    UtdypendeVilkårsvurderingEøsBarnBorMedSøker["BARN_BOR_I_E\u00D8S_MED_ANNEN_FORELDER"] = "BARN_BOR_I_E\u00D8S_MED_ANNEN_FORELDER";
    UtdypendeVilkårsvurderingEøsBarnBorMedSøker["BARN_BOR_I_STORBRITANNIA_MED_S\u00D8KER"] = "BARN_BOR_I_STORBRITANNIA_MED_S\u00D8KER";
    UtdypendeVilkårsvurderingEøsBarnBorMedSøker["BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER"] = "BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER";
    UtdypendeVilkårsvurderingEøsBarnBorMedSøker["BARN_BOR_ALENE_I_ANNET_E\u00D8S_LAND"] = "BARN_BOR_ALENE_I_ANNET_E\u00D8S_LAND";
})(UtdypendeVilkårsvurderingEøsBarnBorMedSøker || (UtdypendeVilkårsvurderingEøsBarnBorMedSøker = {}));
