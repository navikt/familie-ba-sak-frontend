import React from 'react';

import styled from 'styled-components';

import { useBehandling } from '../../../../context/BehandlingContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelseContext';
import { IBehandling } from '../../../../typer/behandling';
import { IUtbetalingsperiode } from '../../../../typer/beregning';
import { periodeToString, TIDENES_MORGEN } from '../../../../typer/periode';
import { IRestVedtakBegrunnelse } from '../../../../typer/vedtak';
import familieDayjs, { familieDayjsDiff } from '../../../../utils/familieDayjs';
import { datoformat, isoStringToDayjs } from '../../../../utils/formatter';
import { sisteDagInneværendeMåned } from '../../../../utils/tid';
import VedtakBegrunnelserMultiselect from './VedtakBegrunnelserMultiselect';

interface IVedtakBegrunnelserTabell {
    åpenBehandling: IBehandling;
}

const StyledTable = styled.table`
    margin-bottom: 1rem;

    td {
        vertical-align: top;
    }
`;

const VedtakBegrunnelserTabell: React.FC<IVedtakBegrunnelserTabell> = ({ åpenBehandling }) => {
    const { erLesevisning } = useBehandling();
    const { vedtakBegrunnelser } = useVedtakBegrunnelser();

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
            const vedtakBegrunnelserForPeriode = vedtakBegrunnelser.filter(
                (vedtakBegrunnelse: IRestVedtakBegrunnelse) => {
                    return (
                        vedtakBegrunnelse.fom === utbetalingsperiode.periodeFom &&
                        vedtakBegrunnelse.tom === utbetalingsperiode.periodeTom
                    );
                }
            );

            // Viser kun perioder som har begrunnelse dersom man er i lesemodus.
            if (erLesevisning()) {
                return vedtakBegrunnelserForPeriode.length !== 0;
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
        <StyledTable className={'tabell'}>
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
                                    <VedtakBegrunnelserMultiselect
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
        </StyledTable>
    ) : null;
};

export default VedtakBegrunnelserTabell;
