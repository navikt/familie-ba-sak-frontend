import { AxiosError } from 'axios';
import * as React from 'react';
import { hentFagsak } from '../api/fagsak';
import { IFagsak } from '../typer/fagsak';
import { byggFeiletRessurs, byggTomRessurs, Ressurs, RessursStatus } from '../typer/ressurs';
import './../typer/vilkår';

export enum actions {
    HENT_FAGSAK = 'HENT_FAGSAK',
    HENT_FAGSAK_FEILET = 'HENT_FAGSAK_FEILET',
    HENT_FAGSAK_SUKSESS = 'HENT_FAGSAK_SUKSESS',
    SETT_FAGSAK_ID = 'SETT_FAGSAK_ID',
    SETT_FAGSAK = 'SETT_FAGSAK',
}

interface IAction {
    payload?: any;
    type: actions;
}

export type Dispatch = (action: IAction) => void;

interface IState {
    fagsakId?: string;
    fagsak: Ressurs<IFagsak>;
}

const FagsakStateContext = React.createContext<IState | undefined>(undefined);
const FagsakDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const fagsakReducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case actions.HENT_FAGSAK: {
            return {
                ...state,
                fagsak: {
                    status: RessursStatus.HENTER,
                },
            };
        }
        case actions.HENT_FAGSAK_SUKSESS: {
            return {
                ...state,
                fagsak: action.payload,
            };
        }
        case actions.HENT_FAGSAK_FEILET: {
            return {
                ...state,
                fagsak: action.payload,
            };
        }
        case actions.SETT_FAGSAK_ID: {
            return {
                ...state,
                fagsakId: action.payload,
            };
        }
        case actions.SETT_FAGSAK: {
            return {
                ...state,
                fagsak: action.payload,
            };
        }
        default: {
            throw new Error(`Uhåndtert action type: ${action.type}`);
        }
    }
};

const FagsakProvider: React.StatelessComponent = ({ children }) => {
    const [state, dispatch] = React.useReducer(fagsakReducer, {
        fagsak: byggTomRessurs<IFagsak>(),
        fagsakId: undefined,
    });

    React.useEffect(() => {
        if (state.fagsakId) {
            dispatch({ type: actions.HENT_FAGSAK });
            hentFagsak(state.fagsakId)
                .then((fagsak: Ressurs<IFagsak>) => {
                    dispatch({
                        payload: fagsak,
                        type: actions.HENT_FAGSAK_SUKSESS,
                    });
                })
                .catch((error: AxiosError) => {
                    dispatch({
                        payload: byggFeiletRessurs('Ukent feil ved innhenting av fagsak', error),
                        type: actions.HENT_FAGSAK_FEILET,
                    });
                });
        }
    }, [state.fagsakId]);

    return (
        <FagsakStateContext.Provider value={state}>
            <FagsakDispatchContext.Provider value={dispatch}>
                {children}
            </FagsakDispatchContext.Provider>
        </FagsakStateContext.Provider>
    );
};

const useFagsakContext = () => {
    const context = React.useContext(FagsakStateContext);
    if (context === undefined) {
        throw new Error('useFagsakContext må brukes inne i en FagsakContext');
    }
    return context;
};

const useFagsakDispatch = () => {
    const context = React.useContext(FagsakDispatchContext);
    if (context === undefined) {
        throw new Error('useFagsakDispatch må brukes inne i en FagsakContext');
    }
    return context;
};

export { FagsakProvider, useFagsakContext, useFagsakDispatch };
