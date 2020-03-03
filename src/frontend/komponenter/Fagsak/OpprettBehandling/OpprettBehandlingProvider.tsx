import * as React from 'react';
import { IFagsak } from '../../../typer/fagsak';
import { IFelt, Valideringsstatus } from '../../../typer/felt';
import { lagInitiellFelt } from '../../../typer/provider';
import { identValidator } from '../../../utils/validators';
import { hentSisteBehandlingPåFagsak } from '../../../utils/fagsak';
import { IPerson, PersonType } from '../../../typer/person';
import {
    BehandlingKategori,
    BehandlingUnderkategori,
    Behandlingstype,
} from '../../../typer/behandling';

export type IIdentFelt = IFelt<string>;

export enum actions {
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
    underkategori: BehandlingUnderkategori;
}

const initialState = (fagsak: IFagsak): IState => {
    return {
        barnasIdenter: [
            ...(hentSisteBehandlingPåFagsak(fagsak)
                ?.personer.filter((person: IPerson) => person.type === PersonType.BARN)
                .map((barn: IPerson) => ({
                    feilmelding: '',
                    valideringsFunksjon: identValidator,
                    valideringsstatus: Valideringsstatus.OK,
                    verdi: barn.personIdent,
                })) ?? [lagInitiellFelt('', identValidator)]),
        ],
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
