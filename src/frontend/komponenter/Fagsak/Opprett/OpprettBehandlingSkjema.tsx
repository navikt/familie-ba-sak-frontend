import { Lukknapp } from 'nav-frontend-ikonknapper';
import { Knapp } from 'nav-frontend-knapper';
import { Input, Select, SkjemaGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Behandlingstype, behandlingstyper } from '../../../typer/fagsak';
import { IFelt, Valideringsstatus } from '../../../typer/felt';
import {
    actions,
    useOpprettBehandlingContext,
    useOpprettBehandlingDispatch,
} from './OpprettBehandlingProvider';

interface IOpprettBehandlingSkjema {
    opprettelseFeilmelding: string;
    visFeilmeldinger: boolean;
}

const OpprettBehandlingSkjema: React.FunctionComponent<IOpprettBehandlingSkjema> = ({
    opprettelseFeilmelding,
    visFeilmeldinger,
}) => {
    const context = useOpprettBehandlingContext();
    const dispatch = useOpprettBehandlingDispatch();

    return (
        <SkjemaGruppe
            className={'opprett__skjemagruppe'}
            feil={
                visFeilmeldinger && opprettelseFeilmelding !== ''
                    ? {
                          feilmelding: opprettelseFeilmelding,
                      }
                    : undefined
            }
        >
            <Select
                bredde={'l'}
                label="Velg behandlingstype"
                onChange={event =>
                    dispatch({
                        payload: event.target.value as Behandlingstype,
                        type: actions.SETT_BEHANDLINGSTYPE,
                    })
                }
                value={context.behandlingstype}
            >
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
                value={context.søkersFødselsnummer.verdi}
                onChange={event => {
                    dispatch({
                        payload: event.target.value,
                        type: actions.SETT_SØKERS_FØDSELSNUMMER,
                    });
                }}
                feil={
                    context.søkersFødselsnummer.valideringsstatus !== Valideringsstatus.OK &&
                    visFeilmeldinger
                        ? {
                              feilmelding: context.søkersFødselsnummer.feilmelding,
                          }
                        : undefined
                }
            />

            <br />
            <Undertittel children={'Barn'} />
            {context.barnasFødselsnummer.map(
                (barnsFødselsnummerFelt: IFelt<string>, index: number) => {
                    return (
                        <div key={index} className={'opprett__skjemagruppe--barn'}>
                            <Input
                                label={'Fødselsnummer'}
                                value={barnsFødselsnummerFelt.verdi}
                                onChange={event => {
                                    dispatch({
                                        payload: {
                                            fødselsnummer: event.target.value,
                                            index,
                                        },
                                        type: actions.SETT_BARNS_FØDSELSNUMMER,
                                    });
                                }}
                                feil={
                                    barnsFødselsnummerFelt.valideringsstatus !==
                                        Valideringsstatus.OK && visFeilmeldinger
                                        ? {
                                              feilmelding: barnsFødselsnummerFelt.feilmelding,
                                          }
                                        : undefined
                                }
                            />
                            <Lukknapp
                                onClick={() => {
                                    if (context.barnasFødselsnummer.length > 1) {
                                        dispatch({
                                            payload: index,
                                            type: actions.SLETT_BARN,
                                        });
                                    }
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
                        type: actions.LEGG_TIL_BARN,
                    });
                }}
            >
                Legg til barn
            </Knapp>

            <br />
        </SkjemaGruppe>
    );
};

export default OpprettBehandlingSkjema;
