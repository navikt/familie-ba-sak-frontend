import moment from 'moment';
import { Panel } from 'nav-frontend-paneler';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { IBarnBeregning } from '../../../typer/behandle';
import { IVedtakForBehandling } from '../../../typer/fagsak';
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
                                <InputMedLabelTilVenstre
                                    bredde={'S'}
                                    label={'Beløp'}
                                    value={barnBeregning.verdi.beløp}
                                    type={'number'}
                                    onChange={event => {
                                        dispatch({
                                            payload: {
                                                index,
                                                oppdatertBarnBeregning: {
                                                    ...barnBeregning.verdi,
                                                    beløp: parseInt(event.target.value, 10),
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
                <Normaltekst
                    children={`Totalsum: ${context.barnasBeregning.reduce(
                        (sum: number, barnBeregning: IFelt<IBarnBeregning>) =>
                            sum + barnBeregning.verdi.beløp,
                        0
                    )} kr`}
                />
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

    const endringPåBeregning =
        aktivVedtak.barnasBeregning.find(barnBeregning => {
            const muligEndretBarnBeregning = barnasBeregning.find(
                endretBarnBeregning => endretBarnBeregning.verdi.barn === barnBeregning.barn
            );

            if (!muligEndretBarnBeregning) {
                return false;
            } else {
                if (
                    barnBeregning.beløp !== muligEndretBarnBeregning.verdi.beløp ||
                    (muligEndretBarnBeregning.verdi.stønadFom !== '' &&
                        moment(barnBeregning.stønadFom, 'YYYY-MM-DD', true).format(
                            datoformat.MÅNED
                        ) !== muligEndretBarnBeregning.verdi.stønadFom)
                ) {
                    return true;
                }
            }
        }) !== undefined;

    return endringPåBeregning;
};

export default BeregningSkjema;
