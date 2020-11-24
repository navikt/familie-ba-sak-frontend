import createUseContext from 'constate';
import { useState } from 'react';
import dayjs from 'dayjs';
import { IAndelTilkjentYtelse, IYtelsePeriode } from '../typer/beregning';
import { Periode } from '@navikt/helse-frontend-tidslinje';
import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';
import { IGrunnlagPerson } from '../typer/person';
import { hentFørsteDagIYearMonth, hentSisteDagIYearMonth } from '../utils/tid';

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
        sluttDato: dayjs().endOf('month'),
        startDato: dayjs().subtract(12, 'month').endOf('month'),
    });

    const genererFormatertÅrstall = () => {
        const startÅr = aktivtTidslinjeVindu.startDato.year();
        const sluttÅr = aktivtTidslinjeVindu.sluttDato.year();

        if (startÅr !== sluttÅr) {
            return `${startÅr} - ${sluttÅr}`;
        } else return sluttÅr;
    };

    const naviger = (retning: NavigeringsRetning) => {
        if (retning === NavigeringsRetning.VENSTRE) {
            settAktivtTidslinjeVindu(({ sluttDato, startDato, vindu }) => ({
                ...aktivtTidslinjeVindu,
                sluttDato: sluttDato.clone().subtract(vindu.måneder, 'month').endOf('month'),
                startDato: startDato.clone().subtract(vindu.måneder, 'month').endOf('month'),
            }));
        } else {
            settAktivtTidslinjeVindu(({ sluttDato, startDato, vindu }) => ({
                ...aktivtTidslinjeVindu,
                sluttDato: sluttDato.clone().add(vindu.måneder, 'month').endOf('month'),
                startDato: startDato.clone().add(vindu.måneder, 'month').endOf('month'),
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
            startDato: sluttDato.clone().subtract(vindu.måneder, 'month').endOf('month'),
        }));
    };

    const genererRader = (andelerTilkjentYtelse?: IAndelTilkjentYtelse[]): Periode[][] => {
        return andelerTilkjentYtelse
            ? andelerTilkjentYtelse.map((andelTilkjentYtelse: IAndelTilkjentYtelse) => {
                  return andelTilkjentYtelse.ytelsePerioder.map(
                      (ytelsePeriode: IYtelsePeriode, index: number) => ({
                          fom: new Date(
                              hentFørsteDagIYearMonth(ytelsePeriode.stønadFom).toISOString()
                          ),
                          tom: new Date(
                              hentSisteDagIYearMonth(ytelsePeriode.stønadTom).toISOString()
                          ),
                          id: `${andelTilkjentYtelse.personIdent}_${index}`,
                          status: 'suksess',
                      })
                  );
              })
            : [[]];
    };

    const mapAndelerTilkjentYtelseTilPersoner = (
        personer: IGrunnlagPerson[],
        andelerTilkjentYtelse: IAndelTilkjentYtelse[]
    ): IGrunnlagPerson[] => {
        return andelerTilkjentYtelse
            .map((andelTilkjentYtelse: IAndelTilkjentYtelse) => {
                return personer.find(
                    (person: IGrunnlagPerson) =>
                        person.personIdent === andelTilkjentYtelse.personIdent
                );
            })
            .reduce((acc: IGrunnlagPerson[], person) => {
                if (person) {
                    return [...acc, person];
                }
                return acc;
            }, []);
    };

    const mapPersonerTilAndelerTilkjentYtelse = (
        personer: IGrunnlagPerson[],
        andelerTilkjentYtelse: IAndelTilkjentYtelse[]
    ): IAndelTilkjentYtelse[] => {
        return personer
            .map((person: IGrunnlagPerson) => {
                return andelerTilkjentYtelse.find(
                    (andelTilkjentYtelse: IAndelTilkjentYtelse) =>
                        person.personIdent === andelTilkjentYtelse.personIdent
                );
            })
            .reduce((acc: IAndelTilkjentYtelse[], andelTilkjentYtelse) => {
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
        mapAndelerTilkjentYtelseTilPersoner,
        mapPersonerTilAndelerTilkjentYtelse,
    };
});

export { TidslinjeProvider, useTidslinje };
