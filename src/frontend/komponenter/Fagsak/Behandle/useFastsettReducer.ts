import * as React from 'react';
import { IBarnBeregning, ordinærBeløp } from '../../../typer/behandle';
import { IFagsak, sakstyper } from '../../../typer/fagsak';

interface IStore {
    sakstype: string;
    barnasBeregning: IBarnBeregning[];
    behandlingsresultat: string;
}

export const lastInitialState = (fagsak: IFagsak): IStore => ({
    barnasBeregning: fagsak.behandlinger[0].barna.map(barn => ({
        barn,
        beløp: ordinærBeløp,
        startDato: '',
    })),
    behandlingsresultat: 'innvilget',
    sakstype: sakstyper.ORDINÆR.id,
});

export type Action =
    | {
          type: 'SETT_BARNAS_BEREGNING';
          payload: IBarnBeregning[];
      }
    | {
          type: 'SETT_SAKSTYPE';
          payload: string;
      }
    | {
          type: 'SETT_BEHANDLINGSRESULTAT';
          payload: string;
      };

const fastsettReducer = (state: IStore, action: Action) => {
    switch (action.type) {
        case 'SETT_BARNAS_BEREGNING':
            return {
                ...state,
                barnasBeregning: action.payload,
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
