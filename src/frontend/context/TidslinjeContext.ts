import { useState } from 'react';

import createUseContext from 'constate';
import { addMonths, endOfMonth, startOfMonth, subMonths } from 'date-fns';

import type { Etikett, Periode } from '@navikt/familie-tidslinje';

import type { IPersonMedAndelerTilkjentYtelse, IYtelsePeriode } from '../typer/beregning';
import { YtelseType } from '../typer/beregning';
import { FagsakType } from '../typer/fagsak';
import type { IGrunnlagPerson } from '../typer/person';
import { dagensDato, isoStringTilDate } from '../utils/dato';
import { sorterPersonTypeOgFødselsdato } from '../utils/formatter';
import { splittYtelseVedEndringerPåAnnenYtelse } from '../utils/tidslinje';

export interface ITidslinjeVindu {
    id: number;
    label: string;
    måneder: number;
}

export enum TidslinjeVindu {
    HALVT_ÅR,
    ETT_ÅR,
    TRE_ÅR,
}

export enum NavigeringsRetning {
    VENSTRE = 'VENSTRE',
    HØYRE = 'HØYRE',
}

const [TidslinjeProvider, useTidslinje] = createUseContext(() => {
    const tidslinjeVinduer: ITidslinjeVindu[] = [
        { id: TidslinjeVindu.HALVT_ÅR, label: '6 mnd', måneder: 6 },
        { id: TidslinjeVindu.ETT_ÅR, label: '1 år', måneder: 12 },
        { id: TidslinjeVindu.TRE_ÅR, label: '3 år', måneder: 36 },
    ];

    const [aktivEtikett, settAktivEtikett] = useState<Etikett | undefined>(undefined);
    const [initiellAktivEtikettErSatt, setInitiellAktivEtikettErSatt] = useState<boolean>(false);

    const [aktivtTidslinjeVindu, settAktivtTidslinjeVindu] = useState({
        vindu: tidslinjeVinduer[TidslinjeVindu.ETT_ÅR],
        startDato: endOfMonth(subMonths(dagensDato, 11)),
        sluttDato: endOfMonth(addMonths(dagensDato, 1)),
    });

    const genererFormatertÅrstall = () => {
        const startÅr = aktivtTidslinjeVindu.startDato.getFullYear();
        const sluttÅr = aktivtTidslinjeVindu.sluttDato.getFullYear();

        if (startÅr !== sluttÅr) {
            return `${startÅr} - ${sluttÅr}`;
        } else {
            return sluttÅr;
        }
    };

    const naviger = (retning: NavigeringsRetning) => {
        if (retning === NavigeringsRetning.VENSTRE) {
            settAktivtTidslinjeVindu(({ sluttDato, startDato, vindu }) => ({
                ...aktivtTidslinjeVindu,
                startDato: endOfMonth(subMonths(startDato, vindu.måneder)),
                sluttDato: endOfMonth(subMonths(sluttDato, vindu.måneder)),
            }));
        } else {
            settAktivtTidslinjeVindu(({ sluttDato, startDato, vindu }) => ({
                ...aktivtTidslinjeVindu,
                startDato: endOfMonth(addMonths(startDato, vindu.måneder)),
                sluttDato: endOfMonth(addMonths(sluttDato, vindu.måneder)),
            }));
        }
    };

    const endreTidslinjeVindu = (vindu: ITidslinjeVindu) => {
        if (vindu.id === TidslinjeVindu.TRE_ÅR) {
            settAktivEtikett(undefined);
            setInitiellAktivEtikettErSatt(false);
        }

        settAktivtTidslinjeVindu(({ sluttDato }) => ({
            ...aktivtTidslinjeVindu,
            vindu: vindu,
            startDato: endOfMonth(subMonths(sluttDato, vindu.måneder)),
        }));
    };

    interface YtelseSplittForTidslinje {
        ytelseSomSkalSplittesOpp?: YtelseType;
        ytelseSomSplitterOpp?: YtelseType;
    }

    const ytelserSomMåSplittes = (fagsakType?: FagsakType): YtelseSplittForTidslinje => {
        switch (fagsakType) {
            case FagsakType.NORMAL:
                return {
                    ytelseSomSkalSplittesOpp: YtelseType.UTVIDET_BARNETRYGD,
                    ytelseSomSplitterOpp: YtelseType.SMÅBARNSTILLEGG,
                };
            case FagsakType.BARN_ENSLIG_MINDREÅRIG:
                return {
                    ytelseSomSkalSplittesOpp: YtelseType.ORDINÆR_BARNETRYGD,
                    ytelseSomSplitterOpp: YtelseType.UTVIDET_BARNETRYGD,
                };
            case FagsakType.INSTITUSJON:
            case undefined:
                return {
                    ytelseSomSkalSplittesOpp: undefined,
                    ytelseSomSplitterOpp: undefined,
                };
        }
    };

    const genererRader = (
        fagsakType?: FagsakType,
        personerMedAndelerTilkjentYtelse?: IPersonMedAndelerTilkjentYtelse[]
    ): Periode[][] => {
        const ytelseSomMåSplittes = ytelserSomMåSplittes(fagsakType);
        return personerMedAndelerTilkjentYtelse
            ? personerMedAndelerTilkjentYtelse.map(
                  (personMedAndelerTilkjentYtelse: IPersonMedAndelerTilkjentYtelse) => {
                      return personMedAndelerTilkjentYtelse.ytelsePerioder.reduce(
                          (acc: Periode[], ytelsePeriode: IYtelsePeriode) => {
                              const fom = startOfMonth(isoStringTilDate(ytelsePeriode.stønadFom));
                              const periode: Periode = {
                                  fom,
                                  tom: endOfMonth(isoStringTilDate(ytelsePeriode.stønadTom)),
                                  id: `${
                                      personMedAndelerTilkjentYtelse.personIdent
                                  }_${fom.getMonth()}_${fom.getDay()}`,
                                  status: ytelsePeriode.skalUtbetales ? 'suksess' : 'feil',
                              };

                              if (
                                  ytelsePeriode.ytelseType ===
                                  ytelseSomMåSplittes.ytelseSomSkalSplittesOpp
                              ) {
                                  const andelerSomSkalSplitteOpp =
                                      personMedAndelerTilkjentYtelse.ytelsePerioder.filter(
                                          ytelsePeriodeFilter =>
                                              ytelsePeriodeFilter.ytelseType ===
                                              ytelseSomMåSplittes.ytelseSomSplitterOpp
                                      );

                                  return [
                                      ...acc,
                                      ...splittYtelseVedEndringerPåAnnenYtelse(
                                          periode,
                                          ytelsePeriode,
                                          andelerSomSkalSplitteOpp
                                      ),
                                  ];
                              } else if (
                                  ytelsePeriode.ytelseType !==
                                  ytelseSomMåSplittes.ytelseSomSplitterOpp
                              ) {
                                  return [...acc, periode];
                              } else {
                                  return acc;
                              }
                          },
                          []
                      );
                  }
              )
            : [];
    };

    const filterOgSorterGrunnlagPersonerMedAndeler = (
        personer: IGrunnlagPerson[],
        personerMedAndelerTilkjentYtelse: IPersonMedAndelerTilkjentYtelse[]
    ): IGrunnlagPerson[] => {
        personer.sort(sorterPersonTypeOgFødselsdato);
        return personer.filter(
            grunnlagPerson =>
                personerMedAndelerTilkjentYtelse.length &&
                personerMedAndelerTilkjentYtelse.some(
                    personMedAndel => personMedAndel.personIdent === grunnlagPerson.personIdent
                )
        );
    };

    const filterOgSorterAndelPersonerIGrunnlag = (
        personer: IGrunnlagPerson[],
        personerMedAndelerTilkjentYtelse: IPersonMedAndelerTilkjentYtelse[]
    ): IPersonMedAndelerTilkjentYtelse[] => {
        return personer
            .sort(sorterPersonTypeOgFødselsdato)
            .map((person: IGrunnlagPerson) => {
                return personerMedAndelerTilkjentYtelse.find(
                    (personMedAndelerTilkjentYtelse: IPersonMedAndelerTilkjentYtelse) =>
                        person.personIdent === personMedAndelerTilkjentYtelse.personIdent
                );
            })
            .reduce((acc: IPersonMedAndelerTilkjentYtelse[], andelTilkjentYtelse) => {
                if (andelTilkjentYtelse) {
                    return [...acc, andelTilkjentYtelse];
                }
                return acc;
            }, []);
    };

    return {
        aktivEtikett,
        settAktivEtikett,
        genererFormatertÅrstall,
        tidslinjeVinduer,
        aktivtTidslinjeVindu,
        naviger,
        endreTidslinjeVindu,
        genererRader,
        initiellAktivEtikettErSatt,
        setInitiellAktivEtikettErSatt,
        filterOgSorterGrunnlagPersonerMedAndeler,
        filterOgSorterAndelPersonerIGrunnlag,
    };
});

export { TidslinjeProvider, useTidslinje };
