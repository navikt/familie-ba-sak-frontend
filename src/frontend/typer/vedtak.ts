import type { IVedtaksperiodeMedBegrunnelser, Vedtaksperiodetype } from './vedtaksperiode';
import type { VilkårType } from './vilkår';

export interface IVedtakForBehandling {
    aktiv: boolean;
    vedtaksdato: string;
    vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[];
    id: number;
}

export interface IRestVedtakBegrunnelse {
    begrunnelse?: VedtakBegrunnelse;
    begrunnelseType?: VedtakBegrunnelseType;
    brevBegrunnelse?: string;
    fom: string;
    id?: number;
    tom?: string;
}

export interface IRestPostFritekstVedtakBegrunnelser {
    fom?: string;
    tom?: string;
    fritekster: string[];
    vedtaksperiodetype: Vedtaksperiodetype;
}

export interface IRestDeleteVedtakBegrunnelser {
    fom: string;
    tom?: string;
    vedtakbegrunnelseTyper: VedtakBegrunnelseType[];
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
    REDUKSJON = 'REDUKSJON',
    OPPHØR = 'OPPHØR',
    EØS_OPPHØR = 'EØS_OPPHØR',
    FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
    ENDRET_UTBETALING = 'ENDRET_UTBETALING',
    ETTER_ENDRET_UTBETALING = 'ETTER_ENDRET_UTBETALING',
}

export const vedtakBegrunnelseTyper: Record<VedtakBegrunnelseType, string> = {
    INNVILGET: 'Innvilgelse',
    EØS_INNVILGET: 'EØS - Innvilgelse',
    AVSLAG: 'Avslag',
    REDUKSJON: 'Reduksjon',
    OPPHØR: 'Opphør',
    EØS_OPPHØR: 'EØS - Opphør',
    FORTSATT_INNVILGET: 'Fortsatt innvilget',
    ENDRET_UTBETALING: 'Endret utbetaling',
    ETTER_ENDRET_UTBETALING: 'Etter endret utbetaling',
};

export enum Standardbegrunnelse {
    REDUKSJON_SATSENDRING = 'REDUKSJON_SATSENDRING',
    REDUKSJON_UNDER_6_ÅR = 'REDUKSJON_UNDER_6_ÅR',
    REDUKSJON_UNDER_18_ÅR = 'REDUKSJON_UNDER_18_ÅR',
    ETTER_ENDRET_UTBETALING_ETTERBETALING = 'ETTER_ENDRET_UTBETALING_ETTERBETALING',
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
