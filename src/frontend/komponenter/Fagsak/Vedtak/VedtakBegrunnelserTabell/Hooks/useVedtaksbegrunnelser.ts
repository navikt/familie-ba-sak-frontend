import type { GroupType, ISelectOption } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import type { IBehandling } from '../../../../../typer/behandling';
import { ToggleNavn } from '../../../../../typer/toggles';
import type {
    IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelse,
} from '../../../../../typer/vedtak';
import { VedtakBegrunnelseType, vedtakBegrunnelseTyper } from '../../../../../typer/vedtak';
import type {
    IRestVedtaksbegrunnelse,
    IVedtaksperiodeMedBegrunnelser,
} from '../../../../../typer/vedtaksperiode';
import { Vedtaksperiodetype } from '../../../../../typer/vedtaksperiode';
import type { VedtaksbegrunnelseTekster } from '../../../../../typer/vilkår';
import type { IPeriode } from '../../../../../utils/kalender';
import { useVedtaksbegrunnelseTekster } from '../Context/VedtaksbegrunnelseTeksterContext';

export const useVilkårBegrunnelser = ({
    vedtaksperiodeMedBegrunnelser,
}: {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    periode: IPeriode;
    åpenBehandling: IBehandling;
}) => {
    const { toggles } = useApp();

    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();

    const vedtaksperiodeTilVedtakBegrunnelseTyper = () => {
        switch (vedtaksperiodeMedBegrunnelser.type) {
            case Vedtaksperiodetype.UTBETALING:
                const begrunnelsetyperForUtbetaling = [
                    VedtakBegrunnelseType.INNVILGET,
                    VedtakBegrunnelseType.REDUKSJON,
                    VedtakBegrunnelseType.FORTSATT_INNVILGET,
                    VedtakBegrunnelseType.ETTER_ENDRET_UTBETALING,
                ];
                if (toggles[ToggleNavn.ingenOverlappHenlegglese]) {
                    return [...begrunnelsetyperForUtbetaling, Vedtaksperiodetype.ENDRET_UTBETALING];
                } else {
                    return begrunnelsetyperForUtbetaling;
                }
            case Vedtaksperiodetype.FORTSATT_INNVILGET:
                return [VedtakBegrunnelseType.FORTSATT_INNVILGET];
            case Vedtaksperiodetype.UTBETALING_MED_REDUKSJON_FRA_SIST_IVERKSATTE_BEHANDLING:
                return [
                    VedtakBegrunnelseType.REDUKSJON,
                    VedtakBegrunnelseType.INNVILGET,
                    VedtakBegrunnelseType.ETTER_ENDRET_UTBETALING,
                    Vedtaksperiodetype.ENDRET_UTBETALING,
                ];
            case Vedtaksperiodetype.OPPHØR:
                return [VedtakBegrunnelseType.OPPHØR];
            case Vedtaksperiodetype.ENDRET_UTBETALING:
                return [VedtakBegrunnelseType.ENDRET_UTBETALING];
            default:
                return [];
        }
    };

    const vedtakBegrunnelseTyperKnyttetTilVedtaksperiodetype =
        vedtaksperiodeTilVedtakBegrunnelseTyper();

    const grupperteBegrunnelserFraBackend =
        vedtaksbegrunnelseTekster.status === RessursStatus.SUKSESS
            ? Object.keys(vedtaksbegrunnelseTekster.data)
                  .filter((vedtakBegrunnelseType: string) =>
                      vedtakBegrunnelseTyperKnyttetTilVedtaksperiodetype.includes(
                          vedtakBegrunnelseType as VedtakBegrunnelseType
                      )
                  )
                  .reduce((acc: GroupType<ISelectOption>[], vedtakBegrunnelseType: string) => {
                      return [
                          ...acc,
                          {
                              label: vedtakBegrunnelseTyper[
                                  vedtakBegrunnelseType as VedtakBegrunnelseType
                              ],
                              options: vedtaksperiodeMedBegrunnelser.gyldigeBegrunnelser
                                  .filter((vedtakBegrunnelse: VedtakBegrunnelse) => {
                                      return (
                                          vedtaksbegrunnelseTekster.data[
                                              vedtakBegrunnelseType as VedtakBegrunnelseType
                                          ].find(
                                              begrunnelse => begrunnelse.id === vedtakBegrunnelse
                                          ) !== undefined
                                      );
                                  })
                                  .map((vedtakBegrunnelse: VedtakBegrunnelse) => ({
                                      label:
                                          vedtaksbegrunnelseTekster.data[
                                              vedtakBegrunnelseType as VedtakBegrunnelseType
                                          ].find(
                                              vedtaksbegrunnelsestekst =>
                                                  vedtaksbegrunnelsestekst.id === vedtakBegrunnelse
                                          )?.navn ?? vedtakBegrunnelse,
                                      value: vedtakBegrunnelse,
                                  })),
                          },
                      ];
                  }, [])
            : [];

    return { grupperteBegrunnelser: grupperteBegrunnelserFraBackend, vedtaksbegrunnelseTekster };
};

export const mapBegrunnelserTilSelectOptions = (
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser,
    vilkårBegrunnelser: Ressurs<VedtaksbegrunnelseTekster>
): ISelectOption[] => {
    return vedtaksperiodeMedBegrunnelser.begrunnelser.map(
        (begrunnelse: IRestVedtaksbegrunnelse) => ({
            value: begrunnelse.vedtakBegrunnelseSpesifikasjon.toString(),
            label: hentLabelForOption(
                begrunnelse.vedtakBegrunnelseType,
                begrunnelse.vedtakBegrunnelseSpesifikasjon,
                vilkårBegrunnelser
            ),
        })
    );
};

const hentLabelForOption = (
    vedtakBegrunnelseType: VedtakBegrunnelseType,
    vedtakBegrunnelseSpesifikasjon: VedtakBegrunnelse,
    vilkårBegrunnelser: Ressurs<VedtaksbegrunnelseTekster>
) => {
    return vilkårBegrunnelser.status === RessursStatus.SUKSESS
        ? vilkårBegrunnelser.data[vedtakBegrunnelseType].find(
              (restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                  restVedtakBegrunnelseTilknyttetVilkår.id === vedtakBegrunnelseSpesifikasjon
          )?.navn ?? ''
        : '';
};
