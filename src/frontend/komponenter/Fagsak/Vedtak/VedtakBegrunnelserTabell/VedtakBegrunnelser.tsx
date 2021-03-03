import React from 'react';

import styled from 'styled-components';

import { PopoverOrientering } from 'nav-frontend-popover';
import { Element } from 'nav-frontend-typografi';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/BehandlingContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelseContext';
import { IBehandling } from '../../../../typer/behandling';
import { ToggleNavn } from '../../../../typer/toggles';
import { IRestVedtakBegrunnelse } from '../../../../typer/vedtak';
import { Vedtaksperiode, Vedtaksperiodetype } from '../../../../typer/vedtaksperiode';
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
    const { toggles } = useApp();
    const { erLesevisning } = useBehandling();
    const { vedtakBegrunnelser } = useVedtakBegrunnelser();

    const harVedtaksperioder = åpenBehandling.vedtaksperioder.length > 0;
    const vedtaksperioderMedBegrunnelseBehov = åpenBehandling.vedtaksperioder
        .slice()
        .sort((a, b) =>
            familieDayjsDiff(
                familieDayjs(a.periodeFom, datoformat.ISO_DAG),
                familieDayjs(b.periodeFom, datoformat.ISO_DAG)
            )
        )
        .filter((vedtaksperiode: Vedtaksperiode) => {
            const vedtakBegrunnelserForPeriode = vedtakBegrunnelser.filter(
                (vedtakBegrunnelse: IRestVedtakBegrunnelse) => {
                    return (
                        vedtakBegrunnelse.fom === vedtaksperiode.periodeFom &&
                        vedtakBegrunnelse.tom === vedtaksperiode.periodeTom
                    );
                }
            );

            // Viser kun perioder som har begrunnelse dersom man er i lesemodus.
            if (erLesevisning()) {
                return vedtakBegrunnelserForPeriode.length !== 0;
            }

            // Fjern perioder hvor fom er mer enn 2 måneder frem i tid.
            return (
                familieDayjsDiff(familieDayjs(vedtaksperiode.periodeFom), familieDayjs(), 'month') <
                2
            );
        });

    return harVedtaksperioder ? (
        <>
            <UtbetalingsperioderOverskrift>
                <Element>Begrunnelser i vedtaksbrev </Element>
                <StyledHjelpetekst44px
                    type={PopoverOrientering.Hoyre}
                    innhold="Her skal du sette begrunnelsestekster for innvilgelse, reduksjon og opphør."
                />
            </UtbetalingsperioderOverskrift>
            {vedtaksperioderMedBegrunnelseBehov
                .filter((vedtaksperiode: Vedtaksperiode) => {
                    if (toggles[ToggleNavn.visOpphørsperioder])
                        return (
                            vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING ||
                            vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.OPPHØR
                        );
                    else {
                        return vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING;
                    }
                })
                .map((vedtaksperiode: Vedtaksperiode) => (
                    <VedtakBegrunnelsePanel
                        behandlingsType={åpenBehandling.type}
                        personResultater={åpenBehandling.personResultater}
                        vedtaksperiode={vedtaksperiode}
                    />
                ))}
        </>
    ) : null;
};

export default VedtakBegrunnelser;
