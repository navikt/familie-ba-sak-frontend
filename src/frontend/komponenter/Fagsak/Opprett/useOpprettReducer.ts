import * as React from 'react';
import { Behandlingstype } from '../../../typer/fagsak';
import { IFelt } from '../../../typer/felt';
import { fødselsnummerValidator } from '../../../utils/validators';
import { lagInitiellFelt } from '../Behandle/useFastsettReducer';

export type IFødselsnummerFelt = IFelt<string>;

interface IStore {
    barnasFødselsnummer: IFødselsnummerFelt[];
    behandlingstype: Behandlingstype;
    søkersFødselsnummer: IFødselsnummerFelt;
}

const initialState: IStore = {
    barnasFødselsnummer: [lagInitiellFelt('', fødselsnummerValidator)],
    behandlingstype: Behandlingstype.FØRSTEGANGSBEHANDLING,
    søkersFødselsnummer: lagInitiellFelt('', fødselsnummerValidator),
};

export type Action =
    | {
          type: 'SETT_SØKERS_FØDSELSNUMMER';
          payload: string;
      }
    | {
          type: 'SETT_BEHANDLINGSTYPE';
          payload: Behandlingstype;
      }
    | {
          type: 'LEGG_TIL_BARN';
          payload: undefined;
      }
    | {
          type: 'SLETT_BARN';
          payload: number;
      }
    | {
          type: 'SETT_BARNS_FØDSELSNUMMER';
          payload: {
              index: number;
              fødselsnummer: string;
          };
      };

const opprettReducer = (state: IStore, action: Action) => {
    switch (action.type) {
        case 'SETT_SØKERS_FØDSELSNUMMER':
            return {
                ...state,
                søkersFødselsnummer: state.søkersFødselsnummer.valideringsFunksjon({
                    ...state.søkersFødselsnummer,
                    verdi: action.payload,
                }),
            };
        case 'SETT_BEHANDLINGSTYPE':
            return {
                ...state,
                behandlingstype: action.payload,
            };
        case 'LEGG_TIL_BARN':
            return {
                ...state,
                barnasFødselsnummer: [
                    ...state.barnasFødselsnummer,
                    lagInitiellFelt('', fødselsnummerValidator),
                ],
            };
        case 'SLETT_BARN':
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
        case 'SETT_BARNS_FØDSELSNUMMER':
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

        default:
            return state;
    }
};

export const useOpprettReducer = () => {
    return React.useReducer(opprettReducer, initialState);
};
