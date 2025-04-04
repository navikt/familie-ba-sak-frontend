import type { GroupBase, OptionType } from '@navikt/familie-form-elements';
import { RessursStatus, type Ressurs } from '@navikt/familie-typer';

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
import type { VedtaksbegrunnelseTekster } from '../../../../../../typer/vilkår';

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
                Vedtaksperiodetype.ENDRET_UTBETALING,
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
                Vedtaksperiodetype.ENDRET_UTBETALING,
            ];
        case Vedtaksperiodetype.OPPHØR:
            return [
                VedtakBegrunnelseType.OPPHØR,
                VedtakBegrunnelseType.EØS_OPPHØR,
                VedtakBegrunnelseType.ETTER_ENDRET_UTBETALING,
                VedtakBegrunnelseType.INSTITUSJON_OPPHØR,
                Vedtaksperiodetype.ENDRET_UTBETALING,
            ];
        case Vedtaksperiodetype.ENDRET_UTBETALING:
            return [VedtakBegrunnelseType.ENDRET_UTBETALING];
        default:
            return [];
    }
};

export const grupperBegrunnelser = (
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser,
    alleBegrunnelserRessurs: Ressurs<VedtaksbegrunnelseTekster>
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
    vilkårBegrunnelser: Ressurs<VedtaksbegrunnelseTekster>
): OptionType[] => {
    return vedtaksperiodeMedBegrunnelser.begrunnelser.map(
        (begrunnelse: IRestVedtaksbegrunnelse) => ({
            value: begrunnelse.standardbegrunnelse.toString(),
            label: hentLabelForOption(
                begrunnelse.vedtakBegrunnelseType,
                begrunnelse.standardbegrunnelse,
                vilkårBegrunnelser
            ),
        })
    );
};

const hentLabelForOption = (
    vedtakBegrunnelseType: VedtakBegrunnelseType,
    standardbegrunnelse: VedtakBegrunnelse,
    vilkårBegrunnelser: Ressurs<VedtaksbegrunnelseTekster>
) => {
    return vilkårBegrunnelser.status === RessursStatus.SUKSESS
        ? (vilkårBegrunnelser.data[vedtakBegrunnelseType].find(
              (restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                  restVedtakBegrunnelseTilknyttetVilkår.id === standardbegrunnelse
          )?.navn ?? '')
        : '';
};
