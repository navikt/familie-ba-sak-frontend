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

export enum VedtakBegrunnelseType {
    INNVILGET = 'INNVILGET',
    EØS_INNVILGET = 'EØS_INNVILGET',
    AVSLAG = 'AVSLAG',
    EØS_AVSLAG = 'EØS_AVSLAG',
    REDUKSJON = 'REDUKSJON',
    OPPHØR = 'OPPHØR',
    EØS_OPPHØR = 'EØS_OPPHØR',
    FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
    ENDRET_UTBETALING = 'ENDRET_UTBETALING',
    EØS_ENDRET_UTBETALING = 'EØS_ENDRET_UTBETALING',
    ETTER_ENDRET_UTBETALING = 'ETTER_ENDRET_UTBETALING',
    EØS_REDUKSJON = 'EØS_REDUKSJON',
    EØS_FORTSATT_INNVILGET = 'EØS_FORTSATT_INNVILGET',
    INSTITUSJON_INNVILGET = 'INSTITUSJON_INNVILGET',
    INSTITUSJON_REDUKSJON = 'INSTITUSJON_REDUKSJON',
    INSTITUSJON_AVSLAG = 'INSTITUSJON_AVSLAG',
    INSTITUSJON_OPPHØR = 'INSTITUSJON_OPPHØR',
    INSTITUSJON_FORTSATT_INNVILGET = 'INSTITUSJON_FORTSATT_INNVILGET',
}

export const vedtakBegrunnelseTyper: Record<VedtakBegrunnelseType, string> = {
    INNVILGET: 'Innvilgelse',
    EØS_INNVILGET: 'EØS - Innvilgelse',
    AVSLAG: 'Avslag',
    EØS_AVSLAG: 'EØS - Avslag',
    REDUKSJON: 'Reduksjon',
    OPPHØR: 'Opphør',
    EØS_OPPHØR: 'EØS - Opphør',
    FORTSATT_INNVILGET: 'Fortsatt innvilget',
    ENDRET_UTBETALING: 'Endret utbetaling',
    EØS_ENDRET_UTBETALING: 'EØS - Endret utbetaling',
    ETTER_ENDRET_UTBETALING: 'Etter endret utbetaling',
    EØS_REDUKSJON: 'EØS - Reduksjon',
    EØS_FORTSATT_INNVILGET: 'EØS - Fortsatt innvilget',
    INSTITUSJON_INNVILGET: 'Institusjon - innvilgelse',
    INSTITUSJON_REDUKSJON: 'Institusjon - reduksjon',
    INSTITUSJON_AVSLAG: 'Institusjon - avslag',
    INSTITUSJON_OPPHØR: 'Institusjon - opphør',
    INSTITUSJON_FORTSATT_INNVILGET: 'Institusjon - fortsatt innvilget',
};

export enum Standardbegrunnelse {
    REDUKSJON_SATSENDRING = 'Standardbegrunnelse$REDUKSJON_SATSENDRING',
    REDUKSJON_UNDER_6_ÅR = 'Standardbegrunnelse$REDUKSJON_UNDER_6_ÅR',
    REDUKSJON_UNDER_18_ÅR = 'Standardbegrunnelse$REDUKSJON_UNDER_18_ÅR',
    ETTER_ENDRET_UTBETALING_ETTERBETALING = 'Standardbegrunnelse$ETTER_ENDRET_UTBETALING_ETTERBETALING',
}

export interface IRestKorrigertEtterbetaling {
    årsak: KorrigertEtterbetalingÅrsak;
    beløp: number;
    begrunnelse: string;
}

export enum KorrigertEtterbetalingÅrsak {
    FEIL_TIDLIGERE_UTBETALT_BELØP = 'FEIL_TIDLIGERE_UTBETALT_BELØP',
    REFUSJON_FRA_UDI = 'REFUSJON_FRA_UDI',
    REFUSJON_FRA_ANDRE_MYNDIGHETER = 'REFUSJON_FRA_ANDRE_MYNDIGHETER',
    MOTREGNING = 'MOTREGNING',
}

export interface IRestKorrigertVedtak {
    vedtaksdato: IsoDatoString;
    begrunnelse: string | undefined;
}
