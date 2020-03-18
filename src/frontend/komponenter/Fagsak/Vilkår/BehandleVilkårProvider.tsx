import * as React from 'react';

import { BehandlingResultat, IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { IFelt } from '../../../typer/felt';
import { IPerson } from '../../../typer/person';
import { hentVilkårForPersoner, IVilkårResultat, Resultat } from '../../../typer/vilkår';
import { erGyldigBegrunnelse, lagInitiellFelt } from '../../../utils/validators';

export enum actions {
    SETT_RESULTAT = 'SETT_RESULTAT',
    SETT_SAMLET_VILKÅRS_RESULTAT = 'SETT_SAMLET_VILKÅRS_RESULTAT',
    TOGGLE_VILKÅR = 'TOGGLE_VILKÅR',
    SETT_BEGRUNNELSE = 'SETT_BEGRUNNELSE',
}

export interface IAction {
    payload?: any;
    type: actions;
}

type Dispatch = (action: IAction) => void;

export interface IState {
    behandlingResultat?: BehandlingResultat;
    samletVilkårResultat: IVilkårResultat[];
    begrunnelse: IFelt<string>;
}

const initialState = (personer?: IPerson[], aktivBehandling?: IBehandling): IState => {
    return {
        behandlingResultat:
            aktivBehandling?.resultat !== BehandlingResultat.IKKE_VURDERT
                ? aktivBehandling?.resultat
                : undefined,
        samletVilkårResultat: hentVilkårForPersoner(personer),
        begrunnelse: lagInitiellFelt(
            aktivBehandling?.begrunnelse ? aktivBehandling.begrunnelse : '',
            erGyldigBegrunnelse
        ),
    };
};

const BehandlingVilkårStateContext = React.createContext<IState | undefined>(undefined);
const BehandlingVilkårDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const behandlingVilkårReducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case actions.SETT_RESULTAT:
            return {
                ...state,
                behandlingResultat: action.payload,
                samletVilkårResultat: state.samletVilkårResultat.map((vilkår: IVilkårResultat) => {
                    return {
                        ...vilkår,
                        resultat:
                            action.payload === BehandlingResultat.INNVILGET
                                ? Resultat.JA
                                : Resultat.NEI,
                    };
                }),
            };
        case actions.SETT_SAMLET_VILKÅRS_RESULTAT:
            return {
                ...state,
                samletVilkårResultat: action.payload,
            };
        case actions.TOGGLE_VILKÅR:
            const nySamletVilkårResultat = state.samletVilkårResultat.map(
                (vilkår: IVilkårResultat) => {
                    const nyttResultat =
                        vilkår.resultat === Resultat.JA ? Resultat.NEI : Resultat.JA;

                    return {
                        ...vilkår,
                        resultat:
                            action.payload.key === vilkår.vilkårType
                                ? nyttResultat
                                : vilkår.resultat,
                    };
                }
            );

            return {
                ...state,
                samletVilkårResultat: nySamletVilkårResultat,
                behandlingResultat:
                    nySamletVilkårResultat.filter(
                        (vilkårResultat: IVilkårResultat) =>
                            vilkårResultat.resultat === Resultat.NEI
                    ).length !== 0
                        ? BehandlingResultat.AVSLÅTT
                        : BehandlingResultat.INNVILGET,
            };
        case actions.SETT_BEGRUNNELSE:
            return {
                ...state,
                begrunnelse: state.begrunnelse.valideringsFunksjon({
                    ...state.begrunnelse,
                    verdi: action.payload,
                }),
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

const BehandlingVilkårProvider: React.FunctionComponent<IBehandlingVilkårProvider> = ({
    fagsak,
    children,
}) => {
    const aktivBehandling = fagsak.behandlinger.find((behandling: IBehandling) => behandling.aktiv);

    const [state, dispatch] = React.useReducer(
        behandlingVilkårReducer,
        initialState(aktivBehandling?.personer, aktivBehandling)
    );

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
        throw new Error(
            'useBehandlingVilkårContext må brukes inne i en BehandlingVilkårStateContext'
        );
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
