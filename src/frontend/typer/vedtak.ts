import { IPersonBeregning } from './beregning';
import { INøkkelPar } from './common';

export interface IVedtakForBehandling {
    aktiv: boolean;
    personBeregninger: IPersonBeregning[];
    utbetalingBegrunnelser: IRestUtbetalingBegrunnelse[];
    vedtaksdato: string;
    id: number;
    begrunnelse: VedtakBegrunnelseType;
}

export interface IRestUtbetalingBegrunnelse {
    id?: number;
    fom: string;
    tom?: string;
    vedtakBegrunnelseType?: VedtakBegrunnelseType;
    vedtakBegrunnelse?: VedtakBegrunnelse;
}

export interface IRestPutUtbetalingBegrunnelse {
    vedtakBegrunnelseType?: VedtakBegrunnelseType;
    vedtakBegrunnelse?: VedtakBegrunnelse;
}

export interface IRestVedtakBegrunnelse {
    id: VedtakBegrunnelse;
    navn: string;
}

export enum VedtakBegrunnelse {
    INNVILGET_BOSATT_I_RIKTET = 'INNVILGET_BOSATT_I_RIKTET',
    INNVILGET_LOVLIG_OPPHOLD_OPPHOLDSTILLATELSE = 'INNVILGET_LOVLIG_OPPHOLD_OPPHOLDSTILLATELSE',
    INNVILGET_LOVLIG_OPPHOLD_EØS_BORGER = 'INNVILGET_LOVLIG_OPPHOLD_EØS_BORGER',
    INNVILGET_LOVLIG_OPPHOLD_EØS_BORGER_SKJØNNSMESSIG_VURDERING = 'INNVILGET_LOVLIG_OPPHOLD_EØS_BORGER_SKJØNNSMESSIG_VURDERING',
    INNVILGET_OMSORG_FOR_BARN = 'INNVILGET_OMSORG_FOR_BARN',
    INNVILGET_BOR_HOS_SØKER = 'INNVILGET_BOR_HOS_SØKER',
    INNVILGET_FAST_OMSORG_FOR_BARN = 'INNVILGET_FAST_OMSORG_FOR_BARN',
    REDUKSJON_BOSATT_I_RIKTET = 'REDUKSJON_BOSATT_I_RIKTET',
    REDUKSJON_LOVLIG_OPPHOLD_OPPHOLDSTILLATELSE_BARN = 'REDUKSJON_LOVLIG_OPPHOLD_OPPHOLDSTILLATELSE_BARN',
    REDUKSJON_FLYTTET_FORELDER = 'REDUKSJON_FLYTTET_FORELDER',
    REDUKSJON_FLYTTET_BARN = 'REDUKSJON_FLYTTET_BARN',
    REDUKSJON_BARN_DØD = 'REDUKSJON_BARN_DØD',
    REDUKSJON_FAST_OMSORG_FOR_BARN = 'REDUKSJON_FAST_OMSORG_FOR_BARN',
    REDUKSJON_MANGLENDE_OPPLYSNINGER = 'REDUKSJON_MANGLENDE_OPPLYSNINGER',
    REDUKSJON_UNDER_18_ÅR = 'REDUKSJON_UNDER_18_ÅR',
    REDUKSJON_UNDER_6_ÅR = 'REDUKSJON_UNDER_6_ÅR',
    REDUKSJON_DELT_BOSTED_ENIGHET = 'REDUKSJON_DELT_BOSTED_ENIGHET',
    REDUKSJON_DELT_BOSTED_UENIGHET = 'REDUKSJON_DELT_BOSTED_UENIGHET',
    INNVILGET_SATSENDRING = 'INNVILGET_SATSENDRING',
}

export const begrunnelsetyper: INøkkelPar = {
    INNVILGELSE: {
        id: 'INNVILGELSE',
        navn: 'Innvilgelse',
    },
    REDUKSJON: {
        id: 'REDUKSJON',
        navn: 'Reduksjon',
    },
};

export enum VedtakBegrunnelseType {
    INNVILGELSE = 'INNVILGELSE',
    REDUKSJON = 'REDUKSJON',
}
