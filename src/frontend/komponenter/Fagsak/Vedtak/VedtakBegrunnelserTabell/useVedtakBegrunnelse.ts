import { ActionMeta, GroupType, ISelectOption } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelseContext';
import { IPeriode, TIDENES_ENDE, TIDENES_MORGEN } from '../../../../typer/periode';
import {
    IRestVedtakBegrunnelse,
    IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelse,
    VedtakBegrunnelseType,
    vedtakBegrunnelseTyper,
} from '../../../../typer/vedtak';
import {
    IRestPersonResultat,
    IRestVilkårResultat,
    Resultat,
    VilkårType,
} from '../../../../typer/vilkår';
import familieDayjs, { familieDayjsDiff } from '../../../../utils/familieDayjs';
import { isoStringToDayjs } from '../../../../utils/formatter';

const useVedtakBegrunnelse = (personResultater: IRestPersonResultat[], periode: IPeriode) => {
    const {
        vedtakBegrunnelser,
        vilkårBegrunnelser,
        leggTilVedtakBegrunnelse,
        slettVedtakBegrunnelse,
        slettVedtakBegrunnelserForPeriode,
    } = useVedtakBegrunnelser();

    const onChangeBegrunnelse = (
        action: ActionMeta<ISelectOption>,
        vedtakBegrunnelserForPeriode: IRestVedtakBegrunnelse[]
    ) => {
        switch (action.action) {
            case 'select-option':
                leggTilVedtakBegrunnelse({
                    fom: periode.fom ?? '',
                    tom: periode.tom,
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
                    slettVedtakBegrunnelserForPeriode(
                        førsteVedtakBegrunnelse.fom,
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

    const hentUtgjørendeVilkår = (begrunnelseType: VedtakBegrunnelseType): VilkårType[] => {
        return personResultater
            .flatMap(personResultat => personResultat.vilkårResultater)
            .filter((vilkårResultat: IRestVilkårResultat) => {
                if (begrunnelseType === VedtakBegrunnelseType.INNVILGELSE) {
                    return (
                        familieDayjsDiff(
                            isoStringToDayjs(vilkårResultat.periodeFom, TIDENES_MORGEN),
                            familieDayjs(periode.fom).subtract(1, 'month'),
                            'month'
                        ) === 0 && vilkårResultat.resultat === Resultat.OPPFYLT
                    );
                } else if (begrunnelseType === VedtakBegrunnelseType.REDUKSJON) {
                    const oppfyltTomMånedEtter =
                        vilkårResultat.vilkårType !== VilkårType.UNDER_18_ÅR ? 1 : 0;

                    return (
                        familieDayjsDiff(
                            isoStringToDayjs(vilkårResultat.periodeTom, TIDENES_ENDE),
                            familieDayjs(periode.fom).subtract(oppfyltTomMånedEtter, 'month'),
                            'month'
                        ) === 0 && vilkårResultat.resultat === Resultat.OPPFYLT
                    );
                } else if (begrunnelseType === VedtakBegrunnelseType.OPPHØR) {
                    const oppfyltTomMånedEtter =
                        vilkårResultat.vilkårType !== VilkårType.UNDER_18_ÅR ? 1 : 0;

                    return (
                        (familieDayjsDiff(
                            isoStringToDayjs(vilkårResultat.periodeTom, TIDENES_ENDE),
                            familieDayjs(periode.tom),
                            'month'
                        ) === 0 ||
                            familieDayjsDiff(
                                isoStringToDayjs(vilkårResultat.periodeTom, TIDENES_ENDE),
                                familieDayjs(periode.fom).subtract(oppfyltTomMånedEtter, 'month'),
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
            return vedtakBegrunnelse.fom === periode.fom && vedtakBegrunnelse.tom === periode.tom;
        }
    );

    const gruppertBegrunnelser: GroupType<ISelectOption>[] =
        vilkårBegrunnelser.status === RessursStatus.SUKSESS
            ? Object.keys(vilkårBegrunnelser.data).reduce(
                  (acc: GroupType<ISelectOption>[], resultat: string) => {
                      const utgjørendeVilkårForPeriodeOgResultat: VilkårType[] = hentUtgjørendeVilkår(
                          resultat as VedtakBegrunnelseType
                      );

                      return [
                          ...acc,
                          {
                              label: vedtakBegrunnelseTyper[resultat as VedtakBegrunnelseType],
                              options: vilkårBegrunnelser.data[resultat as VedtakBegrunnelseType]
                                  .filter(
                                      (
                                          restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår
                                      ) => {
                                          return restVedtakBegrunnelseTilknyttetVilkår.vilkår
                                              ? utgjørendeVilkårForPeriodeOgResultat.includes(
                                                    restVedtakBegrunnelseTilknyttetVilkår.vilkår
                                                )
                                              : true;
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
                  },
                  []
              )
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
        gruppertBegrunnelser,
        hentUtgjørendeVilkår,
        onChangeBegrunnelse,
        valgteBegrunnelser,
        vedtakBegrunnelserForPeriode,
    };
};

export default useVedtakBegrunnelse;
