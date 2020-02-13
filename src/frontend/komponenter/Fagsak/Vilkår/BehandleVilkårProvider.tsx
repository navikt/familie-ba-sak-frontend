import * as React from 'react'
import { IFagsak } from '../../../typer/fagsak';

export enum actions {
    SETT_RESULTAT = 'SETT_RESULTAT',
}

export enum VedtakResultat {
    INNVILGET = 'INNVILGET',
    AVSLÅTT = 'AVSLÅTT',
    OPPHØRT = 'OPPHØRT',
    HENLAGT = 'HENLAGT'
}

export interface IAction {
    payload?: any;
    type: actions;
}

type Dispatch = (action: IAction) => void;

export interface IState {
    vedtakResultat: VedtakResultat
}

const initialState = (): IState => {
    return {
        vedtakResultat: VedtakResultat.INNVILGET,
    }
};

const BehandlingVilkårStateContext = React.createContext<IState | undefined>(undefined);
const BehandlingVilkårDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const behandlingVilkårReducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case actions.SETT_RESULTAT:
            return {
                ...state,
                vedtakResultat: action.payload,
            };
        default: {
            throw new Error(`Uhåndtert action type: ${action.type}`);
        }
    }
};

interface IBehandlingVilkårProvider {
    children: any;
    fagsak: IFagsak;
}

const BehandlingVilkårProvider: React.StatelessComponent<IBehandlingVilkårProvider> = ({ fagsak, children }) => {
    const [state, dispatch] = React.useReducer(behandlingVilkårReducer, initialState());

    return (
        <BehandlingVilkårStateContext.Provider value={state}>
            <BehandlingVilkårDispatchContext.Provider value={dispatch}>
                {children}
            </BehandlingVilkårDispatchContext.Provider>
        </BehandlingVilkårStateContext.Provider>
    );
};

const useBehandlingVilkårContext = () => {
    const context = React.useContext(BehandlingVilkårStateContext);
    if (context === undefined) {
        throw new Error('useBehandlingVilkårContext må brukes inne i en BehandlingVilkårStateContext');
    }
    return context;
};

const useBehandlingVilkårDispatch = () => {
    const context = React.useContext(BehandlingVilkårDispatchContext);
    if (context === undefined) {
        throw new Error(
            'useBehandlingVilkårDispatch må brukes inne i en BehandlingVilkårDispatchContext'
        );
    }
    return context;
};

export { BehandlingVilkårProvider, useBehandlingVilkårContext, useBehandlingVilkårDispatch };
