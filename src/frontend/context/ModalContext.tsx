import React, {
    createContext,
    type PropsWithChildren,
    useCallback,
    useContext,
    useReducer,
} from 'react';

import type { HenleggÅrsak } from '../typer/behandling';

interface ModalContext {
    hentTittel: (type: ModalType) => string;
    settTittel: (type: ModalType, tittel: string) => void;
    åpneModal: <T extends keyof typeof ModalType>(
        type: T,
        args: T extends keyof Args ? Args[T] : void
    ) => void;
    lukkModal: (type: ModalType) => void;
    erModalÅpen: (type: ModalType) => boolean;
    hentArgs: <T extends keyof typeof ModalType>(
        type: T
    ) => T extends keyof Args ? Args[T] : undefined;
    hentBredde: (type: ModalType) => `${number}${string}`;
    settBredde: (type: ModalType, bredde: `${number}${string}`) => void;
}

export enum ModalType {
    HENLEGG_BEHANDLING_VEIVALG = 'HENLEGG_BEHANDLING_VEIVALG',
    HENLEGG_BEHANDLING = 'HENLEGG_BEHANDLING',
    OPPRETT_FAGSAK = 'OPPRETT_FAGSAK',
    FEILMELDING = 'FEILMELDING',
    FORHÅNDSVIS_PDF = 'FORHÅNDSVIS_PDF',
}

export interface Args {
    [ModalType.HENLEGG_BEHANDLING_VEIVALG]: { årsak: HenleggÅrsak };
    [ModalType.OPPRETT_FAGSAK]: { ident: string };
    [ModalType.FEILMELDING]: { feilmelding: string | React.ReactNode };
    [ModalType.FORHÅNDSVIS_PDF]: { blob: Blob };
}

interface BaseState {
    tittel: string;
    åpen: boolean;
    bredde: `${number}${string}`;
}

type State = {
    [key in ModalType]: key extends keyof Args
        ? BaseState & { args: Args[key] | undefined }
        : BaseState;
};

const initialState: State = {
    [ModalType.HENLEGG_BEHANDLING_VEIVALG]: {
        tittel: 'Behandling henlagt',
        åpen: false,
        bredde: '35rem',
        args: undefined,
    },
    [ModalType.HENLEGG_BEHANDLING]: {
        tittel: 'Henlegg behandling',
        åpen: false,
        bredde: '37rem',
    },
    [ModalType.OPPRETT_FAGSAK]: {
        tittel: 'Opprett fagsak',
        åpen: false,
        bredde: '50rem',
        args: undefined,
    },
    [ModalType.FEILMELDING]: {
        tittel: 'Det har oppstått en feil',
        åpen: false,
        bredde: '50rem',
        args: undefined,
    },
    [ModalType.FORHÅNDSVIS_PDF]: {
        tittel: 'Forhåndsvisning av PDF',
        åpen: false,
        bredde: '100rem',
        args: undefined,
    },
};

enum ActionType {
    SETT_TITTEL = 'SETT_TITTEL',
    ÅPNE_MODAL = 'ÅPNE_MODAL',
    LUKK_MODAL = 'LUKK_MODAL',
    SETT_BREDDE = 'SETT_BREDDE',
}

interface SettTittelAction {
    type: ActionType.SETT_TITTEL;
    payload: { type: ModalType; tittel: string };
}

interface ÅpneModalAction<T extends keyof typeof ModalType> {
    type: ActionType.ÅPNE_MODAL;
    payload: { type: T; args: T extends keyof Args ? Args[T] : void };
}

interface LukkModalAction {
    type: ActionType.LUKK_MODAL;
    payload: { type: ModalType };
}

interface SettBreddeAction {
    type: ActionType.SETT_BREDDE;
    payload: { type: ModalType; bredde: `${number}${string}` };
}

type Action<T extends keyof typeof ModalType> =
    | ÅpneModalAction<T>
    | LukkModalAction
    | SettBreddeAction
    | SettTittelAction;

function reducer<T extends keyof typeof ModalType>(state: State, action: Action<T>) {
    const { type, payload } = action;
    switch (type) {
        case ActionType.ÅPNE_MODAL:
            return {
                ...state,
                [payload.type]: {
                    ...state[ModalType[payload.type]],
                    åpen: true,
                    args: payload.args,
                },
            };
        case ActionType.LUKK_MODAL:
            return {
                ...state,
                [payload.type]: {
                    ...state[payload.type],
                    åpen: false,
                    args: undefined,
                    bredde: initialState[payload.type].bredde,
                    tittel: initialState[payload.type].tittel,
                },
            };
        case ActionType.SETT_BREDDE:
            return {
                ...state,
                [payload.type]: {
                    ...state[payload.type],
                    bredde: payload.bredde,
                },
            };
        case ActionType.SETT_TITTEL:
            return {
                ...state,
                [payload.type]: {
                    ...state[payload.type],
                    tittel: payload.tittel,
                },
            };
        default:
            return state;
    }
}

const ModalContext = createContext<ModalContext | undefined>(undefined);

export function ModalProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const hentTittel = useCallback(
        (type: ModalType) => {
            return state[type].tittel;
        },
        [state]
    );

    const settTittel = useCallback(
        (type: ModalType, tittel: string) => {
            dispatch({ type: ActionType.SETT_TITTEL, payload: { type, tittel } });
        },
        [dispatch]
    );

    const åpneModal = useCallback(
        <T extends keyof typeof ModalType>(
            type: T,
            args: T extends keyof Args ? Args[T] : void
        ) => {
            dispatch({ type: ActionType.ÅPNE_MODAL, payload: { type, args } });
        },
        [dispatch]
    );

    const lukkModal = useCallback(
        (type: ModalType) => {
            dispatch({ type: ActionType.LUKK_MODAL, payload: { type } });
        },
        [dispatch]
    );

    const erModalÅpen = useCallback(
        (type: ModalType) => {
            return state[type].åpen;
        },
        [state]
    );

    const hentArgs = useCallback(
        <T extends keyof typeof ModalType>(type: T) => {
            const stateFromType = state[ModalType[type]];
            const value = 'args' in stateFromType ? stateFromType.args : undefined;
            return value as T extends keyof Args ? Args[T] : undefined;
        },
        [state]
    );

    const hentBredde = useCallback(
        (type: ModalType) => {
            return state[type].bredde;
        },
        [state]
    );

    const settBredde = useCallback(
        (type: ModalType, bredde: `${number}${string}`) => {
            dispatch({ type: ActionType.SETT_BREDDE, payload: { type, bredde } });
        },
        [dispatch]
    );

    return (
        <ModalContext.Provider
            value={{
                hentTittel,
                settTittel,
                åpneModal,
                lukkModal,
                erModalÅpen,
                hentArgs,
                hentBredde,
                settBredde,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

export function useModalContext() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModalContext må brukes innenfor en ModalProvider');
    }
    return context;
}
