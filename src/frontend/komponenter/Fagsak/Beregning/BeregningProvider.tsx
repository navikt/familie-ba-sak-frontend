import * as React from 'react';

import { IBehandling } from '../../../typer/behandling';
import { IPersonBeregning, ordinærBeløp, YtelseType } from '../../../typer/beregning';
import { IFagsak } from '../../../typer/fagsak';
import { IFelt } from '../../../typer/felt';
import { erGyldigMånedDato, lagInitiellFelt } from '../../../utils/validators';

export enum actions {
    SETT_PERSON_BEREGNINGER = 'SETT_PERSON_BEREGNINGER',
    SETT_SAKSTYPE = 'SETT_SAKSTYPE',
    SETT_BEHANDLINGSRESULTAT = 'SETT_BEHANDLINGSRESULTAT',
    SETT_SENDER_INN = 'SETT_SENDER_INN',
}

export interface IAction {
    // eslint-disable-next-line
    payload?: any;
    type: actions;
}

type Dispatch = (action: IAction) => void;

export interface IState {
    personBeregninger: IFelt<IPersonBeregning>[];
}

export const lastInitialState = (fagsak: IFagsak): IState => {
    const aktivBehandling = fagsak.behandlinger.find((behandling: IBehandling) => behandling.aktiv);

    let nyPersonBeregninger: IFelt<IPersonBeregning>[] = [];
    if (aktivBehandling) {
        nyPersonBeregninger = aktivBehandling.personer.map(person => {
            return lagInitiellFelt<IPersonBeregning>(
                {
                    personident: person.personIdent,
                    ytelseType: YtelseType.ORDINÆR_BARNETRYGD,
                    beløp: ordinærBeløp,
                    deltYtelse: false,
                    ingenYtelse: false,
                    stønadFom: '',
                    stønadTom: '',
                },
                erGyldigMånedDato
            );
        });
    }

    return {
        personBeregninger: nyPersonBeregninger,
    };
};

const BeregningStateContext = React.createContext<IState | undefined>(undefined);
const BeregningDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const beregningReducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case actions.SETT_PERSON_BEREGNINGER: {
            const personBeregningerKopi = [...state.personBeregninger];
            personBeregningerKopi[action.payload.index] = personBeregningerKopi[
                action.payload.index
            ].valideringsFunksjon({
                ...personBeregningerKopi[action.payload.index],
                verdi: action.payload.oppdatertPersonBeregning,
            });

            return {
                ...state,
                personBeregninger: personBeregningerKopi,
            };
        }
        default:
            return state;
    }
};

interface IBeregningProvider {
    fagsak: IFagsak;
}

const BeregningProvider: React.FunctionComponent<IBeregningProvider> = ({ children, fagsak }) => {
    const [state, dispatch] = React.useReducer(beregningReducer, lastInitialState(fagsak));

    return (
        <BeregningStateContext.Provider value={state}>
            <BeregningDispatchContext.Provider value={dispatch}>
                {children}
            </BeregningDispatchContext.Provider>
        </BeregningStateContext.Provider>
    );
};

// eslint-disable-next-line
const useBeregningContext = () => {
    const context = React.useContext(BeregningStateContext);
    if (context === undefined) {
        throw new Error('useBeregningContext må brukes inne i en BeregningContext');
    }
    return context;
};

// eslint-disable-next-line
const useBeregningDispatch = () => {
    const context = React.useContext(BeregningDispatchContext);
    if (context === undefined) {
        throw new Error('useBeregningDispatch må brukes inne i en BeregningContext');
    }
    return context;
};

export { BeregningProvider, useBeregningContext, useBeregningDispatch };
