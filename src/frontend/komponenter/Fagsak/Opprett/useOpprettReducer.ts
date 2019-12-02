import * as React from 'react';
import { ValideringsStatus } from '../../../typer/felt';
import { fødselsnummerListeValidator, fødselsnummerValidator } from './validator';
import { IFøldselsnummerFelt, IFøldselsnummerListeFelt } from './typer';

interface IStore {
    søkersFødselsnummer: IFøldselsnummerFelt;
    barnsFødselsnummer: IFøldselsnummerListeFelt;
}

const newBarnsFødselsnummer = () => {
    return {
        feilmelding: '',
        valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
        valideringsFunksjon: fødselsnummerValidator,
        verdi: '',
    };
};

const initialState: IStore = {
    søkersFødselsnummer: {
        feilmelding: '',
        valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
        valideringsFunksjon: fødselsnummerValidator,
        verdi: '',
    },

    barnsFødselsnummer: {
        feilmelding: '',
        valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
        valideringsFunksjon: fødselsnummerListeValidator,
        verdi: [newBarnsFødselsnummer()],
    },
};

export type Action =
    | {
          type: 'SETT_SØKERS_FØDSELSNUMMER';
          payload: string;
      }
    | {
          type: 'LEGG_TIL_BARNS_FØDSELSNUMMER';
          payload: undefined;
      }
    | {
          type: 'SLETT_BARNS_FØDSELSNUMMER';
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

        case 'LEGG_TIL_BARNS_FØDSELSNUMMER':
            return {
                ...state,
                barnsFødselsnummer: state.barnsFødselsnummer.valideringsFunksjon({
                    ...state.barnsFødselsnummer,
                    verdi: [...state.barnsFødselsnummer.verdi, newBarnsFødselsnummer()],
                }),
            };
        case 'SLETT_BARNS_FØDSELSNUMMER':
            const fødselsNummerListe = state.barnsFødselsnummer.verdi;
            return {
                ...state,
                barnsFødselsnummer: state.barnsFødselsnummer.valideringsFunksjon({
                    ...state.barnsFødselsnummer,
                    verdi: [
                        ...fødselsNummerListe
                            .slice(0, action.payload)
                            .concat(
                                ...fødselsNummerListe.slice(
                                    action.payload + 1,
                                    fødselsNummerListe.length
                                )
                            ),
                    ],
                }),
            };
        case 'SETT_BARNS_FØDSELSNUMMER':
            let cloned = [...state.barnsFødselsnummer.verdi];
            cloned[action.payload.index] = {
                ...cloned[action.payload.index],
                verdi: action.payload.fødselsnummer,
            };

            return {
                ...state,
                barnsFødselsnummer: state.barnsFødselsnummer.valideringsFunksjon({
                    ...state.barnsFødselsnummer,
                    verdi: cloned,
                }),
            };

        default:
            return state;
    }
};

export const useOpprettReducer = () => {
    return React.useReducer(opprettReducer, initialState);
};
