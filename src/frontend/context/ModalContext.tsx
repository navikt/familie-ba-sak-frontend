import React, { createContext, type PropsWithChildren, useContext, useReducer } from 'react';

interface ModalContext {
    hentTittel: <T extends keyof Args>(type: T) => string;
    settTittel: <T extends keyof Args>(type: T, tittel: string) => void;
    åpneModal: <T extends keyof Args>(type: T, args: Args[T]) => void;
    lukkModal: (type: ModalType) => void;
    erModalÅpen: (type: ModalType) => boolean;
    hentArgs: <T extends keyof Args>(type: T) => Args[T] | undefined;
    hentBredde: <T extends keyof Args>(type: T) => `${number}${string}`;
    settBredde: <T extends keyof Args>(type: T, bredde: `${number}${string}`) => void;
}

export enum ModalType {
    OPPRETT_FAGSAK = 'OPPRETT_FAGSAK',
    EXAMPLE_MODAL = 'EXAMPLE_MODAL',
}

export interface Args {
    [ModalType.OPPRETT_FAGSAK]: { ident: string };
    [ModalType.EXAMPLE_MODAL]: { fagsak: string };
}

interface BaseState {
    tittel: string;
    åpen: boolean;
    bredde: `${number}${string}`;
}

interface State {
    [ModalType.OPPRETT_FAGSAK]: BaseState & {
        args: Args[ModalType.OPPRETT_FAGSAK] | undefined;
    };
    [ModalType.EXAMPLE_MODAL]: BaseState & {
        args: Args[ModalType.EXAMPLE_MODAL] | undefined;
    };
}

const initialState: { [key in ModalType]: State[key] } = {
    [ModalType.OPPRETT_FAGSAK]: {
        tittel: 'Opprett fagsak',
        åpen: false,
        bredde: '50rem',
        args: undefined,
    },
    [ModalType.EXAMPLE_MODAL]: {
        tittel: 'Example modal',
        åpen: false,
        bredde: '80rem',
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

interface ÅpneModalAction<T extends keyof Args> {
    type: ActionType.ÅPNE_MODAL;
    payload: { type: ModalType; args: Args[T] };
}

interface LukkModalAction {
    type: ActionType.LUKK_MODAL;
    payload: { type: ModalType };
}

interface SettBreddeAction {
    type: ActionType.SETT_BREDDE;
    payload: { type: ModalType; bredde: `${number}${string}` };
}

type Action<T extends keyof Args> =
    | ÅpneModalAction<T>
    | LukkModalAction
    | SettBreddeAction
    | SettTittelAction;

function reducer<T extends keyof Args>(state: State, action: Action<T>) {
    const { type, payload } = action;
    switch (type) {
        case ActionType.ÅPNE_MODAL:
            return {
                ...state,
                [payload.type]: {
                    ...state[payload.type],
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

    function hentTittel<T extends keyof Args>(type: T) {
        return state[type].tittel;
    }

    function settTittel<T extends keyof Args>(type: T, tittel: string) {
        dispatch({ type: ActionType.SETT_TITTEL, payload: { type, tittel } });
    }

    function åpneModal<T extends keyof Args>(type: ModalType, args: Args[T]) {
        dispatch({ type: ActionType.ÅPNE_MODAL, payload: { type, args } });
    }

    function lukkModal(type: ModalType) {
        dispatch({ type: ActionType.LUKK_MODAL, payload: { type } });
    }

    function erModalÅpen(type: ModalType): boolean {
        return state[type].åpen;
    }

    function hentArgs<T extends keyof Args>(type: T) {
        return state[type].args as Args[T];
    }

    function hentBredde<T extends keyof Args>(type: T) {
        return state[type].bredde;
    }

    function settBredde<T extends keyof Args>(type: T, bredde: `${number}${string}`) {
        dispatch({ type: ActionType.SETT_BREDDE, payload: { type, bredde } });
    }

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
