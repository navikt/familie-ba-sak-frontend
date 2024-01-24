import { addMonths, isBefore, startOfMonth } from 'date-fns';

import {
    ABorderDanger,
    ABorderDefault,
    ABorderInfo,
    ABorderSuccess,
    ABorderWarning,
    ASurfaceDangerSubtle,
    ASurfaceInfoSubtle,
    ASurfaceNeutralSubtle,
    ASurfaceSuccessSubtle,
    ASurfaceWarningSubtle,
} from '@navikt/ds-tokens/dist/tokens';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { dagensDato, isoStringTilDateMedFallback, tidenesMorgen } from './dato';
import { BehandlingResultat, BehandlingStatus } from '../typer/behandling';
import type { IRestVedtakBegrunnelseTilknyttetVilkår, VedtakBegrunnelse } from '../typer/vedtak';
import { VedtakBegrunnelseType } from '../typer/vedtak';
import type { IVedtaksperiodeMedBegrunnelser } from '../typer/vedtaksperiode';
import type { VedtaksbegrunnelseTekster } from '../typer/vilkår';

export const filtrerOgSorterPerioderMedBegrunnelseBehov = (
    vedtaksperioder: IVedtaksperiodeMedBegrunnelser[],
    behandlingStatus: BehandlingStatus
): IVedtaksperiodeMedBegrunnelser[] => {
    return vedtaksperioder.slice().filter((vedtaksperiode: IVedtaksperiodeMedBegrunnelser) => {
        if (behandlingStatus === BehandlingStatus.AVSLUTTET) {
            return harPeriodeBegrunnelse(vedtaksperiode);
        } else {
            return erPeriodeFomMindreEnn2MndFramITid(vedtaksperiode);
        }
    });
};

const erPeriodeFomMindreEnn2MndFramITid = (vedtaksperiode: IVedtaksperiodeMedBegrunnelser) => {
    const periodeFom = isoStringTilDateMedFallback({
        isoString: vedtaksperiode.fom,
        fallbackDate: tidenesMorgen,
    });
    const toMånederFremITid = addMonths(startOfMonth(dagensDato), 2);
    return isBefore(periodeFom, toMånederFremITid);
};

const harPeriodeBegrunnelse = (vedtaksperiode: IVedtaksperiodeMedBegrunnelser) => {
    return !!vedtaksperiode.begrunnelser.length || !!vedtaksperiode.fritekster.length;
};

export const finnVedtakBegrunnelseType = (
    vilkårBegrunnelser: Ressurs<VedtaksbegrunnelseTekster>,
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
            return ASurfaceInfoSubtle;
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
            return ABorderInfo;
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
