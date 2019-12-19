import * as moment from 'moment';
import { Panel } from 'nav-frontend-paneler';
import { Input, RadioPanelGruppe, Select, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { IBarnBeregning } from '../../../typer/behandle';
import { IVedtakForBehandling, sakstyper } from '../../../typer/fagsak';
import { IFelt, Valideringsstatus } from '../../../typer/felt';
import {
    actions,
    IState,
    useFastsettVedtakContext,
    useFastsettVedtakDispatch,
} from './FastsettVedtakProvider';

interface IFastsettVedtakSkjema {
    aktivVedtak?: IVedtakForBehandling;
    opprettelseFeilmelding: string;
    settSkjemaetHarEndringer: (skjemaetHarEndringer: boolean) => void;
    visFeilmeldinger: boolean;
}

const FastsettVedtakSkjema: React.FunctionComponent<IFastsettVedtakSkjema> = ({
    aktivVedtak,
    opprettelseFeilmelding,
    settSkjemaetHarEndringer,
    visFeilmeldinger,
}) => {
    const context = useFastsettVedtakContext();
    const dispatch = useFastsettVedtakDispatch();

    React.useEffect(() => {
        settSkjemaetHarEndringer(harSkjemaEndringer(context, aktivVedtak));
    }, [context]);

    return (
        <SkjemaGruppe
            className={'fastsett__skjemagruppe'}
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
                label={'Velg sakstype'}
                value={context.sakstype}
                onChange={event =>
                    dispatch({ type: actions.SETT_SAKSTYPE, payload: event.target.value })
                }
            >
                {Object.keys(sakstyper).map(mapSakstype => {
                    return (
                        <option key={sakstyper[mapSakstype].id} value={sakstyper[mapSakstype].id}>
                            {sakstyper[mapSakstype].navn}
                        </option>
                    );
                })}
            </Select>

            <Undertittel children={'Beregning'} />

            <Panel className={'fastsett__skjemagruppe--beregning'}>
                {context.barnasBeregning.map(
                    (barnBeregning: IFelt<IBarnBeregning>, index: number) => {
                        return (
                            <SkjemaGruppe
                                className={'fastsett__skjemagruppe--beregning-barn'}
                                key={barnBeregning.verdi.barn}
                                feil={
                                    barnBeregning.valideringsstatus !== Valideringsstatus.OK &&
                                    visFeilmeldinger
                                        ? {
                                              feilmelding: barnBeregning.feilmelding,
                                          }
                                        : undefined
                                }
                            >
                                <Element
                                    children={`Barn ${index + 1}: ${barnBeregning.verdi.barn}`}
                                />
                                <Input
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

                                <Input
                                    bredde={'S'}
                                    label={'Startdato'}
                                    value={barnBeregning.verdi.stønadFom}
                                    placeholder={'DD.MM.YY'}
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

            <Undertittel children={'Hjemler'} />
            <Normaltekst children={'Vedtaket er fattet etter § 2 og § 11 i barnetrygdloven.'} />

            <Undertittel children={'Resultat'} />

            <RadioPanelGruppe
                className={'fastsett__skjemagruppe--behandlingsresultat'}
                name="behandlingsresultat"
                legend="Behandlingsresultat"
                radios={[
                    { label: 'Innvilget', value: 'innvilget', id: 'innvilget' },
                    { label: 'Avslått', value: 'avslått', id: 'avslått' },
                ]}
                checked={context.behandlingsresultat}
                onChange={(event: any) => {
                    dispatch({
                        payload: event.target.value,
                        type: actions.SETT_BEHANDLINGSRESULTAT,
                    });
                }}
            />
        </SkjemaGruppe>
    );
};

const harSkjemaEndringer = (context: IState, aktivVedtak?: IVedtakForBehandling) => {
    if (!aktivVedtak) {
        return true;
    }
    const barnasBeregning = context.barnasBeregning;

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
                        moment(barnBeregning.stønadFom, 'YYYY-MM-DD', true).format('DD.MM.YY') !==
                            muligEndretBarnBeregning.verdi.stønadFom)
                ) {
                    return true;
                }
            }
        }) !== undefined;

    return endringPåBeregning;
};

export default FastsettVedtakSkjema;
