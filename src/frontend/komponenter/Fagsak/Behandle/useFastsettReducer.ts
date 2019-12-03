import * as React from 'react';
import { IBarnBeregning, ordinærBeløp } from '../../../typer/behandle';
import { IFagsak, sakstyper } from '../../../typer/fagsak';
import { IFelt, ValiderIFelt, Valideringsstatus } from '../../../typer/felt';
import { erGyldigDato } from '../../../utils/validators';

interface IStore {
    sakstype: string;
    barnasBeregning: Array<IFelt<IBarnBeregning>>;
    behandlingsresultat: string;
}

export const lagInitiellFelt = <T>(verdi: T, valideringsfunksjon: ValiderIFelt<T>): IFelt<T> => {
    return {
        feilmelding: 'Feltet er påkrevd, men mangler input',
        valideringsFunksjon: valideringsfunksjon,
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        verdi,
    };
};

export const lastInitialState = (fagsak: IFagsak): IStore => ({
    barnasBeregning: fagsak.behandlinger[0].barna.map(barn => {
        return lagInitiellFelt<IBarnBeregning>(
            {
                barn,
                beløp: ordinærBeløp,
                startDato: '',
            },
            erGyldigDato
        );
    }),
    behandlingsresultat: 'innvilget',
    sakstype: sakstyper.ORDINÆR.id,
});

export type Action =
    | {
          type: 'SETT_BARNAS_BEREGNING';
          payload: {
              oppdatertBarnBeregning: IBarnBeregning;
              index: number;
          };
      }
    | {
          type: 'SETT_SAKSTYPE';
          payload: string;
      }
    | {
          type: 'SETT_BEHANDLINGSRESULTAT';
          payload: string;
      };

const fastsettReducer = (state: IStore, action: Action): IStore => {
    switch (action.type) {
        case 'SETT_BARNAS_BEREGNING':
            const barnasBeregningKopi = [...state.barnasBeregning];
            barnasBeregningKopi[action.payload.index] = barnasBeregningKopi[
                action.payload.index
            ].valideringsFunksjon({
                ...barnasBeregningKopi[action.payload.index],
                verdi: action.payload.oppdatertBarnBeregning,
            });

            return {
                ...state,
                barnasBeregning: barnasBeregningKopi,
            };
        case 'SETT_BEHANDLINGSRESULTAT':
            return {
                ...state,
                behandlingsresultat: action.payload,
            };
        case 'SETT_SAKSTYPE':
            return {
                ...state,
                sakstype: action.payload,
            };
        default:
            return state;
    }
};

const useFastsettReducer = (fagsak: IFagsak) => {
    return React.useReducer(fastsettReducer, lastInitialState(fagsak));
};

export default useFastsettReducer;
