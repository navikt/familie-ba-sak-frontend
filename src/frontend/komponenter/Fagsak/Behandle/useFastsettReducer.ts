import * as React from 'react';
import { IBarnBeregning, ordinærBeløp } from '../../../typer/behandle';
import { IFagsak, sakstyper } from '../../../typer/fagsak';

enum Valideringsstatus {
    FEIL = 'FEIL',
    ADVARSEL = 'ADVARSEL',
    OK = 'OK',
    IKKE_VALIDERT = 'IKKE_VALIDERT',
}

interface IFelt<T> {
    feilmelding: string;
    valideringsstatus: Valideringsstatus;
    verdi: T;
}

interface IStore {
    sakstype: IFelt<string>;
    barnasBeregning: IFelt<IBarnBeregning[]>;
    behandlingsresultat: IFelt<string>;
}

const lagInitiellFelt = <T>(verdi: T): IFelt<T> => ({
    feilmelding: '',
    valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
    verdi,
});

export const lastInitialState = (fagsak: IFagsak): IStore => ({
    barnasBeregning: lagInitiellFelt<IBarnBeregning[]>(
        fagsak.behandlinger[0].barna.map(barn => ({
            barn,
            beløp: ordinærBeløp,
            startDato: '',
        }))
    ),
    behandlingsresultat: lagInitiellFelt<string>('innvilget'),
    sakstype: lagInitiellFelt<string>(sakstyper.ORDINÆR.id),
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
