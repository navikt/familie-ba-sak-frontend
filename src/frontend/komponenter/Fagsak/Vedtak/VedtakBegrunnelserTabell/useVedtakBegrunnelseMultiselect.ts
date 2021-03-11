import { ActionMeta, GroupType, ISelectOption } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../context/AppContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelseContext';
import { TIDENES_ENDE, TIDENES_MORGEN } from '../../../../typer/periode';
import { ToggleNavn } from '../../../../typer/toggles';
import {
    IRestVedtakBegrunnelse,
    IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelse,
    VedtakBegrunnelseType,
    vedtakBegrunnelseTyper,
} from '../../../../typer/vedtak';
import { Vedtaksperiode, Vedtaksperiodetype } from '../../../../typer/vedtaksperiode';
import {
    AnnenVurderingType,
    IRestPersonResultat,
    IRestVilkårResultat,
    Resultat,
    VilkårType,
} from '../../../../typer/vilkår';
import familieDayjs, { familieDayjsDiff } from '../../../../utils/familieDayjs';
import { isoStringToDayjs } from '../../../../utils/formatter';

const useVedtakBegrunnelseMultiselect = (
    personResultater: IRestPersonResultat[],
    vedtaksperiode: Vedtaksperiode
) => {
    const { toggles } = useApp();
    const {
        vedtakBegrunnelser,
        vilkårBegrunnelser,
        leggTilVedtakBegrunnelse,
        slettVedtakBegrunnelse,
        slettVedtakBegrunnelserForPeriode,
        slettVedtakBegrunnelserForPeriodeOgVedtakbegrunnelseTyper,
    } = useVedtakBegrunnelser();

    const vedtakBegrunnelseTyperKnyttetTilVedtaksperiodetype =
        vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING
            ? [VedtakBegrunnelseType.INNVILGELSE, VedtakBegrunnelseType.REDUKSJON]
            : [VedtakBegrunnelseType.OPPHØR];

    const onChangeBegrunnelse = (
        action: ActionMeta<ISelectOption>,
        vedtakBegrunnelserForPeriode: IRestVedtakBegrunnelse[]
    ) => {
        switch (action.action) {
            case 'select-option':
                leggTilVedtakBegrunnelse({
                    fom: vedtaksperiode.periodeFom,
                    tom: vedtaksperiode.periodeTom,
                    vedtakBegrunnelse: (action.option?.value ?? '') as VedtakBegrunnelse,
                });
                break;
            case 'pop-value':
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
                    if (toggles[ToggleNavn.visOpphørsperioder]) {
                        slettVedtakBegrunnelserForPeriodeOgVedtakbegrunnelseTyper(
                            førsteVedtakBegrunnelse.fom,
                            vedtakBegrunnelseTyperKnyttetTilVedtaksperiodetype,
                            førsteVedtakBegrunnelse.tom
                        );
                    } else {
                        slettVedtakBegrunnelserForPeriode(
                            førsteVedtakBegrunnelse.fom,
                            førsteVedtakBegrunnelse.tom
                        );
                    }
                } else {
                    throw new Error(
                        'Prøver å fjerne alle begrunnelser for en periode, men det er ikke satt noen begrunnelser'
                    );
                }
                break;
            default:
                throw new Error('Ukjent action ved onChange på vedtakbegrunnelser');
        }
    };

    const skalLeggeTilAndreBegrunnelse = (
        vedtakBegrunnelser: IRestVedtakBegrunnelseTilknyttetVilkår
    ) =>
        vedtakBegrunnelser.id === VedtakBegrunnelse.OPPHØR_IKKE_MOTTATT_OPPLYSNINGER ||
        vedtakBegrunnelser.id === VedtakBegrunnelse.REDUKSJON_MANGLENDE_OPPLYSNINGER
            ? personResultater
                  .flatMap(personResultat => personResultat.andreVurderinger)
                  .find(
                      annenVurdering =>
                          annenVurdering.type === AnnenVurderingType.OPPLYSNINGSPLIKT &&
                          annenVurdering.resultat === Resultat.IKKE_OPPFYLT
                  )
            : true;

    const hentUtgjørendeVilkår = (begrunnelseType: VedtakBegrunnelseType): VilkårType[] => {
        console.log(personResultater);
        console.log(personResultater.flatMap(personResultat => personResultat.andreVurderinger));
        console.log(
            personResultater
                .flatMap(personResultat => personResultat.andreVurderinger)
                .find(
                    annenVurdering =>
                        annenVurdering.type === AnnenVurderingType.OPPLYSNINGSPLIKT &&
                        annenVurdering.resultat === Resultat.IKKE_OPPFYLT
                )
        );
        return personResultater
            .flatMap(personResultat => personResultat.vilkårResultater)
            .filter((vilkårResultat: IRestVilkårResultat) => {
                if (begrunnelseType === VedtakBegrunnelseType.INNVILGELSE) {
                    return (
                        familieDayjsDiff(
                            isoStringToDayjs(vilkårResultat.periodeFom, TIDENES_MORGEN),
                            familieDayjs(vedtaksperiode.periodeFom).subtract(1, 'month'),
                            'month'
                        ) === 0 && vilkårResultat.resultat === Resultat.OPPFYLT
                    );
                } else if (begrunnelseType === VedtakBegrunnelseType.REDUKSJON) {
                    const oppfyltTomMånedEtter =
                        vilkårResultat.vilkårType !== VilkårType.UNDER_18_ÅR ? 1 : 0;

                    return (
                        familieDayjsDiff(
                            isoStringToDayjs(vilkårResultat.periodeTom, TIDENES_ENDE),
                            familieDayjs(vedtaksperiode.periodeFom).subtract(
                                oppfyltTomMånedEtter,
                                'month'
                            ),
                            'month'
                        ) === 0 && vilkårResultat.resultat === Resultat.OPPFYLT
                    );
                } else if (begrunnelseType === VedtakBegrunnelseType.OPPHØR) {
                    const oppfyltTomMånedEtter =
                        vilkårResultat.vilkårType !== VilkårType.UNDER_18_ÅR ? 1 : 0;

                    return (
                        (familieDayjsDiff(
                            isoStringToDayjs(vilkårResultat.periodeTom, TIDENES_ENDE),
                            familieDayjs(vedtaksperiode.periodeTom),
                            'month'
                        ) === 0 ||
                            familieDayjsDiff(
                                isoStringToDayjs(vilkårResultat.periodeTom, TIDENES_ENDE),
                                familieDayjs(vedtaksperiode.periodeFom).subtract(
                                    oppfyltTomMånedEtter,
                                    'month'
                                ),
                                'month'
                            ) === 0) &&
                        vilkårResultat.resultat === Resultat.OPPFYLT
                    );
                } else {
                    return true;
                }
            })
            .map((vilkårResultat: IRestVilkårResultat) => vilkårResultat.vilkårType);
    };

    const vedtakBegrunnelserForPeriode = vedtakBegrunnelser.filter(
        (vedtakBegrunnelse: IRestVedtakBegrunnelse) => {
            return (
                vedtakBegrunnelse.fom === vedtaksperiode.periodeFom &&
                vedtakBegrunnelse.tom === vedtaksperiode.periodeTom
            );
        }
    );

    const grupperteBegrunnelser =
        vilkårBegrunnelser.status === RessursStatus.SUKSESS
            ? Object.keys(vilkårBegrunnelser.data)
                  .filter((vedtakBegrunnelseType: string) =>
                      toggles[ToggleNavn.visOpphørsperioder]
                          ? vedtakBegrunnelseTyperKnyttetTilVedtaksperiodetype.includes(
                                vedtakBegrunnelseType as VedtakBegrunnelseType
                            )
                          : true
                  )
                  .reduce((acc: GroupType<ISelectOption>[], vedtakBegrunnelseType: string) => {
                      const utgjørendeVilkårForPeriodeOgResultat: VilkårType[] = hentUtgjørendeVilkår(
                          vedtakBegrunnelseType as VedtakBegrunnelseType
                      );
                      console.log(vilkårBegrunnelser);
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

    const valgteBegrunnelser: ISelectOption[] = vedtakBegrunnelserForPeriode.map(
        (utbetalingsbegrunnelse: IRestVedtakBegrunnelse) => ({
            value: utbetalingsbegrunnelse.begrunnelse?.toString() ?? '',
            label:
                vilkårBegrunnelser.status === RessursStatus.SUKSESS
                    ? vilkårBegrunnelser.data[
                          utbetalingsbegrunnelse.begrunnelseType as VedtakBegrunnelseType
                      ].find(
                          (
                              restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår
                          ) =>
                              restVedtakBegrunnelseTilknyttetVilkår.id ===
                              utbetalingsbegrunnelse.begrunnelse
                      )?.navn ?? ''
                    : '',
        })
    );

    const begrunnelser =
        vilkårBegrunnelser?.status === RessursStatus.SUKSESS && vilkårBegrunnelser.data;

    return {
        begrunnelser,
        grupperteBegrunnelser,
        onChangeBegrunnelse,
        valgteBegrunnelser,
        vedtakBegrunnelserForPeriode,
    };
};

export default useVedtakBegrunnelseMultiselect;
