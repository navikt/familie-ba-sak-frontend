import type { OptionType } from './common';
import type { IIsoDatoPeriode, IIsoMånedPeriode, IsoDatoString, IsoMånedString } from '../utils/dato';
export type KompetanseAktivitet = SøkersAktivitet | AnnenForelderAktivitet;
export declare enum SøkersAktivitet {
    ARBEIDER = "ARBEIDER",
    SELVSTENDIG_NÆRINGSDRIVENDE = "SELVSTENDIG_N\u00C6RINGSDRIVENDE",
    MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN = "MOTTAR_UTBETALING_SOM_ERSTATTER_L\u00D8NN",
    UTSENDT_ARBEIDSTAKER_FRA_NORGE = "UTSENDT_ARBEIDSTAKER_FRA_NORGE",
    MOTTAR_UFØRETRYGD = "MOTTAR_UF\u00D8RETRYGD",
    MOTTAR_PENSJON = "MOTTAR_PENSJON",
    ARBEIDER_PÅ_NORSKREGISTRERT_SKIP = "ARBEIDER_P\u00C5_NORSKREGISTRERT_SKIP",
    ARBEIDER_PÅ_NORSK_SOKKEL = "ARBEIDER_P\u00C5_NORSK_SOKKEL",
    ARBEIDER_FOR_ET_NORSK_FLYSELSKAP = "ARBEIDER_FOR_ET_NORSK_FLYSELSKAP",
    ARBEIDER_VED_UTENLANDSK_UTENRIKSSTASJON = "ARBEIDER_VED_UTENLANDSK_UTENRIKSSTASJON",
    MOTTAR_UTBETALING_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET = "MOTTAR_UTBETALING_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET",
    MOTTAR_UFØRETRYGD_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET = "MOTTAR_UF\u00D8RETRYGD_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET",
    MOTTAR_PENSJON_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET = "MOTTAR_PENSJON_FRA_NAV_UNDER_OPPHOLD_I_UTLANDET",
    INAKTIV = "INAKTIV"
}
export declare const kompetanseAktiviteter: Record<KompetanseAktivitet, string>;
export declare enum AnnenForelderAktivitet {
    I_ARBEID = "I_ARBEID",
    MOTTAR_UTBETALING_SOM_ERSTATTER_LØNN = "MOTTAR_UTBETALING_SOM_ERSTATTER_L\u00D8NN",
    FORSIKRET_I_BOSTEDSLAND = "FORSIKRET_I_BOSTEDSLAND",
    MOTTAR_PENSJON = "MOTTAR_PENSJON",
    INAKTIV = "INAKTIV",
    IKKE_AKTUELT = "IKKE_AKTUELT",
    UTSENDT_ARBEIDSTAKER = "UTSENDT_ARBEIDSTAKER"
}
export declare enum KompetanseResultat {
    NORGE_ER_PRIMÆRLAND = "NORGE_ER_PRIM\u00C6RLAND",
    NORGE_ER_SEKUNDÆRLAND = "NORGE_ER_SEKUND\u00C6RLAND",
    TO_PRIMÆRLAND = "TO_PRIM\u00C6RLAND",
    NASJONAL_RETT_DIFFERANSEBEREGNING = "NASJONAL_RETT_DIFFERANSEBEREGNING"
}
export declare const kompetanseResultater: Record<KompetanseResultat, string>;
export declare enum EøsPeriodeStatus {
    IKKE_UTFYLT = "IKKE_UTFYLT",
    UFULLSTENDIG = "UFULLSTENDIG",
    OK = "OK"
}
export interface IEøsPeriodeStatus {
    status: EøsPeriodeStatus;
}
export interface IRestEøsPeriode extends IEøsPeriodeStatus {
    id: number;
    fom: IsoMånedString;
    tom?: IsoMånedString;
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
    initielFom: IsoMånedString;
    periode: IIsoMånedPeriode;
    barnIdenter: OptionType[];
    søkersAktivitet: KompetanseAktivitet | undefined;
    søkersAktivitetsland: string | undefined;
    annenForeldersAktivitet: KompetanseAktivitet | undefined;
    annenForeldersAktivitetsland: string | undefined;
    barnetsBostedsland: string | undefined;
    resultat: KompetanseResultat | undefined;
}
export declare enum UtenlandskPeriodeBeløpIntervall {
    ÅRLIG = "\u00C5RLIG",
    KVARTALSVIS = "KVARTALSVIS",
    MÅNEDLIG = "M\u00C5NEDLIG",
    UKENTLIG = "UKENTLIG"
}
export declare const utenlandskPeriodeBeløpIntervaller: Record<UtenlandskPeriodeBeløpIntervall, string>;
export interface IRestUtenlandskPeriodeBeløp extends IRestEøsPeriode {
    beløp?: string;
    valutakode?: string;
    intervall?: UtenlandskPeriodeBeløpIntervall;
    kalkulertMånedligBeløp?: string;
    utbetalingsland?: string;
}
export interface IUtenlandskPeriodeBeløp {
    periodeId: string;
    id: number;
    status: EøsPeriodeStatus;
    initielFom: IsoMånedString;
    periode: IIsoMånedPeriode;
    barnIdenter: OptionType[];
    beløp?: string | undefined;
    valutakode?: string | undefined;
    intervall?: UtenlandskPeriodeBeløpIntervall | undefined;
    utbetalingsland: string | undefined;
}
export declare enum Vurderingsform {
    MANUELL = "MANUELL",
    AUTOMATISK = "AUTOMATISK",
    IKKE_VURDERT = "IKKE_VURDERT"
}
export interface IRestValutakurs extends IRestEøsPeriode {
    valutakode?: string;
    valutakursdato?: IsoDatoString;
    kurs?: string;
    vurderingsform?: Vurderingsform;
}
export interface IValutakurs {
    periodeId: string;
    id: number;
    status: EøsPeriodeStatus;
    initielFom: IsoMånedString;
    periode: IIsoDatoPeriode;
    barnIdenter: OptionType[];
    valutakode: string | undefined;
    valutakursdato: Date | undefined;
    kurs: string | undefined;
}
