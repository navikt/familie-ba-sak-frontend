import createUseContext from 'constate';
import { useState } from 'react';
import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/components/types.internal';
import moment from 'moment';
import { IPersonBeregning, IYtelsePeriode } from '../typer/beregning';
import { Periode } from '@navikt/helse-frontend-tidslinje/lib';

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

    const [aktivtTidslinjeVindu, settAktivtTidslinjeVindu] = useState({
        vindu: tidslinjeVinduer[TidslinjeVindu.ETT_ÅR],
        sluttDato: moment(),
        startDato: moment().subtract(12, 'month'),
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
                sluttDato: sluttDato.clone().subtract(vindu.måneder, 'month'),
                startDato: startDato.clone().subtract(vindu.måneder, 'month'),
            }));
        } else {
            settAktivtTidslinjeVindu(({ sluttDato, startDato, vindu }) => ({
                ...aktivtTidslinjeVindu,
                sluttDato: sluttDato.clone().add(vindu.måneder, 'month'),
                startDato: startDato.clone().add(vindu.måneder, 'month'),
            }));
        }
    };

    const endreTidslinjeVindu = (vindu: ITidslinjeVindu) => {
        if (vindu.id === TidslinjeVindu.TRE_ÅR) {
            settAktivEtikett(undefined);
        }

        settAktivtTidslinjeVindu(({ sluttDato }) => ({
            ...aktivtTidslinjeVindu,
            vindu: vindu,
            startDato: sluttDato.clone().subtract(vindu.måneder, 'month'),
        }));
    };

    const genererRader = (personBeregninger?: IPersonBeregning[]): Periode[][] => {
        return personBeregninger
            ? personBeregninger.map((personBeregning: IPersonBeregning) => {
                  return personBeregning.ytelsePerioder.map(
                      (ytelsePeriode: IYtelsePeriode, index: number) => ({
                          fom: new Date(ytelsePeriode.stønadFom),
                          tom: new Date(ytelsePeriode.stønadTom),
                          id: `${personBeregning.personIdent}_${index}`,
                          status: 'suksess',
                      })
                  );
              })
            : [[]];
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
    };
});

export { TidslinjeProvider, useTidslinje };
