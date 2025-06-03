import { addMonths, isBefore, startOfMonth } from 'date-fns';

import type { GroupBase, OptionType } from '@navikt/familie-form-elements';
import { RessursStatus, type Ressurs } from '@navikt/familie-typer';

import { BehandlingStatus } from '../../../../../../typer/behandling';
import {
    VedtakBegrunnelseType,
    vedtakBegrunnelseTyper,
    type IRestVedtakBegrunnelseTilknyttetVilkår,
    type VedtakBegrunnelse,
} from '../../../../../../typer/vedtak';
import {
    Vedtaksperiodetype,
    type IRestVedtaksbegrunnelse,
    type IVedtaksperiodeMedBegrunnelser,
} from '../../../../../../typer/vedtaksperiode';
import type { AlleBegrunnelser } from '../../../../../../typer/vilkår';
import {
    dagensDato,
    isoStringTilDateMedFallback,
    tidenesMorgen,
} from '../../../../../../utils/dato';

const vedtaksperiodeTilMuligeVedtakBegrunnelseTyper = (
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser
) => {
    switch (vedtaksperiodeMedBegrunnelser.type) {
        case Vedtaksperiodetype.UTBETALING:
            return [
                VedtakBegrunnelseType.INNVILGET,
                VedtakBegrunnelseType.EØS_INNVILGET,
                VedtakBegrunnelseType.REDUKSJON,
                VedtakBegrunnelseType.EØS_REDUKSJON,
                VedtakBegrunnelseType.FORTSATT_INNVILGET,
                VedtakBegrunnelseType.EØS_FORTSATT_INNVILGET,
                VedtakBegrunnelseType.ETTER_ENDRET_UTBETALING,
                VedtakBegrunnelseType.INSTITUSJON_INNVILGET,
                VedtakBegrunnelseType.INSTITUSJON_REDUKSJON,
                VedtakBegrunnelseType.INSTITUSJON_FORTSATT_INNVILGET,
                VedtakBegrunnelseType.ENDRET_UTBETALING,
                VedtakBegrunnelseType.EØS_ENDRET_UTBETALING,
            ];
        case Vedtaksperiodetype.FORTSATT_INNVILGET:
            return [
                VedtakBegrunnelseType.FORTSATT_INNVILGET,
                VedtakBegrunnelseType.INSTITUSJON_FORTSATT_INNVILGET,
                VedtakBegrunnelseType.EØS_FORTSATT_INNVILGET,
            ];
        case Vedtaksperiodetype.UTBETALING_MED_REDUKSJON_FRA_SIST_IVERKSATTE_BEHANDLING:
            return [
                VedtakBegrunnelseType.REDUKSJON,
                VedtakBegrunnelseType.INNVILGET,
                VedtakBegrunnelseType.EØS_INNVILGET,
                VedtakBegrunnelseType.EØS_REDUKSJON,
                VedtakBegrunnelseType.ETTER_ENDRET_UTBETALING,
                VedtakBegrunnelseType.INSTITUSJON_INNVILGET,
                VedtakBegrunnelseType.INSTITUSJON_REDUKSJON,
                VedtakBegrunnelseType.ENDRET_UTBETALING,
                VedtakBegrunnelseType.EØS_ENDRET_UTBETALING,
            ];
        case Vedtaksperiodetype.OPPHØR:
            return [
                VedtakBegrunnelseType.OPPHØR,
                VedtakBegrunnelseType.EØS_OPPHØR,
                VedtakBegrunnelseType.ETTER_ENDRET_UTBETALING,
                VedtakBegrunnelseType.INSTITUSJON_OPPHØR,
                VedtakBegrunnelseType.ENDRET_UTBETALING,
                VedtakBegrunnelseType.EØS_ENDRET_UTBETALING,
            ];
        case Vedtaksperiodetype.ENDRET_UTBETALING:
            return [
                VedtakBegrunnelseType.ENDRET_UTBETALING,
                VedtakBegrunnelseType.EØS_ENDRET_UTBETALING,
            ];
        default:
            return [];
    }
};

export const grupperBegrunnelser = (
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser,
    alleBegrunnelserRessurs: Ressurs<AlleBegrunnelser>
): GroupBase<OptionType>[] => {
    const begrunnelseTyperKnyttetTilVedtaksperioden = vedtaksperiodeTilMuligeVedtakBegrunnelseTyper(
        vedtaksperiodeMedBegrunnelser
    );

    if (alleBegrunnelserRessurs.status !== RessursStatus.SUKSESS) {
        return [];
    }

    const alleBegrunnelser = alleBegrunnelserRessurs.data;

    const grupperteBegrunnelser = Object.keys(alleBegrunnelser)
        .filter((vedtakBegrunnelseType: string) =>
            begrunnelseTyperKnyttetTilVedtaksperioden.includes(
                vedtakBegrunnelseType as VedtakBegrunnelseType
            )
        )
        .reduce((acc: GroupBase<OptionType>[], vedtakBegrunnelseType: string) => {
            return [
                ...acc,
                {
                    label: vedtakBegrunnelseTyper[vedtakBegrunnelseType as VedtakBegrunnelseType],
                    options: vedtaksperiodeMedBegrunnelser.gyldigeBegrunnelser
                        .filter((vedtakBegrunnelse: VedtakBegrunnelse) => {
                            return (
                                alleBegrunnelser[
                                    vedtakBegrunnelseType as VedtakBegrunnelseType
                                ].find(begrunnelse => begrunnelse.id === vedtakBegrunnelse) !==
                                undefined
                            );
                        })
                        .map((vedtakBegrunnelse: VedtakBegrunnelse) => ({
                            label:
                                alleBegrunnelser[
                                    vedtakBegrunnelseType as VedtakBegrunnelseType
                                ].find(
                                    vedtaksbegrunnelsestekst =>
                                        vedtaksbegrunnelsestekst.id === vedtakBegrunnelse
                                )?.navn ?? vedtakBegrunnelse,
                            value: vedtakBegrunnelse,
                        })),
                },
            ];
        }, []);

    return grupperteBegrunnelser;
};

export const mapBegrunnelserTilSelectOptions = (
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser,
    alleBegrunnelser: AlleBegrunnelser
): OptionType[] => {
    return vedtaksperiodeMedBegrunnelser.begrunnelser.map(
        (begrunnelse: IRestVedtaksbegrunnelse) => ({
            value: begrunnelse.standardbegrunnelse.toString(),
            label: hentLabelForOption(
                begrunnelse.vedtakBegrunnelseType,
                begrunnelse.standardbegrunnelse,
                alleBegrunnelser
            ),
        })
    );
};

const hentLabelForOption = (
    vedtakBegrunnelseType: VedtakBegrunnelseType,
    standardbegrunnelse: VedtakBegrunnelse,
    alleBegrunnelser: AlleBegrunnelser
) => {
    return (
        alleBegrunnelser[vedtakBegrunnelseType].find(
            (restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                restVedtakBegrunnelseTilknyttetVilkår.id === standardbegrunnelse
        )?.navn ?? ''
    );
};

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
