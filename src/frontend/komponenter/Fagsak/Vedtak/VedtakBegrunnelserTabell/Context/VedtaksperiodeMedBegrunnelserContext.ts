import React, { useEffect } from 'react';

import constate from 'constate';

import { ActionMeta, GroupType, ISelectOption } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { FeltState, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { Ressurs, byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import { IBehandling } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import {
    IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelse,
    VedtakBegrunnelseType,
    vedtakBegrunnelseTyper,
} from '../../../../../typer/vedtak';
import {
    IRestVedtaksbegrunnelse,
    IVedtaksperiodeMedBegrunnelser,
    Vedtaksperiodetype,
} from '../../../../../typer/vedtaksperiode';
import { Vilkårsbegrunnelser, VilkårType } from '../../../../../typer/vilkår';
import { IPeriode } from '../../../../../utils/kalender';
import { hentUtgjørendeVilkårImpl } from '../Hooks/useVedtakBegrunnelseMultiselect';

interface IProps {
    fagsak: IFagsak;
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    åpenBehandling: IBehandling;
}

const [VedtaksperiodeMedBegrunnelserProvider, useVedtaksperiodeMedBegrunnelser] = constate(
    ({ åpenBehandling, vedtaksperiodeMedBegrunnelser }: IProps) => {
        const { request } = useHttp();

        const periode = useFelt<IPeriode>({
            verdi: {
                fom: vedtaksperiodeMedBegrunnelser.fom,
                tom: vedtaksperiodeMedBegrunnelser.tom,
            },
        });

        const fritekster = useFelt<string[]>({
            verdi: vedtaksperiodeMedBegrunnelser.fritekster,
            valideringsfunksjon: (felt: FeltState<string[]>) => ok(felt),
        });

        const begrunnelser = useFelt<ISelectOption[]>({
            verdi: [],
            valideringsfunksjon: (felt: FeltState<ISelectOption[]>) => ok(felt),
        });

        const [vilkårBegrunnelser, settVilkårbegrunnelser] = React.useState<
            Ressurs<Vilkårsbegrunnelser>
        >(byggTomRessurs());

        const { skjema } = useSkjema<
            {
                periode: IPeriode;
                fritekster: string[];
                begrunnelser: ISelectOption[];
            },
            IFagsak
        >({
            felter: {
                periode,
                fritekster,
                begrunnelser,
            },
            skjemanavn: 'Begrunnelser for vedtaksperiode',
        });

        useEffect(() => {
            hentVilkårBegrunnelseTekster();
        }, []);

        useEffect(() => {
            begrunnelser.validerOgSettFelt(
                mapBegrunnelserTilSelectOptions(vedtaksperiodeMedBegrunnelser, vilkårBegrunnelser)
            );
        }, [vilkårBegrunnelser]);

        const hentVilkårBegrunnelseTekster = () => {
            request<void, Vilkårsbegrunnelser>({
                method: 'GET',
                url: `/familie-ba-sak/api/vilkaarsvurdering/vilkaarsbegrunnelser`,
                påvirkerSystemLaster: true,
            }).then((vilkårBegrunnelser: Ressurs<Vilkårsbegrunnelser>) => {
                settVilkårbegrunnelser(vilkårBegrunnelser);
            });
        };

        const onChangeBegrunnelse = (action: ActionMeta<ISelectOption>) => {
            if (action.option)
                switch (action.action) {
                    case 'select-option':
                        if (action.option) {
                            begrunnelser.validerOgSettFelt([
                                ...skjema.felter.begrunnelser.verdi,
                                action.option,
                            ]);
                        }

                        break;
                    /*case 'pop-value':
                case 'remove-value':
                    const vedtakBegrunnelse:
                        | IRestVedtakBegrunnelse
                        | undefined = vedtakBegrunnelserForPeriode.find(
                        (vedtakBegrunnelse: IRestVedtakBegrunnelse) =>
                            vedtakBegrunnelse.begrunnelse === action.removedValue?.value
                    );

                    if (vedtakBegrunnelse) {
                        slettVedtakBegrunnelse(vedtakBegrunnelse);
                    } else {
                        throw new Error(
                            'Finner ikke utbetalingsbegrunnelse id i listen over begrunnelser'
                        );
                    }
                    break;
                case 'clear':
                    const førsteVedtakBegrunnelse: IRestVedtakBegrunnelse | undefined =
                        vedtakBegrunnelserForPeriode[0];

                    if (førsteVedtakBegrunnelse) {
                        slettVedtakBegrunnelserForPeriodeOgVedtakbegrunnelseTyper(
                            førsteVedtakBegrunnelse.fom,
                            vedtakBegrunnelseTyperKnyttetTilVedtaksperiodetype,
                            førsteVedtakBegrunnelse.tom
                        );
                    } else {
                        throw new Error(
                            'Prøver å fjerne alle begrunnelser for en periode, men det er ikke satt noen begrunnelser'
                        );
                    }
                    break;*/
                    default:
                        throw new Error('Ukjent action ved onChange på vedtakbegrunnelser');
                }
        };

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
            hentUtgjørendeVilkårImpl(
                begrunnelseType,
                åpenBehandling.personResultater,
                skjema.felter.periode.verdi
            );

        const grupperteBegrunnelser =
            vilkårBegrunnelser.status === RessursStatus.SUKSESS
                ? Object.keys(vilkårBegrunnelser.data)
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
                                  options: vilkårBegrunnelser.data[
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
                                                  : false;
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

        return {
            id: vedtaksperiodeMedBegrunnelser.id,
            skjema,
            onChangeBegrunnelse,
            grupperteBegrunnelser,
            vilkårBegrunnelser,
        };
    }
);

const mapBegrunnelserTilSelectOptions = (
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser,
    vilkårBegrunnelser: Ressurs<Vilkårsbegrunnelser>
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
    vilkårBegrunnelser: Ressurs<Vilkårsbegrunnelser>
) => {
    return vilkårBegrunnelser.status === RessursStatus.SUKSESS
        ? vilkårBegrunnelser.data[vedtakBegrunnelseType].find(
              (restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                  restVedtakBegrunnelseTilknyttetVilkår.id === vedtakBegrunnelseSpesifikasjon
          )?.navn ?? ''
        : '';
};

export { VedtaksperiodeMedBegrunnelserProvider, useVedtaksperiodeMedBegrunnelser };
