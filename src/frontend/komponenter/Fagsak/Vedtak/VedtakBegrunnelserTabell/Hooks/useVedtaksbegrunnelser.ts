import { GroupType, ISelectOption } from '@navikt/familie-form-elements';
import { loggFeil } from '@navikt/familie-http';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
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
} from '../../../../../typer/vilkår';
import { IPeriode } from '../../../../../utils/kalender';
import { useVedtaksbegrunnelseTekster } from '../Context/VedtaksbegrunnelseTeksterContext';

export const useVilkårBegrunnelser = ({
    vedtaksperiodeMedBegrunnelser,
    åpenBehandling,
}: {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    periode: IPeriode;
    åpenBehandling: IBehandling;
}) => {
    const { innloggetSaksbehandler } = useApp();
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

    const vedtakBegrunnelseTyperKnyttetTilVedtaksperiodetype =
        vedtaksperiodeTilVedtakBegrunnelseTyper();

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

    const grupperteBegrunnelserFraBackend =
        vedtaksbegrunnelseTekster.status === RessursStatus.SUKSESS
            ? Object.keys(vedtaksbegrunnelseTekster.data)
                  .filter((vedtakBegrunnelseType: string) =>
                      vedtakBegrunnelseTyperKnyttetTilVedtaksperiodetype.includes(
                          vedtakBegrunnelseType as VedtakBegrunnelseType
                      )
                  )
                  .reduce((acc: GroupType<ISelectOption>[], vedtakBegrunnelseType: string) => {
                      const vedtaksbegrunnelsetype =
                          vedtakBegrunnelseType === 'INNVILGELSE'
                              ? 'INNVILGET'
                              : vedtakBegrunnelseType;

                      return [
                          ...acc,
                          {
                              label: vedtakBegrunnelseTyper[
                                  vedtakBegrunnelseType as VedtakBegrunnelseType
                              ],
                              options: vedtaksperiodeMedBegrunnelser.gyldigeBegrunnelser
                                  .filter((vedtakBegrunnelse: VedtakBegrunnelse) =>
                                      vedtakBegrunnelse.includes(vedtaksbegrunnelsetype)
                                  )
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

    const grupperteBegrunnelser =
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
                              options: vedtaksbegrunnelseTekster.data[
                                  vedtakBegrunnelseType as VedtakBegrunnelseType
                              ]
                                  .filter(
                                      (
                                          restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår
                                      ) => {
                                          return skalLeggeTilAndreBegrunnelse(
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

    // Midlertidig kode for å se om det er noe spesiallogikk frontend som det ikke er tatt høyde for backend
    grupperteBegrunnelser.forEach((gruppeMedBegrunnelser: GroupType<ISelectOption>) => {
        const gruppeMedBegrunnelserFraBackend = grupperteBegrunnelserFraBackend.find(
            g => g.label === gruppeMedBegrunnelser.label
        );

        if (
            gruppeMedBegrunnelser.options.length !== gruppeMedBegrunnelserFraBackend?.options.length
        ) {
            loggFeil(
                undefined,
                innloggetSaksbehandler,
                `Antall begrunnelser generert fra backend er ikke det samme som for frontend for '${
                    gruppeMedBegrunnelser.label
                }'. Frontend: ${gruppeMedBegrunnelser.options.map(
                    option => option.value
                )}, Backend: ${gruppeMedBegrunnelserFraBackend?.options.map(
                    option => option.value
                )}`
            );
        }
    });

    return { grupperteBegrunnelser: grupperteBegrunnelserFraBackend, vedtaksbegrunnelseTekster };
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
