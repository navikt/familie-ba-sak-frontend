import * as React from 'react';
import {
    Behandlingstype,
    BehandlingKategori,
    BehandlingUnderkategori,
} from '../../../typer/fagsak';
import { IFelt } from '../../../typer/felt';
import { lagInitiellFelt } from '../../../typer/provider';
import { identValidator } from '../../../utils/validators';

export type IIdentFelt = IFelt<string>;

export enum actions {
    SETT_SØKERS_FØDSELSNUMMER = 'SETT_SØKERS_FØDSELSNUMMER',
    SETT_BEHANDLINGSTYPE = 'SETT_BEHANDLINGSTYPE',
    SETT_BEHANDLING_KATEGORI = 'SETT_BEHANDLING_KATEGORI',
    SETT_BEHANDLING_UNDERKATEGORI = 'SETT_BEHANDLING_UNDERKATEGORI',
    LEGG_TIL_BARN = 'LEGG_TIL_BARN',
    SLETT_BARN = 'SLETT_BARN',
    SETT_BARNAS_IDENTER = 'SETT_BARNAS_IDENTER',
}

export interface IAction {
    payload?: any;
    type: actions;
}

type Dispatch = (action: IAction) => void;

export interface IState {
    barnasIdenter: IIdentFelt[];
    behandlingstype: Behandlingstype;
    kategori: BehandlingKategori;
    søkersIdent: IIdentFelt;
    underkategori: BehandlingUnderkategori;
}

const initialState: IState = {
    barnasIdenter: [lagInitiellFelt('', identValidator)],
    behandlingstype: Behandlingstype.FØRSTEGANGSBEHANDLING,
    kategori: BehandlingKategori.NASJONAL,
    søkersIdent: lagInitiellFelt('', identValidator),
    underkategori: BehandlingUnderkategori.ORDINÆR,
};

const OpprettBehandlingStateContext = React.createContext<IState | undefined>(undefined);
const OpprettBehandlingDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const opprettBehandlingReducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case actions.SETT_SØKERS_FØDSELSNUMMER:
            return {
                ...state,
                søkersIdent: state.søkersIdent.valideringsFunksjon({
                    ...state.søkersIdent,
                    verdi: action.payload,
                }),
            };
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
        case actions.LEGG_TIL_BARN:
            return {
                ...state,
                barnasIdenter: [...state.barnasIdenter, lagInitiellFelt('', identValidator)],
            };
        case actions.SLETT_BARN:
            const identListe = state.barnasIdenter;
            return {
                ...state,
                barnasIdenter: [
                    ...identListe
                        .slice(0, action.payload)
                        .concat(...identListe.slice(action.payload + 1, identListe.length)),
                ],
            };
        case actions.SETT_BARNAS_IDENTER:
            const barnasIdenterKopi = [...state.barnasIdenter];
            barnasIdenterKopi[action.payload.index] = barnasIdenterKopi[
                action.payload.index
            ].valideringsFunksjon({
                ...barnasIdenterKopi[action.payload.index],
                verdi: action.payload.ident,
            });

            return {
                ...state,
                barnasIdenter: barnasIdenterKopi,
            };
        default: {
            throw new Error(`Uhåndtert action type: ${action.type}`);
        }
    }
};

const OpprettBehandlingProvider: React.StatelessComponent = ({ children }) => {
    const [state, dispatch] = React.useReducer(opprettBehandlingReducer, initialState);

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
