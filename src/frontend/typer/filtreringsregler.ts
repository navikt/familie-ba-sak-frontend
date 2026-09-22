import type { Resultat } from './vilkår';

export interface IFiltreringResultat {
    filtreringsregel: Filtreringsregel;
    resultat: Resultat;
    begrunnelse: string;
}

export enum Filtreringsregel {
    MOR_GYLDIG_FNR = 'MOR_GYLDIG_FNR',
    BARN_GYLDIG_FNR = 'BARN_GYLDIG_FNR',
    MOR_LEVER = 'MOR_LEVER',
    BARN_LEVER = 'BARN_LEVER',
    MER_ENN_5_MND_SIDEN_FORRIGE_BARN = 'MER_ENN_5_MND_SIDEN_FORRIGE_BARN',
    MOR_ER_OVER_18_ÅR = 'MOR_ER_OVER_18_ÅR',
    MOR_HAR_IKKE_VERGE = 'MOR_HAR_IKKE_VERGE',
    MOR_MOTTAR_IKKE_LØPENDE_UTVIDET = 'MOR_MOTTAR_IKKE_LØPENDE_UTVIDET',
    MOR_HAR_IKKE_LØPENDE_EØS_BARNETRYGD = 'MOR_HAR_IKKE_LØPENDE_EØS_BARNETRYGD',
    FAGSAK_IKKE_MIGRERT_UT_AV_INFOTRYGD_ETTER_BARN_FØDT = 'FAGSAK_IKKE_MIGRERT_UT_AV_INFOTRYGD_ETTER_BARN_FØDT',
    LØPER_IKKE_BARNETRYGD_FOR_BARNET = 'LØPER_IKKE_BARNETRYGD_FOR_BARNET',
    MOR_HAR_IKKE_OPPFYLT_UTVIDET_VILKÅR_VED_FØDSELSDATO = 'MOR_HAR_IKKE_OPPFYLT_UTVIDET_VILKÅR_VED_FØDSELSDATO',
    MOR_HAR_IKKE_OPPHØRT_BARNETRYGD = 'MOR_HAR_IKKE_OPPHØRT_BARNETRYGD',
    SØKER_GYLDIG_FNR = 'SØKER_GYLDIG_FNR',
    SØKER_HAR_IKKE_D_NUMMER = 'SØKER_HAR_IKKE_D_NUMMER',
    SØKER_HAR_IKKE_ADRESSEBESKYTTELSE_GRADERING_6_ELLER_19 = 'SØKER_HAR_IKKE_ADRESSEBESKYTTELSE_GRADERING_6_ELLER_19',
    BARN_HAR_IKKE_D_NUMMER = 'BARN_HAR_IKKE_D_NUMMER',
    BARN_HAR_IKKE_ADRESSEBESKYTTELSE_GRADERING_6_ELLER_19 = 'BARN_HAR_IKKE_ADRESSEBESKYTTELSE_GRADERING_6_ELLER_19',
    SØKER_OG_BARN_HAR_FORELDER_BARN_RELASJON = 'SØKER_OG_BARN_HAR_FORELDER_BARN_RELASJON',
    SØKER_HAR_AKTIV_NORSK_BOSTEDSADRESSE = 'SØKER_HAR_AKTIV_NORSK_BOSTEDSADRESSE',
    BARN_HAR_AKTIV_NORSK_BOSTEDSADRESSE = 'BARN_HAR_AKTIV_NORSK_BOSTEDSADRESSE',
    SØKER_ER_IKKE_UKRAINSK_STATSBORGER = 'SØKER_ER_IKKE_UKRAINSK_STATSBORGER',
    BARN_ER_IKKE_UKRAINSK_STATSBORGER = 'BARN_ER_IKKE_UKRAINSK_STATSBORGER',
    SØKER_LEVER = 'SØKER_LEVER',
    SØKER_ER_OVER_18_ÅR = 'SØKER_ER_OVER_18_ÅR',
    SØKER_HAR_IKKE_VERGE = 'SØKER_HAR_IKKE_VERGE',
    SØKER_MOTTAR_IKKE_LØPENDE_UTVIDET = 'SØKER_MOTTAR_IKKE_LØPENDE_UTVIDET',
    SØKER_HAR_IKKE_LØPENDE_EØS_BARNETRYGD = 'SØKER_HAR_IKKE_LØPENDE_EØS_BARNETRYGD',
    SØKER_HAR_IKKE_OPPFYLT_UTVIDET_VILKÅR = 'SØKER_HAR_IKKE_OPPFYLT_UTVIDET_VILKÅR',
    UTBETALES_IKKE_BARNETRYGD_FOR_BARNET_TIL_ANNEN_MOTTAKER_INNEVÆRENDE_MÅNED = 'UTBETALES_IKKE_BARNETRYGD_FOR_BARNET_TIL_ANNEN_MOTTAKER_INNEVÆRENDE_MÅNED',
    SØKER_HAR_IKKE_KRYSSET_PÅ_EØS_SPØRSMÅL_I_SØKNADEN = 'SØKER_HAR_IKKE_KRYSSET_PÅ_EØS_SPØRSMÅL_I_SØKNADEN',
    SØKER_HAR_IKKE_KRYSSET_FOR_DELT_BOSTED_I_SØKNADEN = 'SØKER_HAR_IKKE_KRYSSET_FOR_DELT_BOSTED_I_SØKNADEN',
    SØKER_HAR_IKKE_KRYSSET_FOR_FOSTERHJEM_ELLER_BEREDSKAPSHJEM_I_SØKNADEN = 'SØKER_HAR_IKKE_KRYSSET_FOR_FOSTERHJEM_ELLER_BEREDSKAPSHJEM_I_SØKNADEN',
    SØKNADEN_INNEHOLDER_IKKE_VEDLEGG = 'SØKNADEN_INNEHOLDER_IKKE_VEDLEGG',
}

export const filtreringsregler: Record<Filtreringsregel, string> = {
    MOR_GYLDIG_FNR: 'Mor har gyldig fødselsnummer',
    BARN_GYLDIG_FNR: 'Barn har gyldig fødselsnummer',
    MOR_LEVER: 'Mor lever',
    BARN_LEVER: 'Barna lever',
    MER_ENN_5_MND_SIDEN_FORRIGE_BARN: 'Det er mer enn 5 måneder siden forrige barn',
    MOR_ER_OVER_18_ÅR: 'Mor er over 18 år',
    MOR_HAR_IKKE_VERGE: 'Mor har ikke verge',
    MOR_MOTTAR_IKKE_LØPENDE_UTVIDET: 'Mor mottar ikke utvidet barnetrygd',
    MOR_HAR_IKKE_LØPENDE_EØS_BARNETRYGD: 'Mor har ikke løpende EØS-barnetrygd',
    FAGSAK_IKKE_MIGRERT_UT_AV_INFOTRYGD_ETTER_BARN_FØDT:
        'Fagsaken har ikke blitt migrert fra infotrygd etter barn ble født',
    LØPER_IKKE_BARNETRYGD_FOR_BARNET: 'Det er ikke utbetalt barnetrygd for barnet til annen mottaker',
    MOR_HAR_IKKE_OPPFYLT_UTVIDET_VILKÅR_VED_FØDSELSDATO: 'Mor oppfyller ikke vilkår for utvidet barnetrygd',
    MOR_HAR_IKKE_OPPHØRT_BARNETRYGD: 'Mor har ikke opphørt barnetrygd',
    SØKER_GYLDIG_FNR: 'Søker har gyldig fødselsnummer',
    SØKER_HAR_IKKE_D_NUMMER: 'Søker har ikke d-nummer',
    SØKER_HAR_IKKE_ADRESSEBESKYTTELSE_GRADERING_6_ELLER_19: 'Søker har ikke adressebeskyttelse gradering 6 eller 19',
    BARN_HAR_IKKE_D_NUMMER: 'Barn har ikke d-nummer',
    BARN_HAR_IKKE_ADRESSEBESKYTTELSE_GRADERING_6_ELLER_19: 'Barn har ikke adressebeskyttelse gradering 6 eller 19',
    SØKER_OG_BARN_HAR_FORELDER_BARN_RELASJON: 'Søker og barn har en forelder/barn-relasjon',
    SØKER_HAR_AKTIV_NORSK_BOSTEDSADRESSE: 'Søker har aktiv norsk bostedsadresse per i dag',
    BARN_HAR_AKTIV_NORSK_BOSTEDSADRESSE: 'Barn har aktiv norsk bostedsadresse per i dag',
    SØKER_ER_IKKE_UKRAINSK_STATSBORGER: 'Søker er ikke ukrainsk statsborger',
    BARN_ER_IKKE_UKRAINSK_STATSBORGER: 'Barn er ikke ukrainsk statsborger',
    SØKER_LEVER: 'Søker lever',
    SØKER_ER_OVER_18_ÅR: 'Søker er over 18 år',
    SØKER_HAR_IKKE_VERGE: 'Søker har ikke verge',
    SØKER_MOTTAR_IKKE_LØPENDE_UTVIDET: 'Søker mottar ikke utvidet barnetrygd',
    SØKER_HAR_IKKE_LØPENDE_EØS_BARNETRYGD: 'Søker har ikke løpende EØS-barnetrygd',
    SØKER_HAR_IKKE_OPPFYLT_UTVIDET_VILKÅR: 'Søker oppfyller ikke vilkår for utvidet barnetrygd',
    UTBETALES_IKKE_BARNETRYGD_FOR_BARNET_TIL_ANNEN_MOTTAKER_INNEVÆRENDE_MÅNED:
        'Det utbetales ikke barnetrygd for barnet til annen mottaker i inneværende måned',
    SØKER_HAR_IKKE_KRYSSET_PÅ_EØS_SPØRSMÅL_I_SØKNADEN: 'Søker har ikke krysset på EØS-spørsmål i søknaden',
    SØKER_HAR_IKKE_KRYSSET_FOR_DELT_BOSTED_I_SØKNADEN:
        'Søker har ikke krysset for delt bosted for noen av barna i søknaden',
    SØKER_HAR_IKKE_KRYSSET_FOR_FOSTERHJEM_ELLER_BEREDSKAPSHJEM_I_SØKNADEN:
        'Søker har ikke krysset for at noen av barna er i fosterhjem eller beredskapshjem i søknaden',
    SØKNADEN_INNEHOLDER_IKKE_VEDLEGG: 'Søknaden inneholder ikke vedlegg',
};
