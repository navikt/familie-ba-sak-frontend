import { Panel } from 'nav-frontend-paneler';
import { Input, RadioPanelGruppe, Select } from 'nav-frontend-skjema';
import { Element, Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { IBarnBeregning } from '../../../typer/behandle';
import { IFagsak, sakstyper } from '../../../typer/fagsak';
import useFastsettReducer from './useFastsettReducer';

interface IProps {
    fagsak: IFagsak;
}

const FastsettVedtak: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const [state, dispatch] = useFastsettReducer(fagsak);

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
                {state.barnasBeregning.map((barnBeregning: IBarnBeregning, index: number) => {
                    return (
                        <div className={'fastsett__beregning--barn'} key={barnBeregning.barn}>
                            <Element children={`Barn ${index + 1}: ${barnBeregning.barn}`} />
                            <Input
                                bredde={'L'}
                                label={'Beløp'}
                                value={barnBeregning.beløp}
                                type={'number'}
                                onChange={event => {
                                    const oppdaterBarnasBeregning: IBarnBeregning[] = [
                                        ...state.barnasBeregning,
                                    ];
                                    oppdaterBarnasBeregning[index] = {
                                        ...oppdaterBarnasBeregning[index],
                                        beløp: parseInt(event.target.value, 10),
                                    };
                                    dispatch({
                                        payload: oppdaterBarnasBeregning,
                                        type: 'SETT_BARNAS_BEREGNING',
                                    });
                                }}
                            />

                            <Input
                                bredde={'L'}
                                label={'Startdato'}
                                value={barnBeregning.startDato}
                                placeholder={'DD.MM.YY'}
                                onChange={event => {
                                    const oppdaterBarnasBeregning: IBarnBeregning[] = [
                                        ...state.barnasBeregning,
                                    ];
                                    oppdaterBarnasBeregning[index] = {
                                        ...oppdaterBarnasBeregning[index],
                                        startDato: event.target.value,
                                    };
                                    dispatch({
                                        payload: oppdaterBarnasBeregning,
                                        type: 'SETT_BARNAS_BEREGNING',
                                    });
                                }}
                            />
                        </div>
                    );
                })}
                <Normaltekst
                    children={`Totalsum: ${state.barnasBeregning
                        .map(barnBeregning => barnBeregning.beløp)
                        .reduce((a, b) => a + b, 0)} kr`}
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
        </div>
    );
};

export default FastsettVedtak;
