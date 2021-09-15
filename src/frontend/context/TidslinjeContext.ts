import { useState } from 'react';

import createUseContext from 'constate';

import { Periode } from '@navikt/helse-frontend-tidslinje';
import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';

import { IPersonMedAndelerTilkjentYtelse, IYtelsePeriode } from '../typer/beregning';
import { IGrunnlagPerson } from '../typer/person';
import {
    hentFørsteDagIYearMonth,
    hentSisteDagIYearMonth,
    kalenderDatoTilDate,
    KalenderEnhet,
    leggTil,
    iDag,
    sisteDagIInneværendeMåned,
    sisteDagIMåned,
    trekkFra,
} from '../utils/kalender';

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

    const [aktivEtikett, settAktivEtikett] = useState<Skalaetikett | undefined>(undefined);
    const [initiellAktivEtikettErSatt, setInitiellAktivEtikettErSatt] = useState<boolean>(false);

    const [aktivtTidslinjeVindu, settAktivtTidslinjeVindu] = useState({
        vindu: tidslinjeVinduer[TidslinjeVindu.ETT_ÅR],
        startDato: sisteDagIMåned(trekkFra(iDag(), 12, KalenderEnhet.MÅNED)),
        sluttDato: sisteDagIInneværendeMåned(),
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
                      return personMedAndelerTilkjentYtelse.ytelsePerioder.map(
                          (ytelsePeriode: IYtelsePeriode, index: number) => ({
                              fom: kalenderDatoTilDate(
                                  hentFørsteDagIYearMonth(ytelsePeriode.stønadFom)
                              ),
                              tom: kalenderDatoTilDate(
                                  hentSisteDagIYearMonth(ytelsePeriode.stønadTom)
                              ),
                              id: `${personMedAndelerTilkjentYtelse.personIdent}_${index}`,
                              status: ytelsePeriode.beløp > 0 ? 'suksess' : 'feil',
                          })
                      );
                  }
              )
            : [[]];
    };

    const filterGrunnlagPersonerMedAndeler = (
        personer: IGrunnlagPerson[],
        personerMedAndelerTilkjentYtelse: IPersonMedAndelerTilkjentYtelse[]
    ): IGrunnlagPerson[] => {
        return personer.filter(
            grunnlagPerson =>
                personerMedAndelerTilkjentYtelse.length &&
                personerMedAndelerTilkjentYtelse.some(
                    personMedAndel => personMedAndel.personIdent === grunnlagPerson.personIdent
                )
        );
    };

    const filterAndelPersonerIGrunnlag = (
        personer: IGrunnlagPerson[],
        personerMedAndelerTilkjentYtelse: IPersonMedAndelerTilkjentYtelse[]
    ): IPersonMedAndelerTilkjentYtelse[] => {
        return personerMedAndelerTilkjentYtelse.filter(
            personMedAndel =>
                personer.length &&
                personer.some(
                    grunnlagPerson => grunnlagPerson.personIdent === personMedAndel.personIdent
                )
        );
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
        filterGrunnlagPersonerMedAndeler,
        filterAndelPersonerIGrunnlag,
    };
});

export { TidslinjeProvider, useTidslinje };
