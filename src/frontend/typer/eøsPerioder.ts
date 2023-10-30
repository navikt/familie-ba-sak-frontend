import type { OptionType } from '@navikt/familie-form-elements';

import type { IsoDatoString } from '../utils/dato';
import type { IPeriode, IYearMonthPeriode, YearMonth } from '../utils/kalender';

export const LandkodeNorge = 'NO';

export type KompetanseAktivitet = SøkersAktivitet | AnnenForelderAktivitet;

export enum SøkersAktivitet {
    ARBEIDER = 'ARBEIDER',
    SELVSTENDIG_NÆRINGSDRIVENDE = 'SELVSTENDIG_NÆRINGSDRIVENDE',
    MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN = 'MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN',
    UTSENDT_ARBEIDSTAKER_FRA_NORGE = 'UTSENDT_ARBEIDSTAKER_FRA_NORGE',
    MOTTAR_UFØRETRYGD = 'MOTTAR_UFØRETRYGD',
    MOTTAR_PENSJON = 'MOTTAR_PENSJON',
    ARBEIDER_PÅ_NORSKREGISTRERT_SKIP = 'ARBEIDER_PÅ_NORSKREGISTRERT_SKIP',
    ARBEIDER_PÅ_NORSK_SOKKEL = 'ARBEIDER_PÅ_NORSK_SOKKEL',
    ARBEIDER_FOR_ET_NORSK_FLYSELSKAP = 'ARBEIDER_FOR_ET_NORSK_FLYSELSKAP',
    ARBEIDER_VED_UTENLANDSK_UTENRIKSSTASJON = 'ARBEIDER_VED_UTENLANDSK_UTENRIKSSTASJON',
    MOTTAR_UTBETALING_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET = 'MOTTAR_UTBETALING_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET',
    MOTTAR_UFØRETRYGD_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET = 'MOTTAR_UFØRETRYGD_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET',
    MOTTAR_PENSJON_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET = 'MOTTAR_PENSJON_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET',
    INAKTIV = 'INAKTIV',
}

export const kompetanseAktiviteter: Record<KompetanseAktivitet, string> = {
    ARBEIDER: 'Arbeider',
    SELVSTENDIG_NÆRINGSDRIVENDE: 'Selvstendig næringsdrivende',
    MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN: 'Mottar utbetaling som erstatter lønn',
    UTSENDT_ARBEIDSTAKER_FRA_NORGE: 'Utsendt arbeidstaker fra Norge',
    MOTTAR_UFØRETRYGD: 'Mottar uføretrygd',
    MOTTAR_PENSJON: 'Mottar pensjon',
    ARBEIDER_PÅ_NORSKREGISTRERT_SKIP: 'Arbeider på norskregistrert skip',
    ARBEIDER_PÅ_NORSK_SOKKEL: 'Arbeider på norsk sokkel',
    ARBEIDER_FOR_ET_NORSK_FLYSELSKAP: 'Arbeider for et norsk flyselskap',
    ARBEIDER_VED_UTENLANDSK_UTENRIKSSTASJON: 'Arbeider ved utenlandsk utenriksstasjon',
    MOTTAR_UTBETALING_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET:
        'Mottar utbetaling fra NAV under opphold i utlandet',
    MOTTAR_UFØRETRYGD_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET:
        'Mottar uføretrygd fra Norge under opphold i utlandet',
    MOTTAR_PENSJON_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET:
        'Mottar pensjon fra Norge under opphold i utlandet',
    INAKTIV: 'Inaktiv',

    I_ARBEID: 'I arbeid',
    FORSIKRET_I_BOSTEDSLAND: 'Forsikret i bostedsland',
    IKKE_AKTUELT: 'Ikke aktuelt',
    UTSENDT_ARBEIDSTAKER: 'Utsendt arbeidstaker',
};

export enum AnnenForelderAktivitet {
    I_ARBEID = 'I_ARBEID',
    MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN = 'MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN',
    FORSIKRET_I_BOSTEDSLAND = 'FORSIKRET_I_BOSTEDSLAND',
    MOTTAR_PENSJON = 'MOTTAR_PENSJON',
    INAKTIV = 'INAKTIV',
    IKKE_AKTUELT = 'IKKE_AKTUELT',
    UTSENDT_ARBEIDSTAKER = 'UTSENDT_ARBEIDSTAKER',
}

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

export interface IEøsPeriodeStatus {
    status: EøsPeriodeStatus;
}

export interface IRestEøsPeriode extends IEøsPeriodeStatus {
    id: number;
    fom: YearMonth;
    tom?: YearMonth;
    barnIdenter: string[];
}

export interface IRestKompetanse extends IRestEøsPeriode {
    søkersAktivitet?: KompetanseAktivitet;
    søkersAktivitetsland?: string;
    annenForeldersAktivitet?: KompetanseAktivitet;
    annenForeldersAktivitetsland?: string;
    barnetsBostedsland?: string;
    resultat?: KompetanseResultat;
    erAnnenForelderOmfattetAvNorskLovgivning?: boolean;
}

export interface IKompetanse extends IEøsPeriodeStatus {
    periodeId: string;
    id: number;
    initielFom: YearMonth;
    periode: IYearMonthPeriode;
    barnIdenter: OptionType[];
    søkersAktivitet: KompetanseAktivitet | undefined;
    søkersAktivitetsland: string | undefined;
    annenForeldersAktivitet: KompetanseAktivitet | undefined;
    annenForeldersAktivitetsland: string | undefined;
    barnetsBostedsland: string | undefined;
    resultat: KompetanseResultat | undefined;
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

export interface IRestUtenlandskPeriodeBeløp extends IRestEøsPeriode {
    beløp?: string;
    valutakode?: string;
    intervall?: UtenlandskPeriodeBeløpIntervall;
    kalkulertMånedligBeløp?: string;
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

export interface IRestValutakurs extends IRestEøsPeriode {
    valutakode?: string;
    valutakursdato?: IsoDatoString;
    kurs?: string;
}

export interface IValutakurs {
    periodeId: string;
    id: number;
    status: EøsPeriodeStatus;
    initielFom: YearMonth;
    periode: IPeriode;
    barnIdenter: OptionType[];
    valutakode: string | undefined;
    valutakursdato: Date | undefined;
    kurs: string | undefined;
}
