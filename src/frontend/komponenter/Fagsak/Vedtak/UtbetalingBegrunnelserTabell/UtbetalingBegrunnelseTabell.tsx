import moment from 'moment';
import { Feilmelding } from 'nav-frontend-typografi';
import React from 'react';
import { useUtbetalingBegrunnelser } from '../../../../context/UtbetalingBegrunnelseContext';
import Pluss from '../../../../ikoner/Pluss';
import { IBehandling } from '../../../../typer/behandling';
import { periodeToString } from '../../../../typer/periode';
import { IRestUtbetalingBegrunnelse } from '../../../../typer/vedtak';
import { datoformat } from '../../../../utils/formatter';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import UtbetalingBegrunnelseInput from './UtbetalingBegrunnelseInput';
import { useBehandling } from '../../../../context/BehandlingContext';

interface IUtbetalingBegrunnelseTabell {
    åpenBehandling: IBehandling;
}

const UtbetalingBegrunnelseTabell: React.FC<IUtbetalingBegrunnelseTabell> = ({
    åpenBehandling,
}) => {
    const { erLesevisning } = useBehandling();
    const harAndeler = åpenBehandling.beregningOversikt.length > 0;
    const {
        leggTilUtbetalingBegrunnelse,
        utbetalingBegrunnelser,
        utbetalingBegrunnelseFeilmelding,
    } = useUtbetalingBegrunnelser();

    return harAndeler ? (
        <table className={'tabell'}>
            <thead>
                <tr>
                    <th>Periode</th>
                    <th>Behandlingsresultat</th>
                    <th>Begrunnelse(r)</th>
                </tr>
            </thead>
            <tbody>
                {åpenBehandling.beregningOversikt
                    .slice()
                    .sort((a, b) =>
                        moment(a.periodeFom, datoformat.ISO_DAG).diff(
                            moment(b.periodeFom, datoformat.ISO_DAG),
                            'day'
                        )
                    )
                    .map(beregning => {
                        const utbetalingBegrunnelseForPeriode = utbetalingBegrunnelser.filter(
                            (utbetalingBegrunnelse: IRestUtbetalingBegrunnelse) => {
                                return (
                                    utbetalingBegrunnelse.fom === beregning.periodeFom &&
                                    utbetalingBegrunnelse.tom === beregning.periodeTom
                                );
                            }
                        );

                        return (
                            <tr key={beregning.periodeFom}>
                                <td>
                                    {periodeToString({
                                        fom: beregning.periodeFom,
                                        tom: beregning.periodeTom,
                                    })}
                                </td>
                                <td>{`${beregning.utbetaltPerMnd} kr/mnd for ${beregning.antallBarn} barn`}</td>
                                <td>
                                    {utbetalingBegrunnelseForPeriode.map(
                                        (
                                            utbetalingBegrunnelse: IRestUtbetalingBegrunnelse,
                                            index: number
                                        ) => {
                                            return utbetalingBegrunnelse.id ? (
                                                <UtbetalingBegrunnelseInput
                                                    key={index}
                                                    id={utbetalingBegrunnelse.id}
                                                    resultat={utbetalingBegrunnelse.resultat}
                                                    behandlingresultatOgVilkårBegrunnelse={
                                                        utbetalingBegrunnelse.behandlingresultatOgVilkårBegrunnelse
                                                    }
                                                />
                                            ) : (
                                                <Feilmelding key={index}>
                                                    Begrunnelsen mangler id
                                                </Feilmelding>
                                            );
                                        }
                                    )}
                                    <IkonKnapp
                                        erLesevisning={erLesevisning()}
                                        id={`legg-til-begrunnelse-${periodeToString({
                                            fom: beregning.periodeFom,
                                            tom: beregning.periodeTom,
                                        })}`}
                                        onClick={() => {
                                            leggTilUtbetalingBegrunnelse({
                                                fom: beregning.periodeFom,
                                                tom: beregning.periodeTom,
                                            });
                                        }}
                                        label={'Legg til'}
                                        ikon={<Pluss />}
                                        spinner={false}
                                    />
                                    {!utbetalingBegrunnelseFeilmelding.id && (
                                        <Feilmelding>
                                            {utbetalingBegrunnelseFeilmelding.feilmelding}
                                        </Feilmelding>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    ) : null;
};

export default UtbetalingBegrunnelseTabell;
