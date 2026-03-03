import type { VilkårType } from './vilkår';
import type { IsoDatoString } from '../utils/dato';
export interface IVedtakForBehandling {
    aktiv: boolean;
    vedtaksdato: string;
    id: number;
}
export interface IRestVedtakBegrunnelseTilknyttetVilkår {
    id: VedtakBegrunnelse;
    navn: string;
    vilkår?: VilkårType;
}
export type VedtakBegrunnelse = string;
export declare enum VedtakBegrunnelseType {
    INNVILGET = "INNVILGET",
    EØS_INNVILGET = "E\u00D8S_INNVILGET",
    AVSLAG = "AVSLAG",
    EØS_AVSLAG = "E\u00D8S_AVSLAG",
    REDUKSJON = "REDUKSJON",
    OPPHØR = "OPPH\u00D8R",
    EØS_OPPHØR = "E\u00D8S_OPPH\u00D8R",
    FORTSATT_INNVILGET = "FORTSATT_INNVILGET",
    ENDRET_UTBETALING = "ENDRET_UTBETALING",
    EØS_ENDRET_UTBETALING = "E\u00D8S_ENDRET_UTBETALING",
    ETTER_ENDRET_UTBETALING = "ETTER_ENDRET_UTBETALING",
    EØS_REDUKSJON = "E\u00D8S_REDUKSJON",
    EØS_FORTSATT_INNVILGET = "E\u00D8S_FORTSATT_INNVILGET",
    INSTITUSJON_INNVILGET = "INSTITUSJON_INNVILGET",
    INSTITUSJON_REDUKSJON = "INSTITUSJON_REDUKSJON",
    INSTITUSJON_AVSLAG = "INSTITUSJON_AVSLAG",
    INSTITUSJON_OPPHØR = "INSTITUSJON_OPPH\u00D8R",
    INSTITUSJON_FORTSATT_INNVILGET = "INSTITUSJON_FORTSATT_INNVILGET"
}
export declare const vedtakBegrunnelseTyper: Record<VedtakBegrunnelseType, string>;
export declare enum Standardbegrunnelse {
    REDUKSJON_SATSENDRING = "Standardbegrunnelse$REDUKSJON_SATSENDRING",
    REDUKSJON_UNDER_6_ÅR = "Standardbegrunnelse$REDUKSJON_UNDER_6_\u00C5R",
    REDUKSJON_UNDER_18_ÅR = "Standardbegrunnelse$REDUKSJON_UNDER_18_\u00C5R",
    ETTER_ENDRET_UTBETALING_ETTERBETALING = "Standardbegrunnelse$ETTER_ENDRET_UTBETALING_ETTERBETALING"
}
export interface IRestKorrigertEtterbetaling {
    årsak: KorrigertEtterbetalingÅrsak;
    beløp: number;
    begrunnelse: string;
}
export declare enum KorrigertEtterbetalingÅrsak {
    FEIL_TIDLIGERE_UTBETALT_BELØP = "FEIL_TIDLIGERE_UTBETALT_BEL\u00D8P",
    REFUSJON_FRA_UDI = "REFUSJON_FRA_UDI",
    REFUSJON_FRA_ANDRE_MYNDIGHETER = "REFUSJON_FRA_ANDRE_MYNDIGHETER",
    MOTREGNING = "MOTREGNING"
}
export interface IRestKorrigertVedtak {
    vedtaksdato: IsoDatoString;
    begrunnelse: string | undefined;
}
