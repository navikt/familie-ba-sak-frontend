import { ActionMeta, GroupType, ISelectOption } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelserContext';
import { TIDENES_ENDE, TIDENES_MORGEN } from '../../../../typer/periode';
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
import familieDayjs, { Dayjs, familieDayjsDiff } from '../../../../utils/familieDayjs';
import { isoStringToDayjs } from '../../../../utils/formatter';

export const hentUtgjørendeVilkårImpl = (
    begrunnelseType: VedtakBegrunnelseType,
    personResultater: IRestPersonResultat[],
    vedtaksperiode: Vedtaksperiode
): VilkårType[] => {
    const erSammeMåned = (dato1: Dayjs, dato2: Dayjs) =>
        familieDayjsDiff(dato1, dato2, 'month') === 0;
    return personResultater
        .flatMap(personResultat => personResultat.vilkårResultater)
        .filter((vilkårResultat: IRestVilkårResultat) => {
            const vilkårPeriodeFom = isoStringToDayjs(vilkårResultat.periodeFom, TIDENES_MORGEN);
            const vilkårPeriodeTom = isoStringToDayjs(vilkårResultat.periodeTom, TIDENES_ENDE);
            const vedtakPeriodeFom = familieDayjs(vedtaksperiode.periodeFom);
            const oppfyltTomMånedEtter =
                vilkårResultat.vilkårType !== VilkårType.UNDER_18_ÅR ? 1 : 0;

            if (begrunnelseType === VedtakBegrunnelseType.INNVILGELSE) {
                return (
                    erSammeMåned(vilkårPeriodeFom, vedtakPeriodeFom.subtract(1, 'month')) &&
                    vilkårResultat.resultat === Resultat.OPPFYLT
                );
            } else if (
                begrunnelseType === VedtakBegrunnelseType.REDUKSJON ||
                begrunnelseType === VedtakBegrunnelseType.OPPHØR
            ) {
                return (
                    erSammeMåned(
                        vilkårPeriodeTom,
                        vedtakPeriodeFom.subtract(oppfyltTomMånedEtter, 'month')
                    ) && vilkårResultat.resultat === Resultat.OPPFYLT
                );
            } else {
                return true;
            }
        })
        .map((vilkårResultat: IRestVilkårResultat) => vilkårResultat.vilkårType);
};

const useVedtakBegrunnelseMultiselect = (
    personResultater: IRestPersonResultat[],
    vedtaksperiode: Vedtaksperiode
) => {
    const {
        vedtakBegrunnelser,
        vilkårBegrunnelser,
        leggTilVedtakBegrunnelse,
        slettVedtakBegrunnelse,
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
                break;
            default:
                throw new Error('Ukjent action ved onChange på vedtakbegrunnelser');
        }
    };

    const skalLeggeTilAndreBegrunnelse = (
        vedtakBegrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår
    ) =>
        vedtakBegrunnelse.id === VedtakBegrunnelse.OPPHØR_IKKE_MOTTATT_OPPLYSNINGER ||
        vedtakBegrunnelse.id === VedtakBegrunnelse.REDUKSJON_MANGLENDE_OPPLYSNINGER
            ? personResultater
                  .flatMap(personResultat => personResultat.andreVurderinger)
                  .find(
                      annenVurdering =>
                          annenVurdering.type === AnnenVurderingType.OPPLYSNINGSPLIKT &&
                          annenVurdering.resultat === Resultat.IKKE_OPPFYLT
                  )
            : true;

    const hentUtgjørendeVilkår = (begrunnelseType: VedtakBegrunnelseType): VilkårType[] =>
        hentUtgjørendeVilkårImpl(begrunnelseType, personResultater, vedtaksperiode);

    const vedtakBegrunnelserForPeriode = vedtakBegrunnelser.filter(
        (vedtakBegrunnelse: IRestVedtakBegrunnelse) => {
            return (
                vedtakBegrunnelse.begrunnelseType !== VedtakBegrunnelseType.AVSLAG &&
                vedtakBegrunnelse.fom === vedtaksperiode.periodeFom &&
                vedtakBegrunnelse.tom === vedtaksperiode.periodeTom
            );
        }
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

    const valgteBegrunnelser: ISelectOption[] = vedtakBegrunnelserForPeriode
        .filter(
            (vedtaksbegrunnelse: IRestVedtakBegrunnelse) =>
                vedtaksbegrunnelse.begrunnelse !== VedtakBegrunnelse.REDUKSJON_FRITEKST &&
                vedtaksbegrunnelse.begrunnelse !== VedtakBegrunnelse.AVSLAG_FRITEKST &&
                vedtaksbegrunnelse.begrunnelse !== VedtakBegrunnelse.OPPHØR_FRITEKST
        )
        .map((vedtaksbegrunnelse: IRestVedtakBegrunnelse) => ({
            value: vedtaksbegrunnelse.begrunnelse?.toString() ?? '',
            label:
                vilkårBegrunnelser.status === RessursStatus.SUKSESS
                    ? vilkårBegrunnelser.data[
                          vedtaksbegrunnelse.begrunnelseType as VedtakBegrunnelseType
                      ].find(
                          (
                              restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår
                          ) =>
                              restVedtakBegrunnelseTilknyttetVilkår.id ===
                              vedtaksbegrunnelse.begrunnelse
                      )?.navn ?? ''
                    : '',
        }));

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
