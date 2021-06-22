import { GroupType, ISelectOption } from '@navikt/familie-form-elements';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { IBehandling } from '../../../../../typer/behandling';
import {
    VedtakBegrunnelseType,
    vedtakBegrunnelseTyper,
    IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelse,
} from '../../../../../typer/vedtak';
import {
    IVedtaksperiodeMedBegrunnelser,
    IRestVedtaksbegrunnelse,
    Vedtaksperiodetype,
} from '../../../../../typer/vedtaksperiode';
import {
    AnnenVurderingType,
    Resultat,
    VedtaksbegrunnelseTekster,
    VilkårType,
} from '../../../../../typer/vilkår';
import { IPeriode } from '../../../../../utils/kalender';
import { useVedtaksbegrunnelseTekster } from '../Context/VedtaksbegrunnelseTeksterContext';
import { hentUtgjørendeVilkårImpl } from './useVedtakBegrunnelseMultiselect';

export const useVilkårBegrunnelser = ({
    vedtaksperiodeMedBegrunnelser,
    periode,
    åpenBehandling,
}: {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    periode: IPeriode;
    åpenBehandling: IBehandling;
}) => {
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();

    const vedtaksperiodeTilVedtakBegrunnelseTyper = () => {
        switch (vedtaksperiodeMedBegrunnelser.type) {
            case Vedtaksperiodetype.UTBETALING:
                return [VedtakBegrunnelseType.INNVILGELSE, VedtakBegrunnelseType.REDUKSJON];
            case Vedtaksperiodetype.FORTSATT_INNVILGET:
                return [VedtakBegrunnelseType.FORTSATT_INNVILGET];
            case Vedtaksperiodetype.OPPHØR:
                return [VedtakBegrunnelseType.OPPHØR];
            default:
                return [];
        }
    };

    const vedtakBegrunnelseTyperKnyttetTilVedtaksperiodetype = vedtaksperiodeTilVedtakBegrunnelseTyper();

    const hentUtgjørendeVilkår = (begrunnelseType: VedtakBegrunnelseType): VilkårType[] =>
        hentUtgjørendeVilkårImpl(begrunnelseType, åpenBehandling.personResultater, periode);

    const skalLeggeTilAndreBegrunnelse = (
        vedtakBegrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår
    ) =>
        vedtakBegrunnelse.id === VedtakBegrunnelse.OPPHØR_IKKE_MOTTATT_OPPLYSNINGER ||
        vedtakBegrunnelse.id === VedtakBegrunnelse.REDUKSJON_MANGLENDE_OPPLYSNINGER
            ? åpenBehandling.personResultater
                  .flatMap(personResultat => personResultat.andreVurderinger)
                  .find(
                      annenVurdering =>
                          annenVurdering.type === AnnenVurderingType.OPPLYSNINGSPLIKT &&
                          annenVurdering.resultat === Resultat.IKKE_OPPFYLT
                  )
            : true;

    const grupperteBegrunnelser =
        vedtaksbegrunnelseTekster.status === RessursStatus.SUKSESS
            ? Object.keys(vedtaksbegrunnelseTekster.data)
                  .filter((vedtakBegrunnelseType: string) =>
                      vedtakBegrunnelseTyperKnyttetTilVedtaksperiodetype.includes(
                          vedtakBegrunnelseType as VedtakBegrunnelseType
                      )
                  )
                  .reduce((acc: GroupType<ISelectOption>[], vedtakBegrunnelseType: string) => {
                      const utgjørendeVilkårForPeriodeOgResultat: VilkårType[] = hentUtgjørendeVilkår(
                          vedtakBegrunnelseType as VedtakBegrunnelseType
                      );
                      return [
                          ...acc,
                          {
                              label:
                                  vedtakBegrunnelseTyper[
                                      vedtakBegrunnelseType as VedtakBegrunnelseType
                                  ],
                              options: vedtaksbegrunnelseTekster.data[
                                  vedtakBegrunnelseType as VedtakBegrunnelseType
                              ]
                                  .filter(
                                      (
                                          restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår
                                      ) => {
                                          return restVedtakBegrunnelseTilknyttetVilkår.vilkår
                                              ? utgjørendeVilkårForPeriodeOgResultat.includes(
                                                    restVedtakBegrunnelseTilknyttetVilkår.vilkår
                                                )
                                              : skalLeggeTilAndreBegrunnelse(
                                                    restVedtakBegrunnelseTilknyttetVilkår
                                                );
                                      }
                                  )
                                  .map(
                                      (
                                          restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår
                                      ) => ({
                                          label: restVedtakBegrunnelseTilknyttetVilkår.navn,
                                          value: restVedtakBegrunnelseTilknyttetVilkår.id,
                                      })
                                  ),
                          },
                      ];
                  }, [])
            : [];

    return { grupperteBegrunnelser, vedtaksbegrunnelseTekster };
};

export const mapBegrunnelserTilSelectOptions = (
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser,
    vilkårBegrunnelser: Ressurs<VedtaksbegrunnelseTekster>
): ISelectOption[] => {
    return vedtaksperiodeMedBegrunnelser.begrunnelser
        .filter(
            (begrunnelse: IRestVedtaksbegrunnelse) =>
                begrunnelse.vedtakBegrunnelseSpesifikasjon !==
                    VedtakBegrunnelse.REDUKSJON_FRITEKST &&
                begrunnelse.vedtakBegrunnelseSpesifikasjon !== VedtakBegrunnelse.AVSLAG_FRITEKST &&
                begrunnelse.vedtakBegrunnelseSpesifikasjon !== VedtakBegrunnelse.OPPHØR_FRITEKST &&
                begrunnelse.vedtakBegrunnelseSpesifikasjon !==
                    VedtakBegrunnelse.FORTSATT_INNVILGET_FRITEKST
        )
        .map((begrunnelse: IRestVedtaksbegrunnelse) => ({
            value: begrunnelse.vedtakBegrunnelseSpesifikasjon.toString(),
            label: hentLabelForOption(
                begrunnelse.vedtakBegrunnelseType,
                begrunnelse.vedtakBegrunnelseSpesifikasjon,
                vilkårBegrunnelser
            ),
        }));
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
