import { Resultat } from './vilkår';

export interface IFødselshendelsefiltreringResultat {
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
};
