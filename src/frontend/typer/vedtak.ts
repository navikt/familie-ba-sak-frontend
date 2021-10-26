import { IVedtaksperiodeMedBegrunnelser, Vedtaksperiodetype } from './vedtaksperiode';
import { VilkårType } from './vilkår';

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
    AVSLAG = 'AVSLAG',
    REDUKSJON = 'REDUKSJON',
    OPPHØR = 'OPPHØR',
    FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
    ETTER_ENDRET_UTBETALING = 'ETTER_ENDRET_UTBETALING',
}

export const vedtakBegrunnelseTyper: Record<VedtakBegrunnelseType, string> = {
    INNVILGET: 'Innvilgelse',
    AVSLAG: 'Avslag',
    REDUKSJON: 'Reduksjon',
    OPPHØR: 'Opphør',
    FORTSATT_INNVILGET: 'Fortsatt innvilget',
    ETTER_ENDRET_UTBETALING: 'Etter endret utbetaling',
};
