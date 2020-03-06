import moment from 'moment';
import { Panel } from 'nav-frontend-paneler';
import { Checkbox, Select, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { IBarnBeregning, YtelseType, ytelsetype } from '../../../typer/behandle';
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
                {context.barnasBeregning.map(
                    (barnBeregning: IFelt<IBarnBeregning>, index: number) => {
                        return (
                            <SkjemaGruppe
                                className={'beregning__skjemagruppe--barn'}
                                key={barnBeregning.verdi.barn}
                                feil={
                                    barnBeregning.valideringsstatus !== Valideringsstatus.OK &&
                                    visFeilmeldinger &&
                                    barnBeregning.feilmelding !== ''
                                        ? barnBeregning.feilmelding
                                        : undefined
                                }
                            >
                                <Element
                                    children={`Barn ${index + 1}: ${barnBeregning.verdi.barn}`}
                                />
                                <Select
                                    bredde={'l'}
                                    label="Velg type"
                                    value={barnBeregning.verdi.ytelseType}
                                    onChange={event => {
                                        dispatch({
                                            payload: {
                                                index,
                                                oppdatertBarnBeregning: {
                                                    ...barnBeregning.verdi,
                                                    ytelseType: event.target.value as YtelseType,
                                                },
                                            },
                                            type: actions.SETT_BARNAS_BEREGNING,
                                        });
                                    }}
                                >
                                    {Object.keys(ytelsetype).map((key: string) => {
                                        return (
                                            <option
                                                aria-selected={
                                                    barnBeregning.verdi.ytelseType === key
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
                                                oppdatertBarnBeregning: {
                                                    ...barnBeregning.verdi,
                                                    deltYtelse: Boolean(event.target.value),
                                                },
                                            },
                                            type: actions.SETT_BARNAS_BEREGNING,
                                        });
                                    }}
                                />
                                <InputMedLabelTilVenstre
                                    bredde={'S'}
                                    label={'Virkningstidspunkt'}
                                    value={barnBeregning.verdi.stønadFom}
                                    placeholder={'MM.YY'}
                                    autoFocus={true}
                                    onChange={event => {
                                        dispatch({
                                            payload: {
                                                index,
                                                oppdatertBarnBeregning: {
                                                    ...barnBeregning.verdi,
                                                    stønadFom: event.target.value,
                                                },
                                            },
                                            type: actions.SETT_BARNAS_BEREGNING,
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
    const barnasBeregning = context.barnasBeregning;

    if (aktivVedtak.barnasBeregning.length === 0) {
        return true;
    }
    return (
        aktivVedtak.barnasBeregning.find((barnBeregning: IBarnBeregning) => {
            const muligEndretBarnBeregning = barnasBeregning.find(
                endretBarnBeregning => endretBarnBeregning.verdi.barn === barnBeregning.barn
            );

            if (!muligEndretBarnBeregning) {
                return false;
            } else {
                if (
                    barnBeregning.ytelseType !== muligEndretBarnBeregning.verdi.ytelseType ||
                    (muligEndretBarnBeregning.verdi.stønadFom !== '' &&
                        moment(barnBeregning.stønadFom, 'YYYY-MM-DD', true).format(
                            datoformat.MÅNED
                        ) !== muligEndretBarnBeregning.verdi.stønadFom) ||
                    barnBeregning.deltYtelse !== muligEndretBarnBeregning.verdi.deltYtelse
                ) {
                    return true;
                }
            }
        }) !== undefined
    );
};

export default BeregningSkjema;
