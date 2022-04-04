import type { FeltState } from '@navikt/familie-skjema';

import type { IYearMonthPeriode, YearMonth } from '../utils/kalender';

export const LandkodeNorge = 'NO';

export enum SøkerAktivitet {
    ARBEIDER_I_NORGE = 'ARBEIDER_I_NORGE',
    SELVSTENDIG_NÆRINGSDRIVENDE = 'SELVSTENDIG_NÆRINGSDRIVENDE',
    MOTTAR_UTBETALING_FRA_NAV_SOM_ERSTATTER_LØNN = 'MOTTAR_UTBETALING_FRA_NAV_SOM_ERSTATTER_LØNN',
    UTSENDT_ARBEIDSTAKER_FRA_NORGE = 'UTSENDT_ARBEIDSTAKER_FRA_NORGE',
    MOTTAR_UFØRETRYGD_FRA_NORGE = 'MOTTAR_UFØRETRYGD_FRA_NORGE',
    MOTTAR_PENSJON_FRA_NORGE = 'MOTTAR_PENSJON_FRA_NORGE',
    INAKTIV = 'INAKTIV',
}

export const søkerAktiviteter: Record<SøkerAktivitet, string> = {
    ARBEIDER_I_NORGE: 'Arbeider i Norge',
    SELVSTENDIG_NÆRINGSDRIVENDE: 'Selvstendig næringsdrivende',
    MOTTAR_UTBETALING_FRA_NAV_SOM_ERSTATTER_LØNN: 'Mottar utbetaling fra NAV som erstatter lønn',
    UTSENDT_ARBEIDSTAKER_FRA_NORGE: 'Utsendt arbeidstaker fra Norge',
    MOTTAR_UFØRETRYGD_FRA_NORGE: 'Mottar uføretrygd fra Norge',
    MOTTAR_PENSJON_FRA_NORGE: 'Mottar pensjon fra Norge',
    INAKTIV: 'Inaktiv',
};

export enum AnnenForelderAktivitet {
    I_ARBEID = 'I_ARBEID',
    MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN = 'MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN',
    FORSIKRET_I_BOSTEDSLAND = 'FORSIKRET_I_BOSTEDSLAND',
    MOTTAR_PENSJON = 'MOTTAR_PENSJON',
    INAKTIV = 'INAKTIV',
    IKKE_AKTUELT = 'IKKE_AKTUELT',
}

export const annenForelderAktiviteter: Record<AnnenForelderAktivitet, string> = {
    I_ARBEID: 'I arbeid',
    MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN: 'Mottar utbetaling som erstatter lønn',
    FORSIKRET_I_BOSTEDSLAND: 'Forsikret i bostedsland',
    MOTTAR_PENSJON: 'Mottar pensjon',
    INAKTIV: 'Inaktiv',
    IKKE_AKTUELT: 'Ikke aktuelt',
};

export enum KompetanseResultat {
    NORGE_ER_PRIMÆRLAND = 'NORGE_ER_PRIMÆRLAND',
    NORGE_ER_SEKUNDÆRLAND = 'NORGE_ER_SEKUNDÆRLAND',
}

export const kompetanseResultater: Record<KompetanseResultat, string> = {
    NORGE_ER_PRIMÆRLAND: 'Norge er Primærland',
    NORGE_ER_SEKUNDÆRLAND: 'Norge er Sekundærland',
};

export enum KompetanseStatus {
    IKKE_UTFYLT = 'IKKE_UTFYLT',
    UFULLSTENDIG = 'UFULLSTENDIG',
    OK = 'OK',
}

export interface IRestKompetanse {
    id: number;
    status: KompetanseStatus;
    fom: YearMonth;
    tom?: YearMonth;
    barnIdenter: string[];
    søkersAktivitet?: SøkerAktivitet;
    annenForeldersAktivitet?: AnnenForelderAktivitet;
    barnetsBostedsland?: string;
    resultat?: KompetanseResultat;
}

export interface IKompetanse {
    id: number;
    status: KompetanseStatus;
    initielFom: YearMonth;
    periode: FeltState<IYearMonthPeriode>;
    barnIdenter: FeltState<string[]>;
    søkersAktivitet: FeltState<SøkerAktivitet | undefined>;
    annenForeldersAktivitet: FeltState<AnnenForelderAktivitet | undefined>;
    barnetsBostedsland: FeltState<string | undefined>;
    resultat: FeltState<KompetanseResultat | undefined>;
}
