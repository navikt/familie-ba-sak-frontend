import React from 'react';

import styled from 'styled-components';

import { PopoverOrientering } from 'nav-frontend-popover';
import { Element } from 'nav-frontend-typografi';

import { useBehandling } from '../../../../context/BehandlingContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelseContext';
import { IBehandling } from '../../../../typer/behandling';
import { IUtbetalingsperiode } from '../../../../typer/beregning';
import { IRestVedtakBegrunnelse } from '../../../../typer/vedtak';
import familieDayjs, { familieDayjsDiff } from '../../../../utils/familieDayjs';
import { datoformat } from '../../../../utils/formatter';
import Hjelpetekst44px from './Hjelpetekst44px';
import VedtakBegrunnelsePanel from './VedtaksBegrunnelsePanel';

interface IVedtakBegrunnelserTabell {
    åpenBehandling: IBehandling;
}

const UtbetalingsperioderOverskrift = styled.div`
    margin: 2.75rem 0;
    display: flex;
    align-items: center;
    text-align: center;
`;

const StyledHjelpetekst44px = styled(Hjelpetekst44px)`
    .popover {
        max-width: 18rem;
        text-align: left;
    }
`;

const VedtakBegrunnelser: React.FC<IVedtakBegrunnelserTabell> = ({ åpenBehandling }) => {
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

    return harAndeler ? (
        <>
            <UtbetalingsperioderOverskrift>
                <Element>Begrunnelser i vedtaksbrev </Element>
                <StyledHjelpetekst44px
                    type={PopoverOrientering.Hoyre}
                    innhold="Her skal du sette begrunnelsestekster for innvilgelse, reduksjon og opphør."
                />
            </UtbetalingsperioderOverskrift>
            {utbetalingsperioderMedBegrunnelseBehov.map(
                (utbetalingsperiode: IUtbetalingsperiode) => (
                    <VedtakBegrunnelsePanel
                        behandlingsType={åpenBehandling.type}
                        personResultater={åpenBehandling.personResultater}
                        utbetalingsperiode={utbetalingsperiode}
                    />
                )
            )}
        </>
    ) : null;
};

export default VedtakBegrunnelser;
