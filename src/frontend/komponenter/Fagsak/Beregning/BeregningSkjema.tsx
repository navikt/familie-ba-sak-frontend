import moment from 'moment';
import { Panel } from 'nav-frontend-paneler';
import { Checkbox, Select, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { IPersonBeregning, YtelseType, ytelsetype } from '../../../typer/behandle';
import { IVedtakForBehandling } from '../../../typer/vedtak';
import { IFelt, Valideringsstatus } from '../../../typer/felt';
import { actions, IState, useBeregningContext, useBeregningDispatch } from './BeregningProvider';
import { datoformat } from '../../../utils/formatter';
import InputMedLabelTilVenstre from '../../Felleskomponenter/InputMedLabelTilVenstre/InputMedLabelTilVenstre';

interface IBeregningSkjema {
    aktivVedtak?: IVedtakForBehandling;
    opprettelseFeilmelding: string;
    settSkjemaetHarEndringer: (skjemaetHarEndringer: boolean) => void;
    visFeilmeldinger: boolean;
}

const BeregningSkjema: React.FunctionComponent<IBeregningSkjema> = ({
    aktivVedtak,
    opprettelseFeilmelding,
    settSkjemaetHarEndringer,
    visFeilmeldinger,
}) => {
    const context = useBeregningContext();
    const dispatch = useBeregningDispatch();

    React.useEffect(() => {
        settSkjemaetHarEndringer(harSkjemaEndringer(context, aktivVedtak));
    }, [context]);

    return (
        <SkjemaGruppe
            className={'beregning__skjemagruppe'}
            feil={
                visFeilmeldinger && opprettelseFeilmelding !== ''
                    ? opprettelseFeilmelding
                    : undefined
            }
        >
            <Panel className={'beregning__skjemagruppe'}>
                {context.personBeregninger.map(
                    (personBeregning: IFelt<IPersonBeregning>, index: number) => {
                        return (
                            <SkjemaGruppe
                                className={'beregning__skjemagruppe--barn'}
                                key={personBeregning.verdi.personident}
                                feil={
                                    personBeregning.valideringsstatus !== Valideringsstatus.OK &&
                                    visFeilmeldinger &&
                                    personBeregning.feilmelding !== ''
                                        ? personBeregning.feilmelding
                                        : undefined
                                }
                            >
                                <Element
                                    children={`Person ${index + 1}: ${
                                        personBeregning.verdi.personident
                                    }`}
                                />
                                <Select
                                    bredde={'l'}
                                    label="Velg type"
                                    value={personBeregning.verdi.ytelseType}
                                    onChange={event => {
                                        dispatch({
                                            payload: {
                                                index,
                                                oppdatertPersonBeregning: {
                                                    ...personBeregning.verdi,
                                                    ytelseType: event.target.value as YtelseType,
                                                },
                                            },
                                            type: actions.SETT_PERSON_BEREGNINGER,
                                        });
                                    }}
                                >
                                    {Object.keys(ytelsetype).map((key: string) => {
                                        return (
                                            <option
                                                aria-selected={
                                                    personBeregning.verdi.ytelseType === key
                                                }
                                                key={key}
                                                value={key}
                                            >
                                                {ytelsetype[key].navn}
                                            </option>
                                        );
                                    })}
                                </Select>
                                <Checkbox
                                    label={'Skal ha delt ytelse'}
                                    onChange={event => {
                                        dispatch({
                                            payload: {
                                                index,
                                                oppdatertPersonBeregning: {
                                                    ...personBeregning.verdi,
                                                    deltYtelse: Boolean(event.target.value),
                                                },
                                            },
                                            type: actions.SETT_PERSON_BEREGNINGER,
                                        });
                                    }}
                                />
                                <InputMedLabelTilVenstre
                                    bredde={'S'}
                                    label={'Beløp'}
                                    value={personBeregning.verdi.beløp}
                                    type={'number'}
                                    onChange={event => {
                                        dispatch({
                                            payload: {
                                                index,
                                                oppdatertPersonBeregning: {
                                                    ...personBeregning.verdi,
                                                    beløp: parseInt(event.target.value, 10),
                                                },
                                            },
                                            type: actions.SETT_PERSON_BEREGNINGER,
                                        });
                                    }}
                                />
                                <InputMedLabelTilVenstre
                                    bredde={'S'}
                                    label={'Virkningstidspunkt - Fra og med'}
                                    value={personBeregning.verdi.stønadFom}
                                    placeholder={'MM.YY'}
                                    autoFocus={true}
                                    onChange={event => {
                                        dispatch({
                                            payload: {
                                                index,
                                                oppdatertPersonBeregning: {
                                                    ...personBeregning.verdi,
                                                    stønadFom: event.target.value,
                                                },
                                            },
                                            type: actions.SETT_PERSON_BEREGNINGER,
                                        });
                                    }}
                                />
                                <InputMedLabelTilVenstre
                                    bredde={'S'}
                                    label={'Virkningstidspunkt - Til og med'}
                                    value={personBeregning.verdi.stønadTom}
                                    placeholder={'MM.YY'}
                                    autoFocus={true}
                                    onChange={event => {
                                        dispatch({
                                            payload: {
                                                index,
                                                oppdatertPersonBeregning: {
                                                    ...personBeregning.verdi,
                                                    stønadTom: event.target.value,
                                                },
                                            },
                                            type: actions.SETT_PERSON_BEREGNINGER,
                                        });
                                    }}
                                />
                            </SkjemaGruppe>
                        );
                    }
                )}
            </Panel>
        </SkjemaGruppe>
    );
};

const harSkjemaEndringer = (context: IState, aktivVedtak?: IVedtakForBehandling) => {
    if (!aktivVedtak) {
        return true;
    }
    const personBeregninger = context.personBeregninger;

    if (aktivVedtak.personBeregninger.length === 0) {
        return true;
    }
    return (
        aktivVedtak.personBeregninger.find((personBeregning: IPersonBeregning) => {
            const muligEndretPersonBeregning = personBeregninger.find(
                endretPersonBeregning =>
                    endretPersonBeregning.verdi.personident === personBeregning.personident
            );

            if (!muligEndretPersonBeregning) {
                return false;
            } else {
                if (
                    personBeregning.ytelseType !== muligEndretPersonBeregning.verdi.ytelseType ||
                    (muligEndretPersonBeregning.verdi.stønadFom !== '' &&
                        moment(personBeregning.stønadFom, 'YYYY-MM-DD', true).format(
                            datoformat.MÅNED
                        ) !== muligEndretPersonBeregning.verdi.stønadFom) ||
                    (muligEndretPersonBeregning.verdi.stønadTom !== '' &&
                        moment(personBeregning.stønadTom, 'YYYY-MM-DD', true).format(
                            datoformat.MÅNED
                        ) !== muligEndretPersonBeregning.verdi.stønadTom) ||
                    personBeregning.deltYtelse !== muligEndretPersonBeregning.verdi.deltYtelse ||
                    personBeregning.beløp !== muligEndretPersonBeregning.verdi.beløp
                ) {
                    return true;
                }
            }
        }) !== undefined
    );
};

export default BeregningSkjema;
