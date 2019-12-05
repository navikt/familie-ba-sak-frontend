import { Lukknapp, Nesteknapp } from 'nav-frontend-ikonknapper';
import { Knapp } from 'nav-frontend-knapper';
import { Input, Select, SkjemaGruppe } from 'nav-frontend-skjema';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';
import { axiosRequest } from '../../../api/axios';
import { Behandlingstype, behandlingstyper, IFagsak } from '../../../typer/fagsak';
import { IFelt, Valideringsstatus } from '../../../typer/felt';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import { actions, useFagsakDispatch } from '../../FagsakProvider';
import { useOpprettReducer } from './useOpprettReducer';

const OpprettFagsak: React.FunctionComponent = () => {
    const fagsakDispatcher = useFagsakDispatch();

    const history = useHistory();
    const [state, dispatch] = useOpprettReducer();
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    return (
        <div className={'opprett'}>
            <Systemtittel children={'Opprett behandling'} />

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
                            type: 'SETT_BEHANDLINGSTYPE',
                        })
                    }
                    value={state.behandlingstype}
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
                    value={state.søkersFødselsnummer.verdi}
                    onChange={event => {
                        dispatch({
                            payload: event.target.value,
                            type: 'SETT_SØKERS_FØDSELSNUMMER',
                        });
                    }}
                    feil={
                        state.søkersFødselsnummer.valideringsstatus !== Valideringsstatus.OK &&
                        visFeilmeldinger
                            ? {
                                  feilmelding: state.søkersFødselsnummer.feilmelding,
                              }
                            : undefined
                    }
                />

                <br />
                <Undertittel children={'Barn'} />
                {state.barnasFødselsnummer.map(
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
                                            type: 'SETT_BARNS_FØDSELSNUMMER',
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
                                        if (state.barnasFødselsnummer.length > 1) {
                                            dispatch({
                                                payload: index,
                                                type: 'SLETT_BARN',
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
                            type: 'LEGG_TIL_BARN',
                        });
                    }}
                >
                    Legg til barn
                </Knapp>

                <br />
            </SkjemaGruppe>

            <Nesteknapp
                onClick={() => {
                    if (
                        process.env.NODE_ENV === 'development' ||
                        (state.søkersFødselsnummer.valideringsstatus === Valideringsstatus.OK &&
                            state.barnasFødselsnummer.find(
                                barnFødselsnummer =>
                                    barnFødselsnummer.valideringsstatus !== Valideringsstatus.OK
                            ) === undefined)
                    ) {
                        axiosRequest<IFagsak>({
                            data: {
                                barnasFødselsnummer: state.barnasFødselsnummer.map(
                                    barnFødselsnummer => barnFødselsnummer.verdi
                                ),
                                fødselsnummer: state.søkersFødselsnummer.verdi,
                                journalpostID: '1234',
                            },
                            method: 'POST',
                            url: '/familie-ba-sak/api/behandling/opprett',
                        }).then((response: Ressurs<IFagsak>) => {
                            if (response.status === RessursStatus.SUKSESS) {
                                fagsakDispatcher({
                                    payload: response,
                                    type: actions.SETT_FAGSAK,
                                });
                                history.push(`/fagsak/${response.data.id}/behandle`);
                            } else {
                                settVisFeilmeldinger(true);
                                settOpprettelseFeilmelding('Opprettelse av behandling feilet');
                            }
                        });
                        // TODO call api
                    } else {
                        settVisFeilmeldinger(true);
                    }
                }}
            />
        </div>
    );
};

export default OpprettFagsak;
