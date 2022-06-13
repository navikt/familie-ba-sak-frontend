import type { OptionType } from '@navikt/familie-form-elements';
import type { FeltState } from '@navikt/familie-skjema';

import type { IPeriode, IYearMonthPeriode, YearMonth } from '../utils/kalender';

export const LandkodeNorge = 'NO';

export enum SøkerAktivitet {
    ARBEIDER_I_NORGE = 'ARBEIDER_I_NORGE',
    SELVSTENDIG_NÆRINGSDRIVENDE = 'SELVSTENDIG_NÆRINGSDRIVENDE',
    MOTTAR_UTBETALING_FRA_NAV_SOM_ERSTATTER_LØNN = 'MOTTAR_UTBETALING_FRA_NAV_SOM_ERSTATTER_LØNN',
    UTSENDT_ARBEIDSTAKER_FRA_NORGE = 'UTSENDT_ARBEIDSTAKER_FRA_NORGE',
    MOTTAR_UFØRETRYGD_FRA_NORGE = 'MOTTAR_UFØRETRYGD_FRA_NORGE',
    MOTTAR_PENSJON_FRA_NORGE = 'MOTTAR_PENSJON_FRA_NORGE',
    ARBEIDER_PÅ_NORSKREGISTRERT_SKIP = 'ARBEIDER_PÅ_NORSKREGISTRERT_SKIP',
    ARBEIDER_PÅ_NORSK_SOKKEL = 'ARBEIDER_PÅ_NORSK_SOKKEL',
    ARBEIDER_FOR_ET_NORSK_FLYSELSKAP = 'ARBEIDER_FOR_ET_NORSK_FLYSELSKAP',
    LOKALT_ANSATT_VED_UTENRIKSSTASJON = 'LOKALT_ANSATT_VED_UTENRIKSSTASJON',
    INAKTIV = 'INAKTIV',
}

export const søkerAktiviteter: Record<SøkerAktivitet, string> = {
    ARBEIDER_I_NORGE: 'Arbeider i Norge',
    SELVSTENDIG_NÆRINGSDRIVENDE: 'Selvstendig næringsdrivende',
    MOTTAR_UTBETALING_FRA_NAV_SOM_ERSTATTER_LØNN: 'Mottar utbetaling fra NAV som erstatter lønn',
    UTSENDT_ARBEIDSTAKER_FRA_NORGE: 'Utsendt arbeidstaker fra Norge',
    MOTTAR_UFØRETRYGD_FRA_NORGE: 'Mottar uføretrygd fra Norge',
    MOTTAR_PENSJON_FRA_NORGE: 'Mottar pensjon fra Norge',
    ARBEIDER_PÅ_NORSKREGISTRERT_SKIP: 'Arbeider på norskregistrert skip',
    ARBEIDER_PÅ_NORSK_SOKKEL: 'Arbeider på norsk sokkel',
    ARBEIDER_FOR_ET_NORSK_FLYSELSKAP: 'Arbeider for et norsk flyselskap',
    LOKALT_ANSATT_VED_UTENRIKSSTASJON:
        'Arbeider som lokalt ansatt ved utenlandsk utenriksstasjon og er omfattet av norsk lovgivning',
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
    TO_PRIMÆRLAND = 'TO_PRIMÆRLAND',
}

export const kompetanseResultater: Record<KompetanseResultat, string> = {
    NORGE_ER_PRIMÆRLAND: 'Norge er Primærland',
    NORGE_ER_SEKUNDÆRLAND: 'Norge er Sekundærland',
    TO_PRIMÆRLAND: 'To primærland',
};

export enum EøsPeriodeStatus {
    IKKE_UTFYLT = 'IKKE_UTFYLT',
    UFULLSTENDIG = 'UFULLSTENDIG',
    OK = 'OK',
}

export interface IRestKompetanse {
    id: number;
    status: EøsPeriodeStatus;
    fom: YearMonth;
    tom?: YearMonth;
    barnIdenter: string[];
    søkersAktivitet?: SøkerAktivitet;
    annenForeldersAktivitet?: AnnenForelderAktivitet;
    annenForeldersAktivitetsland?: string;
    barnetsBostedsland?: string;
    resultat?: KompetanseResultat;
}

export interface IKompetanse {
    id: number;
    status: EøsPeriodeStatus;
    initielFom: YearMonth;
    periode: FeltState<IYearMonthPeriode>;
    barnIdenter: FeltState<string[]>;
    søkersAktivitet: FeltState<SøkerAktivitet | undefined>;
    annenForeldersAktivitet: FeltState<AnnenForelderAktivitet | undefined>;
    annenForeldersAktivitetsland: FeltState<string | undefined>;
    barnetsBostedsland: FeltState<string | undefined>;
    resultat: FeltState<KompetanseResultat | undefined>;
}

export enum UtenlandskPeriodeBeløpIntervall {
    ÅRLIG = 'ÅRLIG',
    KVARTALSVIS = 'KVARTALSVIS',
    MÅNEDLIG = 'MÅNEDLIG',
    UKENTLIG = 'UKENTLIG',
}

export const utenlandskPeriodeBeløpIntervaller: Record<UtenlandskPeriodeBeløpIntervall, string> = {
    ÅRLIG: 'per år',
    KVARTALSVIS: 'per kvartal',
    MÅNEDLIG: 'per måned',
    UKENTLIG: 'per uke',
};

export interface IRestUtenlandskPeriodeBeløp {
    id: number;
    status: EøsPeriodeStatus;
    fom: YearMonth;
    tom?: YearMonth;
    barnIdenter: string[];
    beløp?: string;
    valutakode?: string;
    intervall?: UtenlandskPeriodeBeløpIntervall;
}

export interface IUtenlandskPeriodeBeløp {
    periodeId: string;
    id: number;
    status: EøsPeriodeStatus;
    initielFom: YearMonth;
    periode: IYearMonthPeriode;
    barnIdenter: OptionType[];
    beløp?: string | undefined;
    valutakode?: string | undefined;
    intervall?: UtenlandskPeriodeBeløpIntervall | undefined;
}

export interface IRestValutakurs {
    id: number;
    status: EøsPeriodeStatus;
    fom: YearMonth;
    tom?: YearMonth;
    barnIdenter: string[];
    valutakode?: string;
    valutakursdato?: string;
    kurs?: string;
}

export interface IValutakurs {
    periodeId: string;
    id: number;
    status: EøsPeriodeStatus;
    initielFom: YearMonth;
    periode: IPeriode;
    barnIdenter: OptionType[];
    valutakode?: string | undefined;
    valutakursdato?: string | undefined;
    kurs?: string | undefined;
}
