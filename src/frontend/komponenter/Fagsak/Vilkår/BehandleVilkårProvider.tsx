import * as React from 'react';
import { IFagsak, VedtakResultat, IBehandling, IVedtakForBehandling } from '../../../typer/fagsak';
import { IVilkårResultat, hentVilkårForPersoner, UtfallType } from '../../../typer/vilkår';
import { IPerson } from '../../../typer/person';
import { IFelt } from '../../../typer/felt';
import { erGyldigBegrunnelse } from '../../../utils/validators';
import { lagInitiellFelt } from '../../../typer/provider';

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
    vedtakResultat?: VedtakResultat;
    samletVilkårResultat: IVilkårResultat[];
    begrunnelse: IFelt<string>;
}

const initialState = (personer?: IPerson[], aktivVedtak?: IVedtakForBehandling): IState => {
    return {
        vedtakResultat: undefined,
        samletVilkårResultat: hentVilkårForPersoner(personer),
        begrunnelse: lagInitiellFelt(
            aktivVedtak?.begrunnelse ? aktivVedtak.begrunnelse : '',
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
                vedtakResultat: action.payload,
                samletVilkårResultat: state.samletVilkårResultat.map((vilkår: IVilkårResultat) => {
                    return {
                        ...vilkår,
                        utfallType:
                            action.payload === VedtakResultat.INNVILGET
                                ? UtfallType.OPPFYLT
                                : UtfallType.IKKE_OPPFYLT,
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
                    const nyUtfallType =
                        vilkår.utfallType === UtfallType.OPPFYLT
                            ? UtfallType.IKKE_OPPFYLT
                            : UtfallType.OPPFYLT;

                    return {
                        ...vilkår,
                        utfallType:
                            action.payload.key === vilkår.vilkårType
                                ? nyUtfallType
                                : vilkår.utfallType,
                    };
                }
            );

            return {
                ...state,
                samletVilkårResultat: nySamletVilkårResultat,
                vedtakResultat:
                    nySamletVilkårResultat.filter(
                        (vilkårResultat: IVilkårResultat) =>
                            vilkårResultat.utfallType === UtfallType.IKKE_OPPFYLT
                    ).length !== 0
                        ? VedtakResultat.AVSLÅTT
                        : VedtakResultat.INNVILGET,
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

const BehandlingVilkårProvider: React.StatelessComponent<IBehandlingVilkårProvider> = ({
    fagsak,
    children,
}) => {
    const aktivBehandling = fagsak.behandlinger.find((behandling: IBehandling) => behandling.aktiv);
    const aktivVedtak = aktivBehandling?.vedtakForBehandling?.find(
        (vedtak: IVedtakForBehandling) => vedtak.aktiv
    );

    const [state, dispatch] = React.useReducer(
        behandlingVilkårReducer,
        initialState(aktivBehandling?.personer, aktivVedtak)
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
