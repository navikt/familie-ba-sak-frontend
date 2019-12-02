import { Lukknapp, Nesteknapp } from 'nav-frontend-ikonknapper';
import { Knapp } from 'nav-frontend-knapper';
import { Input, Select } from 'nav-frontend-skjema';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';

import { behandlingstyper } from '../../../typer/fagsak';
import { useOpprettReducer } from './useOpprettReducer';
import { IFøldselsnummerFelt } from './typer';

const OpprettFagsak: React.FunctionComponent = () => {
    const [state, dispatch] = useOpprettReducer();

    return (
        <div className={'opprettbehandling'}>
            <Systemtittel children={'Opprett behandling'} />

            <br />
            <Select bredde={'l'} label="Velg behandlingstype">
                {Object.keys(behandlingstyper).map((key: string) => {
                    return (
                        <option key={key} value={key}>
                            {behandlingstyper[key].navn}
                        </option>
                    );
                })}
            </Select>

            <br />
            <Undertittel children={'Søker'} />
            <Input
                bredde={'L'}
                label={'Fødselsnummer'}
                value={state.søkersFødselsnummer.verdi}
                onChange={event => {
                    dispatch({
                        type: 'SETT_SØKERS_FØDSELSNUMMER',
                        payload: event.target.value,
                    });
                }}
            />

            <br />
            <Undertittel children={'Barn'} />
            {state.barnsFødselsnummer.verdi.map(
                (barnsFødselsnummerFelt: IFøldselsnummerFelt, index: number) => {
                    return (
                        <div key={index} className={'opprettbehandling__barn'}>
                            <Input
                                label={'Fødselsnummer'}
                                value={barnsFødselsnummerFelt.verdi}
                                onChange={event => {
                                    dispatch({
                                        type: 'SETT_BARNS_FØDSELSNUMMER',
                                        payload: {
                                            index: index,
                                            fødselsnummer: event.target.value,
                                        },
                                    });
                                }}
                            />
                            <Lukknapp
                                onClick={() => {
                                    dispatch({
                                        type: 'SLETT_BARNS_FØDSELSNUMMER',
                                        payload: index,
                                    });
                                }}
                            />
                        </div>
                    );
                }
            )}

            <Knapp
                onClick={() => {
                    dispatch({
                        type: 'LEGG_TIL_BARNS_FØDSELSNUMMER',
                        payload: undefined,
                    });
                }}
            >
                Legg til barn
            </Knapp>

            <br />
            <Nesteknapp
                id="knapp__neste"
                onClick={() => {
                    console.log(state);
                    console.log('move on');
                }}
            />
        </div>
    );
};

export default OpprettFagsak;
