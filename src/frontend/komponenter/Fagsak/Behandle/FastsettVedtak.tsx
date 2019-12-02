import { Panel } from 'nav-frontend-paneler';
import { Input, RadioPanelGruppe, Select } from 'nav-frontend-skjema';
import { Element, Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { IBarnBeregning, ordinærBeløp } from '../../../typer/behandle';
import { IFagsak, sakstyper } from '../../../typer/fagsak';

interface IProps {
    fagsak: IFagsak;
}

const FastsettVedtak: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const [sakstype, settSakstype] = React.useState(sakstyper.ORDINÆR.id);
    const [barnasBeregning, settBarnasBeregning] = React.useState<IBarnBeregning[]>(
        fagsak.behandlinger[0].barna.map(barn => ({
            barn,
            beløp: ordinærBeløp,
            startDato: '',
        }))
    );
    const [behandlingsresultat, settBehandlingsresultat] = React.useState('innvilget');

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
                value={sakstype}
                onChange={event => settSakstype(event.target.value)}
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
                {barnasBeregning.map((barnBeregning: IBarnBeregning, index: number) => {
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
                                        ...barnasBeregning,
                                    ];
                                    oppdaterBarnasBeregning[index] = {
                                        ...oppdaterBarnasBeregning[index],
                                        beløp: parseInt(event.target.value, 10),
                                    };
                                    settBarnasBeregning(oppdaterBarnasBeregning);
                                }}
                            />

                            <Input
                                bredde={'L'}
                                label={'Startdato'}
                                value={barnBeregning.startDato}
                                placeholder={'DD.MM.YY'}
                                onChange={event => {
                                    const oppdaterBarnasBeregning: IBarnBeregning[] = [
                                        ...barnasBeregning,
                                    ];
                                    oppdaterBarnasBeregning[index] = {
                                        ...oppdaterBarnasBeregning[index],
                                        startDato: event.target.value,
                                    };
                                    settBarnasBeregning(oppdaterBarnasBeregning);
                                }}
                            />
                        </div>
                    );
                })}
                <Normaltekst
                    children={`Totalsum: ${barnasBeregning
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
                checked={behandlingsresultat}
                onChange={(event: any) => {
                    settBehandlingsresultat(event.target.value);
                }}
            />
        </div>
    );
};

export default FastsettVedtak;
