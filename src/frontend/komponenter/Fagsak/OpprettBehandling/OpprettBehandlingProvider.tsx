import * as React from 'react';

import {
    BehandlingKategori,
    Behandlingstype,
    BehandlingUnderkategori,
} from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';

export enum actions {
    SETT_BEHANDLINGSTYPE = 'SETT_BEHANDLINGSTYPE',
    SETT_BEHANDLING_KATEGORI = 'SETT_BEHANDLING_KATEGORI',
    SETT_BEHANDLING_UNDERKATEGORI = 'SETT_BEHANDLING_UNDERKATEGORI',
}

export interface IAction {
    // eslint-disable-next-line
    payload?: any;
    type: actions;
}

type Dispatch = (action: IAction) => void;

export interface IState {
    behandlingstype: Behandlingstype;
    kategori: BehandlingKategori;
    underkategori: BehandlingUnderkategori;
}

const initialState = (fagsak: IFagsak): IState => {
    return {
        behandlingstype:
            fagsak.behandlinger.length === 0
                ? Behandlingstype.FØRSTEGANGSBEHANDLING
                : Behandlingstype.REVURDERING,
        kategori: BehandlingKategori.NASJONAL,
        underkategori: BehandlingUnderkategori.ORDINÆR,
    };
};

const OpprettBehandlingStateContext = React.createContext<IState | undefined>(undefined);
const OpprettBehandlingDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const opprettBehandlingReducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case actions.SETT_BEHANDLINGSTYPE:
            return {
                ...state,
                behandlingstype: action.payload,
            };
        case actions.SETT_BEHANDLING_KATEGORI:
            return {
                ...state,
                kategori: action.payload,
            };
        case actions.SETT_BEHANDLING_UNDERKATEGORI:
            return {
                ...state,
                underkategori: action.payload,
            };
        default: {
            throw new Error(`Uhåndtert action type: ${action.type}`);
        }
    }
};

interface IProps {
    fagsak: IFagsak;
}

const OpprettBehandlingProvider: React.FunctionComponent<IProps> = ({ fagsak, children }) => {
    const [state, dispatch] = React.useReducer(opprettBehandlingReducer, initialState(fagsak));

    return (
        <OpprettBehandlingStateContext.Provider value={state}>
            <OpprettBehandlingDispatchContext.Provider value={dispatch}>
                {children}
            </OpprettBehandlingDispatchContext.Provider>
        </OpprettBehandlingStateContext.Provider>
    );
};

const useOpprettBehandlingContext = () => {
    const context = React.useContext(OpprettBehandlingStateContext);
    if (context === undefined) {
        throw new Error('useOpprettBehandlingContext må brukes inne i en OpprettBehandlingContext');
    }
    return context;
};

const useOpprettBehandlingDispatch = () => {
    const context = React.useContext(OpprettBehandlingDispatchContext);
    if (context === undefined) {
        throw new Error(
            'useOpprettBehandlingDispatch må brukes inne i en OpprettBehandlingContext'
        );
    }
    return context;
};

export { OpprettBehandlingProvider, useOpprettBehandlingContext, useOpprettBehandlingDispatch };
