import * as React from 'react';
import { IBarnBeregning, ordinærBeløp } from '../../../typer/behandle';
import { IFagsak } from '../../../typer/fagsak';
import { IFelt } from '../../../typer/felt';
import { lagInitiellFelt } from '../../../typer/provider';
import { erGyldigDato } from '../../../utils/validators';

export enum actions {
    SETT_BARNAS_BEREGNING = 'SETT_BARNAS_BEREGNING',
    SETT_SAKSTYPE = 'SETT_SAKSTYPE',
    SETT_BEHANDLINGSRESULTAT = 'SETT_BEHANDLINGSRESULTAT',
    SETT_SENDER_INN = 'SETT_SENDER_INN',
}

export interface IAction {
    payload?: any;
    type: actions;
}

type Dispatch = (action: IAction) => void;

export interface IState {
    barnasBeregning: IFelt<IBarnBeregning>[];
    behandlingsresultat: string;
    senderInn: boolean;
}

export const lastInitialState = (fagsak: IFagsak): IState => ({
    barnasBeregning: fagsak.behandlinger[0].barnasFødselsnummer.map(barn => {
        return lagInitiellFelt<IBarnBeregning>(
            {
                barn,
                beløp: ordinærBeløp,
                stønadFom: '',
            },
            erGyldigDato
        );
    }),
    behandlingsresultat: 'innvilget',
    senderInn: false,
});

const FastsettVedtakStateContext = React.createContext<IState | undefined>(undefined);
const FastsettVedtakDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const fastsettVedtakReducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case actions.SETT_BARNAS_BEREGNING:
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
        case actions.SETT_BEHANDLINGSRESULTAT:
            return {
                ...state,
                behandlingsresultat: action.payload,
            };
        case actions.SETT_SENDER_INN:
            return {
                ...state,
                senderInn: action.payload,
            };
        default:
            return state;
    }
};

interface IFastsettVedtakProvider {
    children: any;
    fagsak: IFagsak;
}

const FastsettVedtakProvider: React.StatelessComponent<IFastsettVedtakProvider> = ({
    children,
    fagsak,
}) => {
    const [state, dispatch] = React.useReducer(fastsettVedtakReducer, lastInitialState(fagsak));

    return (
        <FastsettVedtakStateContext.Provider value={state}>
            <FastsettVedtakDispatchContext.Provider value={dispatch}>
                {children}
            </FastsettVedtakDispatchContext.Provider>
        </FastsettVedtakStateContext.Provider>
    );
};

const useFastsettVedtakContext = () => {
    const context = React.useContext(FastsettVedtakStateContext);
    if (context === undefined) {
        throw new Error('useFastsettVedtakContext må brukes inne i en FastsettVedtakContext');
    }
    return context;
};

const useFastsettVedtakDispatch = () => {
    const context = React.useContext(FastsettVedtakDispatchContext);
    if (context === undefined) {
        throw new Error('useFastsettVedtakDispatch må brukes inne i en FastsettVedtakContext');
    }
    return context;
};

export { FastsettVedtakProvider, useFastsettVedtakContext, useFastsettVedtakDispatch };
