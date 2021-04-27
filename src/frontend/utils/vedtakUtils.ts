import navFarger from 'nav-frontend-core';

import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import {
    IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelse,
    VedtakBegrunnelseType,
} from '../typer/vedtak';
import { Vilkårsbegrunnelser, VilkårType } from '../typer/vilkår';

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
