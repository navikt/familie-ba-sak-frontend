import '../typer/vilkår';

import * as React from 'react';

import { IOppgave } from '../typer/oppgave';
import { byggTomRessurs, Ressurs, RessursStatus } from '../typer/ressurs';

export enum actions {
    HENT_OPPGAVER = 'HENT_OPPGAVER',
    HENT_OPPGAVER_FEILET = 'HENT_OPPGAVER_FEILET',
    HENT_OPPGAVER_SUKSESS = 'HENT_OPPGAVER_SUKSESS',
}

interface IAction {
    payload?: any;
    type: actions;
}

export type Dispatch = (action: IAction) => void;

interface IState {
    oppgaver: Ressurs<IOppgave[]>;
}

const OppgaveStateContext = React.createContext<IState | undefined>(undefined);
const OppgaveDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const oppgaveReducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case actions.HENT_OPPGAVER: {
            return {
                ...state,
                oppgaver: {
                    status: RessursStatus.HENTER,
                },
            };
        }
        case actions.HENT_OPPGAVER_SUKSESS: {
            return {
                ...state,
                oppgaver: action.payload,
            };
        }
        case actions.HENT_OPPGAVER_FEILET: {
            return {
                ...state,
                oppgaver: action.payload,
            };
        }
        default: {
            throw new Error(`Uhåndtert action type: ${action.type}`);
        }
    }
};

const OppgaveProvider: React.FunctionComponent = ({ children }) => {
    const [state, dispatch] = React.useReducer(oppgaveReducer, {
        oppgaver: byggTomRessurs<IOppgave[]>(),
    });

    return (
        <OppgaveStateContext.Provider value={state}>
            <OppgaveDispatchContext.Provider value={dispatch}>
                {children}
            </OppgaveDispatchContext.Provider>
        </OppgaveStateContext.Provider>
    );
};

const useOppgaveContext = () => {
    const context = React.useContext(OppgaveStateContext);
    if (context === undefined) {
        throw new Error('useOppgaveContext må brukes inne i en OppgaveContext');
    }
    return context;
};

const useOppgaveDispatch = () => {
    const context = React.useContext(OppgaveDispatchContext);
    if (context === undefined) {
        throw new Error('useOppgaveDispatch må brukes inne i en OppgaveContext');
    }
    return context;
};

export { OppgaveProvider, useOppgaveContext, useOppgaveDispatch };
