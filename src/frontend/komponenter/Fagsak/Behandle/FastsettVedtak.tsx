import { Nesteknapp } from 'nav-frontend-ikonknapper';
import { Panel } from 'nav-frontend-paneler';
import { Input, RadioPanelGruppe, Select, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { IBarnBeregning } from '../../../typer/behandle';
import { IFagsak, sakstyper } from '../../../typer/fagsak';
import { IFelt, Valideringsstatus } from '../../../typer/felt';
import useFastsettReducer from './useFastsettReducer';

interface IProps {
    fagsak: IFagsak;
}

const FastsettVedtak: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const [state, dispatch] = useFastsettReducer(fagsak);
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);

    return (
        <div className={'fastsett'}>
            <Systemtittel children={'Behandle sak'} />

            <br />
            <Normaltekst children={`Søker: ${fagsak.behandlinger[0].søker}`} />
            {fagsak.behandlinger[0].barna.map(barn => {
                return <Normaltekst key={barn} children={`Barn: ${barn}`} />;
            })}

            <br />
            <Select
                bredde={'l'}
                label={'Velg sakstype'}
                value={state.sakstype}
                onChange={event => dispatch({ type: 'SETT_SAKSTYPE', payload: event.target.value })}
            >
                {Object.keys(sakstyper).map(mapSakstype => {
                    return (
                        <option key={sakstyper[mapSakstype].id} value={sakstyper[mapSakstype].id}>
                            {sakstyper[mapSakstype].navn}
                        </option>
                    );
                })}
            </Select>

            <Undertittel children={'Bergegning'} />

            <Panel className={'fastsett__beregning'}>
                {state.barnasBeregning.map(
                    (barnBeregning: IFelt<IBarnBeregning>, index: number) => {
                        return (
                            <SkjemaGruppe
                                className={'fastsett__beregning--barn'}
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
                                    bredde={'L'}
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
                                            type: 'SETT_BARNAS_BEREGNING',
                                        });
                                    }}
                                />

                                <Input
                                    bredde={'L'}
                                    label={'Startdato'}
                                    value={barnBeregning.verdi.startDato}
                                    placeholder={'DD.MM.YY'}
                                    onChange={event => {
                                        dispatch({
                                            payload: {
                                                index,
                                                oppdatertBarnBeregning: {
                                                    ...barnBeregning.verdi,
                                                    startDato: event.target.value,
                                                },
                                            },
                                            type: 'SETT_BARNAS_BEREGNING',
                                        });
                                    }}
                                />
                            </SkjemaGruppe>
                        );
                    }
                )}
                <Normaltekst
                    children={`Totalsum: ${state.barnasBeregning.reduce(
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
                name="behandlingsresultat"
                legend="Behandlingsresultat"
                radios={[
                    { label: 'Innvilget', value: 'innvilget', id: 'innvilget' },
                    { label: 'Avslått', value: 'avslått', id: 'avslått' },
                ]}
                checked={state.behandlingsresultat}
                onChange={(event: any) => {
                    dispatch({ type: 'SETT_BEHANDLINGSRESULTAT', payload: event.target.value });
                }}
            />
            <Nesteknapp
                onClick={() => {
                    if (
                        state.barnasBeregning.find(
                            barnBeregning =>
                                barnBeregning.valideringsstatus !== Valideringsstatus.OK
                        ) === undefined
                    ) {
                        // TODO call api
                    } else {
                        settVisFeilmeldinger(true);
                    }
                }}
            />
        </div>
    );
};

export default FastsettVedtak;
