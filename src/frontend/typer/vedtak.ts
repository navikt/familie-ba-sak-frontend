import { IVedtaksperiodeMedBegrunnelser, Vedtaksperiodetype } from './vedtaksperiode';
import { VilkårType } from './vilkår';

export interface IVedtakForBehandling {
    aktiv: boolean;
    begrunnelser: IRestVedtakBegrunnelse[];
    avslagBegrunnelser: IRestAvslagbegrunnelser[];
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

export interface IRestAvslagbegrunnelser {
    fom?: string;
    tom?: string;
    brevBegrunnelser: string[];
}

export enum VedtakBegrunnelse {
    INNVILGET_BOSATT_I_RIKTET = 'INNVILGET_BOSATT_I_RIKTET',
    INNVILGET_BOSATT_I_RIKTET_LOVLIG_OPPHOLD = 'INNVILGET_BOSATT_I_RIKTET_LOVLIG_OPPHOLD',
    INNVILGET_LOVLIG_OPPHOLD_OPPHOLDSTILLATELSE = 'INNVILGET_LOVLIG_OPPHOLD_OPPHOLDSTILLATELSE',
    INNVILGET_LOVLIG_OPPHOLD_EØS_BORGER = 'INNVILGET_LOVLIG_OPPHOLD_EØS_BORGER',
    INNVILGET_LOVLIG_OPPHOLD_EØS_BORGER_SKJØNNSMESSIG_VURDERING = 'INNVILGET_LOVLIG_OPPHOLD_EØS_BORGER_SKJØNNSMESSIG_VURDERING',
    INNVILGET_OMSORG_FOR_BARN = 'INNVILGET_OMSORG_FOR_BARN',
    INNVILGET_BOR_HOS_SØKER = 'INNVILGET_BOR_HOS_SØKER',
    INNVILGET_NYFØDT_BARN_FØRSTE = 'INNVILGET_NYFØDT_BARN_FØRSTE',
    INNVILGET_NYFØDT_BARN = 'INNVILGET_NYFØDT_BARN',
    INNVILGET_FØDSELSHENDELSE_NYFØDT_BARN_FØRSTE = 'INNVILGET_FØDSELSHENDELSE_NYFØDT_BARN_FØRSTE',
    INNVILGET_FØDSELSHENDELSE_NYFØDT_BARN = 'INNVILGET_FØDSELSHENDELSE_NYFØDT_BARN',
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
    REDUKSJON_ENDRET_MOTTAKER = 'REDUKSJON_ENDRET_MOTTAKER',
    REDUKSJON_FRITEKST = 'REDUKSJON_FRITEKST',
    INNVILGET_SATSENDRING = 'INNVILGET_SATSENDRING',
    OPPHØR_BARN_FLYTTET_FRA_SØKER = 'OPPHØR_BARN_FLYTTET_FRA_SØKER',
    OPPHØR_SØKER_FLYTTET_FRA_BARN = 'OPPHØR_SØKER_FLYTTET_FRA_BARN',
    OPPHØR_BARN_DØD = 'OPPHØR_BARN_DØD',
    OPPHØR_SØKER_HAR_IKKE_FAST_OMSORG = 'OPPHØR_SØKER_HAR_IKKE_FAST_OMSORG',
    OPPHØR_DELT_BOSTED_OPPHØRT_ENIGHET = 'OPPHØR_DELT_BOSTED_OPPHØRT_ENIGHET',
    OPPHØR_DELT_BOSTED_OPPHØRT_UENIGHET = 'OPPHØR_DELT_BOSTED_OPPHØRT_UENIGHET',
    OPPHØR_ENDRET_MOTTAKER = 'OPPHØR_ENDRET_MOTTAKER',
    OPPHØR_UNDER_18_ÅR = 'OPPHØR_UNDER_18_ÅR',
    OPPHØR_FRITEKST = 'OPPHØR_FRITEKST',
    OPPHØR_IKKE_MOTTATT_OPPLYSNINGER = 'OPPHØR_IKKE_MOTTATT_OPPLYSNINGER',
    OPPHØR_UTVANDRET = 'OPPHØR_UTVANDRET',
    OPPHØR_HAR_IKKE_OPPHOLDSTILLATELSE = 'OPPHØR_HAR_IKKE_OPPHOLDSTILLATELSE',
    AVSLAG_BOSATT_I_RIKET = 'AVSLAG_BOSATT_I_RIKET',
    AVSLAG_LOVLIG_OPPHOLD_TREDJELANDSBORGER = 'AVSLAG_LOVLIG_OPPHOLD_TREDJELANDSBORGER',
    AVSLAG_BOR_HOS_SØKER = 'AVSLAG_BOR_HOS_SØKER',
    AVSLAG_OMSORG_FOR_BARN = 'AVSLAG_OMSORG_FOR_BARN',
    AVSLAG_LOVLIG_OPPHOLD_EØS_BORGER = 'AVSLAG_LOVLIG_OPPHOLD_EØS_BORGER',
    AVSLAG_LOVLIG_OPPHOLD_SKJØNNSMESSIG_VURDERING_TREDJELANDSBORGER = 'AVSLAG_LOVLIG_OPPHOLD_SKJØNNSMESSIG_VURDERING_TREDJELANDSBORGER',
    AVSLAG_MEDLEM_I_FOLKETRYGDEN = 'AVSLAG_MEDLEM_I_FOLKETRYGDEN',
    AVSLAG_FORELDRENE_BOR_SAMMEN = 'AVSLAG_FORELDRENE_BOR_SAMMEN',
    AVSLAG_UNDER_18_ÅR = 'AVSLAG_UNDER_18_ÅR',
    AVSLAG_UGYLDIG_AVTALE_OM_DELT_BOSTED = 'AVSLAG_UGYLDIG_AVTALE_OM_DELT_BOSTED',
    AVSLAG_IKKE_AVTALE_OM_DELT_BOSTED = 'AVSLAG_IKKE_AVTALE_OM_DELT_BOSTED',
    AVSLAG_OPPLYSNINGSPLIKT = 'AVSLAG_OPPLYSNINGSPLIKT',
    AVSLAG_SÆRKULLSBARN = 'AVSLAG_OPPLYSNINGSPLIKT',
    AVSLAG_FRITEKST = 'AVSLAG_FRITEKST',
    FORTSATT_INNVILGET_SØKER_OG_BARN_BOSATT_I_RIKET = 'FORTSATT_INNVILGET_SØKER_OG_BARN_BOSATT_I_RIKET',
    FORTSATT_INNVILGET_SØKER_BOSATT_I_RIKET = 'FORTSATT_INNVILGET_SØKER_BOSATT_I_RIKET',
    FORTSATT_INNVILGET_BARN_BOSATT_I_RIKET = 'FORTSATT_INNVILGET_BARN_BOSATT_I_RIKET',
    FORTSATT_INNVILGET_BARN_OG_SØKER_LOVLIG_OPPHOLD_OPPHOLDSTILLATELSE = 'FORTSATT_INNVILGET_BARN_OG_SØKER_LOVLIG_OPPHOLD_OPPHOLDSTILLATELSE',
    FORTSATT_INNVILGET_SØKER_LOVLIG_OPPHOLD_OPPHOLDSTILLATELSE = 'FORTSATT_INNVILGET_SØKER_LOVLIG_OPPHOLD_OPPHOLDSTILLATELSE',
    FORTSATT_INNVILGET_BARN_LOVLIG_OPPHOLD_OPPHOLDSTILLATELSE = 'FORTSATT_INNVILGET_BARN_LOVLIG_OPPHOLD_OPPHOLDSTILLATELSE',
    FORTSATT_INNVILGET_BOR_MED_SØKER = 'FORTSATT_INNVILGET_BOR_MED_SØKER',
    FORTSATT_INNVILGET_FAST_OMSORG = 'FORTSATT_INNVILGET_FAST_OMSORG',
    FORTSATT_INNVILGET_LOVLIG_OPPHOLD_EØS = 'FORTSATT_INNVILGET_LOVLIG_OPPHOLD_EØS',
    FORTSATT_INNVILGET_LOVLIG_OPPHOLD_TREDJELANDSBORGER = 'FORTSATT_INNVILGET_LOVLIG_OPPHOLD_TREDJELANDSBORGER',
    FORTSATT_INNVILGET_FRITEKST = 'FORTSATT_INNVILGET_FRITEKST',
}

export enum VedtakBegrunnelseType {
    INNVILGELSE = 'INNVILGELSE',
    AVSLAG = 'AVSLAG',
    REDUKSJON = 'REDUKSJON',
    OPPHØR = 'OPPHØR',
    FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
}

export const vedtakBegrunnelseTyper: Record<VedtakBegrunnelseType, string> = {
    INNVILGELSE: 'Innvilgelse',
    AVSLAG: 'Avslag',
    REDUKSJON: 'Reduksjon',
    OPPHØR: 'Opphør',
    FORTSATT_INNVILGET: 'Fortsatt innvilget',
};

export const vedtaksbegrunnelsetypeTilVedtaksperiodetype = (
    vedtaksbegrunnelsetype: VedtakBegrunnelseType
) => {
    switch (vedtaksbegrunnelsetype) {
        case VedtakBegrunnelseType.INNVILGELSE:
        case VedtakBegrunnelseType.REDUKSJON:
            return Vedtaksperiodetype.UTBETALING;
        case VedtakBegrunnelseType.AVSLAG:
            return Vedtaksperiodetype.AVSLAG;
        case VedtakBegrunnelseType.FORTSATT_INNVILGET:
            return Vedtaksperiodetype.FORTSATT_INNVILGET;
        default:
            throw new Error('Ukjent vedtaksbegrunnelsetype');
    }
};
