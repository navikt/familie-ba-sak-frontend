import createUseContext from 'constate';
import { useState } from 'react';
import moment from 'moment';
import { IPersonBeregning, IYtelsePeriode } from '../typer/beregning';
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
        sluttDato: moment().endOf('month'),
        startDato: moment().subtract(12, 'month').endOf('month'),
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

    const genererRader = (personBeregninger?: IPersonBeregning[]): Periode[][] => {
        return personBeregninger
            ? personBeregninger.map((personBeregning: IPersonBeregning) => {
                  return personBeregning.ytelsePerioder.map(
                      (ytelsePeriode: IYtelsePeriode, index: number) => ({
                          fom: new Date(
                              hentFørsteDagIYearMonth(ytelsePeriode.stønadFom).toISOString()
                          ),
                          tom: new Date(
                              hentSisteDagIYearMonth(ytelsePeriode.stønadTom).toISOString()
                          ),
                          id: `${personBeregning.personIdent}_${index}`,
                          status: 'suksess',
                      })
                  );
              })
            : [[]];
    };

    const mapPersonberegningerTilPersoner = (
        personer: IGrunnlagPerson[],
        personberegninger?: IPersonBeregning[]
    ): IGrunnlagPerson[] => {
        if (!personberegninger) {
            return [];
        }
        return personberegninger
            .map((personBeregning: IPersonBeregning) => {
                return personer.find(
                    (person: IGrunnlagPerson) => person.personIdent === personBeregning.personIdent
                );
            })
            .reduce((acc: IGrunnlagPerson[], person) => {
                if (person) {
                    return [...acc, person];
                }
                return acc;
            }, []);
    };

    const mapPersonerTilPersonberegninger = (
        personer: IGrunnlagPerson[],
        personberegninger?: IPersonBeregning[]
    ): IPersonBeregning[] => {
        if (!personberegninger) {
            return [];
        }
        return personer
            .map((person: IGrunnlagPerson) => {
                return personberegninger.find(
                    (personberegning: IPersonBeregning) =>
                        person.personIdent === personberegning.personIdent
                );
            })
            .reduce((acc: IPersonBeregning[], personberegning) => {
                if (personberegning) {
                    return [...acc, personberegning];
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
        mapPersonberegningerTilPersoner,
        mapPersonerTilPersonberegninger,
    };
});

export { TidslinjeProvider, useTidslinje };
