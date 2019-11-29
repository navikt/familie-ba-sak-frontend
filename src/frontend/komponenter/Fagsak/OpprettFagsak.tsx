import { Lukknapp, Nesteknapp } from 'nav-frontend-ikonknapper';
import { Knapp } from 'nav-frontend-knapper';
import { Input, Select } from 'nav-frontend-skjema';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';

import { behandlingstyper } from '../../typer/fagsak';
import { ErrorId, sjekkeFødselsnummer } from './DataValidator';

const OpprettFagsak: React.FunctionComponent = () => {
    const [søkersFødselsnummer, settSøkersFødselsnummer] = React.useState('');
    const [barnasFødselsnummer, settBarnasFødselsnummer] = React.useState<string[]>(['']);

    const validereFødselsnummer = (): boolean => {
        // TODO: decent error message and UI
        try {
            const err = sjekkeFødselsnummer(søkersFødselsnummer);
            if (err === ErrorId.TømmeFødselsnummer) {
                throw { message: 'Fødselsnummer for applicant must be filled.' };
            } else if (err === ErrorId.UgyldigFødselsnummer) {
                throw { message: 'Invalid Fødselsnummer for applicant: ' + søkersFødselsnummer };
            }

            if (barnasFødselsnummer.length < 1) {
                throw { message: 'At least one child fødselsnummer is required.' };
            }

            barnasFødselsnummer.forEach(fn => {
                const errid = sjekkeFødselsnummer(fn);
                if (errid === ErrorId.TømmeFødselsnummer) {
                    throw { message: 'Fødselsnummer for all children must be filled.' };
                } else if (errid === ErrorId.UgyldigFødselsnummer) {
                    throw { message: 'Invalid Fødselsnummer for child: ' + fn };
                }
            });
        } catch (e) {
            alert(e.message);
            return false;
        }

        return true;
    };

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
                value={søkersFødselsnummer}
                onChange={event => {
                    settSøkersFødselsnummer(event.target.value);
                }}
            />

            <br />
            <Undertittel children={'Barn'} />
            {barnasFødselsnummer.map((barnsFødselsnummer: string, index: number) => {
                return (
                    <div key={index} className={'opprettbehandling__barn'}>
                        <Input
                            label={'Fødselsnummer'}
                            value={barnsFødselsnummer}
                            onChange={event => {
                                const oppdaterBarnasFødselsnummer: string[] = [
                                    ...barnasFødselsnummer,
                                ];
                                oppdaterBarnasFødselsnummer[index] = event.target.value;
                                settBarnasFødselsnummer(oppdaterBarnasFødselsnummer);
                            }}
                        />
                        <Lukknapp
                            onClick={() => {
                                const oppdaterBarnasFødselsnummer: string[] = barnasFødselsnummer.filter(
                                    (fødselsnummer: string, filterIndex: number) => {
                                        return filterIndex !== index;
                                    }
                                );
                                settBarnasFødselsnummer(oppdaterBarnasFødselsnummer);
                            }}
                        />
                    </div>
                );
            })}

            <Knapp
                onClick={() => {
                    const oppdaterBarnasFødselsnummer: string[] = [...barnasFødselsnummer];
                    oppdaterBarnasFødselsnummer[oppdaterBarnasFødselsnummer.length] = '';
                    settBarnasFødselsnummer(oppdaterBarnasFødselsnummer);
                }}
            >
                Legg til barn
            </Knapp>

            <br />
            <Nesteknapp
                id="knapp__neste"
                onClick={() => {
                    if (validereFødselsnummer()) {
                        // TODO: call backend and navigate
                        console.log('move on');
                    }
                }}
            />
        </div>
    );
};

export default OpprettFagsak;
