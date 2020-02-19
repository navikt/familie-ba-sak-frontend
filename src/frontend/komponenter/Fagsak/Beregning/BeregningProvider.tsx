import * as React from 'react';
import { IBarnBeregning, ordinærBeløp } from '../../../typer/behandle';
import { IFagsak, IBehandling } from '../../../typer/fagsak';
import { IFelt } from '../../../typer/felt';
import { lagInitiellFelt } from '../../../typer/provider';
import { erGyldigMånedDato } from '../../../utils/validators';
import { IPerson, PersonType } from '../../../typer/person';

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
}

export const lastInitialState = (fagsak: IFagsak): IState => {
    const aktivBehandling = fagsak.behandlinger.find((behandling: IBehandling) => behandling.aktiv);

    let nyBarnasBeregning: IFelt<IBarnBeregning>[] = [];
    if (aktivBehandling) {
        nyBarnasBeregning = aktivBehandling.personer
            .filter((person: IPerson) => person.type === PersonType.BARN)
            .map(barn => {
                return lagInitiellFelt<IBarnBeregning>(
                    {
                        barn: barn.personIdent,
                        beløp: ordinærBeløp,
                        stønadFom: '',
                    },
                    erGyldigMånedDato
                );
            });
    }

    return {
        barnasBeregning: nyBarnasBeregning,
    };
};

const BeregningStateContext = React.createContext<IState | undefined>(undefined);
const BeregningDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const beregningReducer = (state: IState, action: IAction): IState => {
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
        default:
            return state;
    }
};

interface IBeregningProvider {
    children: any;
    fagsak: IFagsak;
}

const BeregningProvider: React.StatelessComponent<IBeregningProvider> = ({ children, fagsak }) => {
    const [state, dispatch] = React.useReducer(beregningReducer, lastInitialState(fagsak));

    return (
        <BeregningStateContext.Provider value={state}>
            <BeregningDispatchContext.Provider value={dispatch}>
                {children}
            </BeregningDispatchContext.Provider>
        </BeregningStateContext.Provider>
    );
};

const useBeregningContext = () => {
    const context = React.useContext(BeregningStateContext);
    if (context === undefined) {
        throw new Error('useBeregningContext må brukes inne i en BeregningContext');
    }
    return context;
};

const useBeregningDispatch = () => {
    const context = React.useContext(BeregningDispatchContext);
    if (context === undefined) {
        throw new Error('useBeregningDispatch må brukes inne i en BeregningContext');
    }
    return context;
};

export { BeregningProvider, useBeregningContext, useBeregningDispatch };
