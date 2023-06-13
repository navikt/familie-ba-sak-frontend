import {
    ABlue100,
    AGray100,
    AGray600,
    AGreen100,
    AGreen500,
    AOrange100,
    AOrange600,
    ARed50,
    ARed600,
} from '@navikt/ds-tokens/dist/tokens';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { BehandlingResultat, BehandlingStatus } from '../typer/behandling';
import type { IRestVedtakBegrunnelseTilknyttetVilkår, VedtakBegrunnelse } from '../typer/vedtak';
import { VedtakBegrunnelseType } from '../typer/vedtak';
import type { IVedtaksperiodeMedBegrunnelser } from '../typer/vedtaksperiode';
import type { VedtaksbegrunnelseTekster } from '../typer/vilkår';
import {
    førsteDagIInneværendeMåned,
    kalenderDatoMedFallback,
    kalenderDatoTilDate,
    kalenderDiff,
    KalenderEnhet,
    leggTil,
    TIDENES_MORGEN,
} from './kalender';

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
    const periodeFom = kalenderDatoMedFallback(vedtaksperiode.fom, TIDENES_MORGEN);
    const toMånederFremITid = leggTil(førsteDagIInneværendeMåned(), 2, KalenderEnhet.MÅNED);
    return (
        kalenderDiff(kalenderDatoTilDate(periodeFom), kalenderDatoTilDate(toMånederFremITid)) < 0
    );
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
            return AGreen100;
        case VedtakBegrunnelseType.AVSLAG:
        case VedtakBegrunnelseType.INSTITUSJON_AVSLAG:
            return ARed50;
        case VedtakBegrunnelseType.REDUKSJON:
        case VedtakBegrunnelseType.INSTITUSJON_REDUKSJON:
            return AOrange100;
        case VedtakBegrunnelseType.OPPHØR:
        case VedtakBegrunnelseType.INSTITUSJON_OPPHØR:
            return AGray100;
        default:
            return ABlue100;
    }
};

export const hentBorderfarge = (vedtakBegrunnelseType?: VedtakBegrunnelseType) => {
    switch (vedtakBegrunnelseType) {
        case VedtakBegrunnelseType.INNVILGET:
        case VedtakBegrunnelseType.FORTSATT_INNVILGET:
        case VedtakBegrunnelseType.INSTITUSJON_INNVILGET:
        case VedtakBegrunnelseType.INSTITUSJON_FORTSATT_INNVILGET:
            return AGreen500;
        case VedtakBegrunnelseType.AVSLAG:
        case VedtakBegrunnelseType.INSTITUSJON_AVSLAG:
            return ARed600;
        case VedtakBegrunnelseType.REDUKSJON:
        case VedtakBegrunnelseType.INSTITUSJON_REDUKSJON:
            return AOrange600;
        case VedtakBegrunnelseType.OPPHØR:
        case VedtakBegrunnelseType.INSTITUSJON_OPPHØR:
            return AGray600;
        default:
            return ABlue100;
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
