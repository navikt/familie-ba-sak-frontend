import React from 'react';

import { useBehandling } from '../../../../context/BehandlingContext';
import { useUtbetalingBegrunnelser } from '../../../../context/UtbetalingBegrunnelseContext';
import { IBehandling } from '../../../../typer/behandling';
import { IUtbetalingsperiode } from '../../../../typer/beregning';
import { periodeToString, TIDENES_MORGEN } from '../../../../typer/periode';
import { IRestUtbetalingBegrunnelse } from '../../../../typer/vedtak';
import familieDayjs, { familieDayjsDiff } from '../../../../utils/familieDayjs';
import { datoformat, isoStringToDayjs } from '../../../../utils/formatter';
import { sisteDagInneværendeMåned } from '../../../../utils/tid';
import UtbetalingBegrunnelseMultiselect from './UtbetalingBegrunnelseMultiselect';

interface IUtbetalingBegrunnelseTabell {
    åpenBehandling: IBehandling;
}

const UtbetalingBegrunnelseTabell: React.FC<IUtbetalingBegrunnelseTabell> = ({
    åpenBehandling,
}) => {
    const { erLesevisning } = useBehandling();
    const { utbetalingBegrunnelser } = useUtbetalingBegrunnelser();

    const harAndeler = åpenBehandling.utbetalingsperioder.length > 0;
    const utbetalingsperioderMedBegrunnelseBehov = åpenBehandling.utbetalingsperioder
        .slice()
        .sort((a, b) =>
            familieDayjsDiff(
                familieDayjs(a.periodeFom, datoformat.ISO_DAG),
                familieDayjs(b.periodeFom, datoformat.ISO_DAG)
            )
        )
        .filter((utbetalingsperiode: IUtbetalingsperiode) => {
            const utbetalingBegrunnelseForPeriode = utbetalingBegrunnelser.filter(
                (utbetalingBegrunnelse: IRestUtbetalingBegrunnelse) => {
                    return (
                        utbetalingBegrunnelse.fom === utbetalingsperiode.periodeFom &&
                        utbetalingBegrunnelse.tom === utbetalingsperiode.periodeTom
                    );
                }
            );

            // Viser kun perioder som har begrunnelse dersom man er i lesemodus.
            if (erLesevisning()) {
                return utbetalingBegrunnelseForPeriode.length !== 0;
            }

            // Fjern perioder hvor fom er mer enn 2 måneder frem i tid.
            return (
                familieDayjsDiff(
                    familieDayjs(utbetalingsperiode.periodeFom),
                    familieDayjs(),
                    'month'
                ) < 2
            );
        });

    const slutterSenereEnnInneværendeMåned = (dato: string) =>
        isoStringToDayjs(dato, TIDENES_MORGEN).isAfter(sisteDagInneværendeMåned());

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
                {utbetalingsperioderMedBegrunnelseBehov.map(
                    (utbetalingsperiode: IUtbetalingsperiode) => {
                        const utbetalingBegrunnelseForPeriode = utbetalingBegrunnelser.filter(
                            (utbetalingBegrunnelse: IRestUtbetalingBegrunnelse) => {
                                return (
                                    utbetalingBegrunnelse.fom === utbetalingsperiode.periodeFom &&
                                    utbetalingBegrunnelse.tom === utbetalingsperiode.periodeTom
                                );
                            }
                        );

                        return (
                            <tr key={utbetalingsperiode.periodeFom}>
                                <td>
                                    {periodeToString({
                                        fom: utbetalingsperiode.periodeFom,
                                        tom: slutterSenereEnnInneværendeMåned(
                                            utbetalingsperiode.periodeTom
                                        )
                                            ? ''
                                            : utbetalingsperiode.periodeTom,
                                    })}
                                </td>
                                <td>{`${utbetalingsperiode.utbetaltPerMnd} kr/mnd for ${utbetalingsperiode.antallBarn} barn`}</td>
                                <td>
                                    <UtbetalingBegrunnelseMultiselect
                                        utbetalingBegrunnelseForPeriode={
                                            utbetalingBegrunnelseForPeriode
                                        }
                                        erLesevisning={erLesevisning()}
                                        personResultater={åpenBehandling.personResultater}
                                        periode={{
                                            fom: utbetalingsperiode.periodeFom,
                                            tom: utbetalingsperiode.periodeTom,
                                        }}
                                    />
                                </td>
                            </tr>
                        );
                    }
                )}
            </tbody>
        </table>
    ) : null;
};

export default UtbetalingBegrunnelseTabell;
