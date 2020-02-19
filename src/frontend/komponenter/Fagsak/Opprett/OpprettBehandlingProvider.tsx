import * as React from 'react';
import {
    Behandlingstype,
    BehandlingKategori,
    BehandlingUnderkategori,
} from '../../../typer/fagsak';
import { IFelt } from '../../../typer/felt';
import { lagInitiellFelt } from '../../../typer/provider';
import { fødselsnummerValidator } from '../../../utils/validators';

export type IFødselsnummerFelt = IFelt<string>;

export enum actions {
    SETT_SØKERS_FØDSELSNUMMER = 'SETT_SØKERS_FØDSELSNUMMER',
    SETT_BEHANDLINGSTYPE = 'SETT_BEHANDLINGSTYPE',
    SETT_BEHANDLING_KATEGORI = 'SETT_BEHANDLING_KATEGORI',
    SETT_BEHANDLING_UNDERKATEGORI = 'SETT_BEHANDLING_UNDERKATEGORI',
    LEGG_TIL_BARN = 'LEGG_TIL_BARN',
    SLETT_BARN = 'SLETT_BARN',
    SETT_BARNS_FØDSELSNUMMER = 'SETT_BARNS_FØDSELSNUMMER',
}

export interface IAction {
    payload?: any;
    type: actions;
}

type Dispatch = (action: IAction) => void;

export interface IState {
    barnasFødselsnummer: IFødselsnummerFelt[];
    behandlingstype: Behandlingstype;
    kategori: BehandlingKategori;
    søkersFødselsnummer: IFødselsnummerFelt;
    underkategori: BehandlingUnderkategori;
}

const initialState: IState = {
    barnasFødselsnummer: [lagInitiellFelt('', fødselsnummerValidator)],
    behandlingstype: Behandlingstype.FØRSTEGANGSBEHANDLING,
    kategori: BehandlingKategori.NASJONAL,
    søkersFødselsnummer: lagInitiellFelt('', fødselsnummerValidator),
    underkategori: BehandlingUnderkategori.ORDINÆR,
};

const OpprettBehandlingStateContext = React.createContext<IState | undefined>(undefined);
const OpprettBehandlingDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const opprettBehandlingReducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case actions.SETT_SØKERS_FØDSELSNUMMER:
            return {
                ...state,
                søkersFødselsnummer: state.søkersFødselsnummer.valideringsFunksjon({
                    ...state.søkersFødselsnummer,
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
                barnasFødselsnummer: [
                    ...state.barnasFødselsnummer,
                    lagInitiellFelt('', fødselsnummerValidator),
                ],
            };
        case actions.SLETT_BARN:
            const fødselsNummerListe = state.barnasFødselsnummer;
            return {
                ...state,
                barnasFødselsnummer: [
                    ...fødselsNummerListe
                        .slice(0, action.payload)
                        .concat(
                            ...fødselsNummerListe.slice(
                                action.payload + 1,
                                fødselsNummerListe.length
                            )
                        ),
                ],
            };
        case actions.SETT_BARNS_FØDSELSNUMMER:
            const barnasFødselsnummerKopi = [...state.barnasFødselsnummer];
            barnasFødselsnummerKopi[action.payload.index] = barnasFødselsnummerKopi[
                action.payload.index
            ].valideringsFunksjon({
                ...barnasFødselsnummerKopi[action.payload.index],
                verdi: action.payload.fødselsnummer,
            });

            return {
                ...state,
                barnasFødselsnummer: barnasFødselsnummerKopi,
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
