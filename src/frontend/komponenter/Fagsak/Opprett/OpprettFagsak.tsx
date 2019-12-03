import { Lukknapp, Nesteknapp } from 'nav-frontend-ikonknapper';
import { Knapp } from 'nav-frontend-knapper';
import { Input, Select } from 'nav-frontend-skjema';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';

import { behandlingstyper } from '../../../typer/fagsak';
import { IFøldselsnummerFelt, useOpprettReducer } from './useOpprettReducer';

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
                        payload: event.target.value,
                        type: 'SETT_SØKERS_FØDSELSNUMMER',
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
                                        payload: {
                                            fødselsnummer: event.target.value,
                                            index,
                                        },
                                        type: 'SETT_BARNS_FØDSELSNUMMER',
                                    });
                                }}
                            />
                            <Lukknapp
                                onClick={() => {
                                    dispatch({
                                        payload: index,
                                        type: 'SLETT_BARNS_FØDSELSNUMMER',
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
                        payload: undefined,
                        type: 'LEGG_TIL_BARNS_FØDSELSNUMMER',
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
