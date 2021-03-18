import navFarger from 'nav-frontend-core';

import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { Vilkårsbegrunnelser, VilkårType } from './vilkår';

export interface IVedtakForBehandling {
    aktiv: boolean;
    begrunnelser: IRestVedtakBegrunnelse[];
    vedtaksdato: string;
    id: number;
}

export interface IRestVedtakBegrunnelse {
    begrunnelse?: VedtakBegrunnelse;
    begrunnelseType?: VedtakBegrunnelseType;
    fom: string;
    id?: number;
    tom?: string;
}

export interface IRestPostVedtakBegrunnelse {
    fom: string;
    tom?: string;
    vedtakBegrunnelse: VedtakBegrunnelse;
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
    OPPHØR_BARN_FLYTTET_FRA_SØKER = 'OPPHØR_BARN_FLYTTET_FRA_SØKER',
    OPPHØR_SØKER_FLYTTET_FRA_BARN = 'OPPHØR_SØKER_FLYTTET_FRA_BARN',
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
}

export enum VedtakBegrunnelseType {
    INNVILGELSE = 'INNVILGELSE',
    AVSLAG = 'AVSLAG',
    REDUKSJON = 'REDUKSJON',
    OPPHØR = 'OPPHØR',
}

export const vedtakBegrunnelseTyper: Record<VedtakBegrunnelseType, string> = {
    INNVILGELSE: 'Innvilgelse',
    AVSLAG: 'Avslag',
    REDUKSJON: 'Reduksjon',
    OPPHØR: 'Opphør',
};

export const finnVedtakBegrunnelseType = (
    vilkårBegrunnelser: Ressurs<Vilkårsbegrunnelser>,
    vedtakBegrunnelse: VedtakBegrunnelse
): VedtakBegrunnelseType | undefined => {
    return vilkårBegrunnelser.status === RessursStatus.SUKSESS
        ? (Object.keys(vilkårBegrunnelser.data).find(vedtakBegrunnelseType => {
              return (
                  vilkårBegrunnelser.data[vedtakBegrunnelseType as VedtakBegrunnelseType].find(
                      (vedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                          vedtakBegrunnelseTilknyttetVilkår.id === vedtakBegrunnelse
                  ) !== undefined
              );
          }) as VedtakBegrunnelseType)
        : undefined;
};

export const finnVedtakBegrunnelseVilkår = (
    vilkårBegrunnelser: Ressurs<Vilkårsbegrunnelser>,
    vedtakBegrunnelse: VedtakBegrunnelse
): VilkårType | undefined => {
    if (vilkårBegrunnelser.status === RessursStatus.SUKSESS) {
        Object.keys(vilkårBegrunnelser.data).forEach(vedtakBegrunnelseType => {
            const match = vilkårBegrunnelser.data[
                vedtakBegrunnelseType as VedtakBegrunnelseType
            ].find(
                (vedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                    vedtakBegrunnelseTilknyttetVilkår.id === vedtakBegrunnelse
            );
            if (match !== undefined) return match.vilkår;
        });
    }
    return undefined;
};

export const hentBakgrunnsfarge = (vedtakBegrunnelseType?: VedtakBegrunnelseType) => {
    switch (vedtakBegrunnelseType) {
        case VedtakBegrunnelseType.INNVILGELSE:
            return navFarger.navGronnLighten80;
        case VedtakBegrunnelseType.AVSLAG:
            return navFarger.navRodLighten80;
        case VedtakBegrunnelseType.REDUKSJON:
            return navFarger.navOransjeLighten80;
        case VedtakBegrunnelseType.OPPHØR:
            return navFarger.navLysGra;
        default:
            return navFarger.navBlaLighten80;
    }
};

export const hentBorderfarge = (vedtakBegrunnelseType?: VedtakBegrunnelseType) => {
    switch (vedtakBegrunnelseType) {
        case VedtakBegrunnelseType.INNVILGELSE:
            return navFarger.navGronn;
        case VedtakBegrunnelseType.AVSLAG:
            return navFarger.navRodDarken20;
        case VedtakBegrunnelseType.REDUKSJON:
            return navFarger.navOransjeDarken20;
        case VedtakBegrunnelseType.OPPHØR:
            return navFarger.navGra60;
        default:
            return navFarger.navBlaLighten80;
    }
};
