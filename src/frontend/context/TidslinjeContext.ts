import { useState } from 'react';

import createUseContext from 'constate';

import type { Periode, Etikett } from '@navikt/familie-tidslinje';

import type { IPersonMedAndelerTilkjentYtelse, IYtelsePeriode } from '../typer/beregning';
import { YtelseType } from '../typer/beregning';
import type { IGrunnlagPerson } from '../typer/person';
import { sorterPersonTypeOgFødselsdato } from '../utils/formatter';
import {
    hentFørsteDagIYearMonth,
    hentSisteDagIYearMonth,
    kalenderDatoTilDate,
    KalenderEnhet,
    leggTil,
    sisteDagIMåned,
    trekkFra,
    nesteMåned,
} from '../utils/kalender';
import { splittUtvidetVedEndringerPåSmåbarnstillegg } from '../utils/tidslinje';

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
        startDato: sisteDagIMåned(trekkFra(nesteMåned(), 12, KalenderEnhet.MÅNED)),
        sluttDato: sisteDagIMåned(nesteMåned()),
    });

    const genererFormatertÅrstall = () => {
        const startÅr = aktivtTidslinjeVindu.startDato.år;
        const sluttÅr = aktivtTidslinjeVindu.sluttDato.år;

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
                startDato: sisteDagIMåned(trekkFra(startDato, vindu.måneder, KalenderEnhet.MÅNED)),
                sluttDato: sisteDagIMåned(trekkFra(sluttDato, vindu.måneder, KalenderEnhet.MÅNED)),
            }));
        } else {
            settAktivtTidslinjeVindu(({ sluttDato, startDato, vindu }) => ({
                ...aktivtTidslinjeVindu,
                startDato: sisteDagIMåned(leggTil(startDato, vindu.måneder, KalenderEnhet.MÅNED)),
                sluttDato: sisteDagIMåned(leggTil(sluttDato, vindu.måneder, KalenderEnhet.MÅNED)),
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
            startDato: sisteDagIMåned(trekkFra(sluttDato, vindu.måneder, KalenderEnhet.MÅNED)),
        }));
    };

    const genererRader = (
        personerMedAndelerTilkjentYtelse?: IPersonMedAndelerTilkjentYtelse[]
    ): Periode[][] => {
        return personerMedAndelerTilkjentYtelse
            ? personerMedAndelerTilkjentYtelse.map(
                  (personMedAndelerTilkjentYtelse: IPersonMedAndelerTilkjentYtelse) => {
                      return personMedAndelerTilkjentYtelse.ytelsePerioder.reduce(
                          (acc: Periode[], ytelsePeriode: IYtelsePeriode) => {
                              const fom = kalenderDatoTilDate(
                                  hentFørsteDagIYearMonth(ytelsePeriode.stønadFom)
                              );
                              const periode: Periode = {
                                  fom,
                                  tom: kalenderDatoTilDate(
                                      hentSisteDagIYearMonth(ytelsePeriode.stønadTom)
                                  ),
                                  id: `${
                                      personMedAndelerTilkjentYtelse.personIdent
                                  }_${fom.getMonth()}_${fom.getDay()}`,
                                  status: ytelsePeriode.skalUtbetales ? 'suksess' : 'feil',
                              };

                              if (ytelsePeriode.ytelseType === YtelseType.UTVIDET_BARNETRYGD) {
                                  const småbarnstilleggAndeler =
                                      personMedAndelerTilkjentYtelse.ytelsePerioder.filter(
                                          ytelsePeriodeFilter =>
                                              ytelsePeriodeFilter.ytelseType ===
                                              YtelseType.SMÅBARNSTILLEGG
                                      );

                                  return [
                                      ...acc,
                                      ...splittUtvidetVedEndringerPåSmåbarnstillegg(
                                          periode,
                                          ytelsePeriode,
                                          småbarnstilleggAndeler
                                      ),
                                  ];
                              } else if (ytelsePeriode.ytelseType !== YtelseType.SMÅBARNSTILLEGG) {
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
