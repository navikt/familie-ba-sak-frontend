import navFarger from 'nav-frontend-core';

import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { BehandlingResultat, BehandlingStatus } from '../typer/behandling';
import type { IRestVedtakBegrunnelseTilknyttetVilkår, VedtakBegrunnelse } from '../typer/vedtak';
import { VedtakBegrunnelseType } from '../typer/vedtak';
import type { IVedtaksperiodeMedBegrunnelser } from '../typer/vedtaksperiode';
import { Vedtaksperiodetype } from '../typer/vedtaksperiode';
import type { VedtaksbegrunnelseTekster, VilkårType } from '../typer/vilkår';
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
    behandlingResultat: BehandlingResultat,
    behandlingStatus: BehandlingStatus
): IVedtaksperiodeMedBegrunnelser[] => {
    const sorterteOgFiltrertePerioder = vedtaksperioder
        .slice()
        .sort((a, b) =>
            kalenderDiff(
                kalenderDatoTilDate(kalenderDatoMedFallback(a.fom, TIDENES_MORGEN)),
                kalenderDatoTilDate(kalenderDatoMedFallback(b.fom, TIDENES_MORGEN))
            )
        )
        .filter((vedtaksperiode: IVedtaksperiodeMedBegrunnelser) => {
            if (behandlingStatus === BehandlingStatus.AVSLUTTET) {
                return harPeriodeBegrunnelse(vedtaksperiode);
            } else {
                return erPeriodeFomMindreEnn2MndFramITid(vedtaksperiode);
            }
        });

    if (
        behandlingResultat === BehandlingResultat.OPPHØRT ||
        behandlingResultat === BehandlingResultat.FORTSATT_OPPHØRT
    ) {
        return hentSisteOpphørsperiode(sorterteOgFiltrertePerioder);
    } else {
        return sorterteOgFiltrertePerioder;
    }
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

const hentSisteOpphørsperiode = (sortertePerioder: IVedtaksperiodeMedBegrunnelser[]) => {
    const sorterteOgFiltrerteOpphørsperioder = sortertePerioder.filter(
        (vedtaksperiode: IVedtaksperiodeMedBegrunnelser) =>
            vedtaksperiode.type === Vedtaksperiodetype.OPPHØR
    );
    const sisteOpphørsPeriode =
        sorterteOgFiltrerteOpphørsperioder[sorterteOgFiltrerteOpphørsperioder.length - 1];
    return sisteOpphørsPeriode ? [sisteOpphørsPeriode] : [];
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

export const finnVedtakBegrunnelseVilkår = (
    vilkårBegrunnelser: Ressurs<VedtaksbegrunnelseTekster>,
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
        case VedtakBegrunnelseType.INNVILGET:
        case VedtakBegrunnelseType.FORTSATT_INNVILGET:
            return navFarger.navGronnLighten80;
        case VedtakBegrunnelseType.AVSLAG:
            return navFarger.redErrorLighten80;
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
        case VedtakBegrunnelseType.INNVILGET:
        case VedtakBegrunnelseType.FORTSATT_INNVILGET:
            return navFarger.navGronn;
        case VedtakBegrunnelseType.AVSLAG:
            return navFarger.redErrorDarken20;
        case VedtakBegrunnelseType.REDUKSJON:
            return navFarger.navOransjeDarken20;
        case VedtakBegrunnelseType.OPPHØR:
            return navFarger.navGra60;
        default:
            return navFarger.navBlaLighten80;
    }
};
