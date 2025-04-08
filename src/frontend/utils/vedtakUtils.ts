import {
    ABorderDanger,
    ABorderDefault,
    ABorderSubtle,
    ABorderSuccess,
    ABorderWarning,
    ASurfaceActionSubtle,
    ASurfaceDangerSubtle,
    ASurfaceNeutralSubtle,
    ASurfaceSuccessSubtle,
    ASurfaceWarningSubtle,
} from '@navikt/ds-tokens/dist/tokens';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { BehandlingResultat } from '../typer/behandling';
import type { IRestVedtakBegrunnelseTilknyttetVilkår, VedtakBegrunnelse } from '../typer/vedtak';
import { VedtakBegrunnelseType } from '../typer/vedtak';
import type { AlleBegrunnelser } from '../typer/vilkår';

export const finnVedtakBegrunnelseType = (
    alleBegrunnelserRessurs: Ressurs<AlleBegrunnelser>,
    vedtakBegrunnelse: VedtakBegrunnelse
): VedtakBegrunnelseType | undefined => {
    return alleBegrunnelserRessurs.status === RessursStatus.SUKSESS
        ? (Object.keys(alleBegrunnelserRessurs.data).find(vedtakBegrunnelseType => {
              return (
                  alleBegrunnelserRessurs.data[vedtakBegrunnelseType as VedtakBegrunnelseType].find(
                      (vedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                          vedtakBegrunnelseTilknyttetVilkår.id === vedtakBegrunnelse
                  ) !== undefined
              );
          }) as VedtakBegrunnelseType)
        : undefined;
};

export const hentBakgrunnsfarge = (vedtakBegrunnelseType?: VedtakBegrunnelseType) => {
    switch (vedtakBegrunnelseType) {
        case VedtakBegrunnelseType.INNVILGET:
        case VedtakBegrunnelseType.FORTSATT_INNVILGET:
        case VedtakBegrunnelseType.INSTITUSJON_INNVILGET:
        case VedtakBegrunnelseType.INSTITUSJON_FORTSATT_INNVILGET:
            return ASurfaceSuccessSubtle;
        case VedtakBegrunnelseType.AVSLAG:
        case VedtakBegrunnelseType.INSTITUSJON_AVSLAG:
            return ASurfaceDangerSubtle;
        case VedtakBegrunnelseType.REDUKSJON:
        case VedtakBegrunnelseType.INSTITUSJON_REDUKSJON:
            return ASurfaceWarningSubtle;
        case VedtakBegrunnelseType.OPPHØR:
        case VedtakBegrunnelseType.INSTITUSJON_OPPHØR:
            return ASurfaceNeutralSubtle;
        default:
            return ASurfaceActionSubtle;
    }
};

export const hentBorderfarge = (vedtakBegrunnelseType?: VedtakBegrunnelseType) => {
    switch (vedtakBegrunnelseType) {
        case VedtakBegrunnelseType.INNVILGET:
        case VedtakBegrunnelseType.FORTSATT_INNVILGET:
        case VedtakBegrunnelseType.INSTITUSJON_INNVILGET:
        case VedtakBegrunnelseType.INSTITUSJON_FORTSATT_INNVILGET:
            return ABorderSuccess;
        case VedtakBegrunnelseType.AVSLAG:
        case VedtakBegrunnelseType.INSTITUSJON_AVSLAG:
            return ABorderDanger;
        case VedtakBegrunnelseType.REDUKSJON:
        case VedtakBegrunnelseType.INSTITUSJON_REDUKSJON:
            return ABorderWarning;
        case VedtakBegrunnelseType.OPPHØR:
        case VedtakBegrunnelseType.INSTITUSJON_OPPHØR:
            return ABorderDefault;
        default:
            return ABorderSubtle;
    }
};

export const vedtakHarFortsattUtbetaling = (behandlingResultat: BehandlingResultat) =>
    [
        BehandlingResultat.INNVILGET,
        BehandlingResultat.INNVILGET_OG_OPPHØRT,
        BehandlingResultat.INNVILGET_OG_ENDRET,
        BehandlingResultat.INNVILGET_ENDRET_OG_OPPHØRT,
        BehandlingResultat.ENDRET_OG_FORTSATT_INNVILGET,
        BehandlingResultat.DELVIS_INNVILGET,
        BehandlingResultat.DELVIS_INNVILGET_OG_OPPHØRT,
        BehandlingResultat.DELVIS_INNVILGET_OG_ENDRET,
        BehandlingResultat.DELVIS_INNVILGET_ENDRET_OG_OPPHØRT,
        BehandlingResultat.AVSLÅTT_OG_ENDRET,
        BehandlingResultat.AVSLÅTT_ENDRET_OG_OPPHØRT,
        BehandlingResultat.ENDRET_UTBETALING,
        BehandlingResultat.ENDRET_OG_OPPHØRT,
        BehandlingResultat.FORTSATT_INNVILGET,
    ].includes(behandlingResultat);
