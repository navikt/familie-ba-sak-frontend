import React, { useState } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';
import { Element } from 'nav-frontend-typografi';

import { useBehandling } from '../../../../context/BehandlingContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelseContext';
import { IBehandling } from '../../../../typer/behandling';
import { IUtbetalingsperiode } from '../../../../typer/beregning';
import { IRestVedtakBegrunnelse } from '../../../../typer/vedtak';
import familieDayjs, { familieDayjsDiff } from '../../../../utils/familieDayjs';
import { datoformat } from '../../../../utils/formatter';
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

const HjelpetekstWrapper = styled.button`
    padding: 0.625rem;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    margin-left: 0.625rem;

    &:hover {
        background-color: ${navFarger.navLysGra};
        .hjelpetekst {
            .hjelpetekst__apneknapp {
                outline: 0;
                color: white;
                background: ${navFarger.navBla};

                .hjelpetekst__ikon {
                    fill: white;
                }
                box-shadow: 0 0 0 2px ${navFarger.navBla};
            }
        }
    }
`;

const VedtakBegrunnelser: React.FC<IVedtakBegrunnelserTabell> = ({ åpenBehandling }) => {
    const { erLesevisning } = useBehandling();
    const { vedtakBegrunnelser } = useVedtakBegrunnelser();
    const [hjelpetekstRef, settHjelpetekstRef] = useState<Hjelpetekst | null>(null);

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

    const overrideHjelpetekstOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (hjelpetekstRef) {
            hjelpetekstRef.togglePopover(e);
        }
        e.stopPropagation();
    };

    return harAndeler ? (
        <>
            <UtbetalingsperioderOverskrift>
                <Element>Begrunnelser i vedtaksbrev </Element>
                <HjelpetekstWrapper tabIndex={-1} onClick={overrideHjelpetekstOnClick}>
                    <Hjelpetekst
                        type={PopoverOrientering.Hoyre}
                        ref={element => settHjelpetekstRef(element)}
                    >
                        Her skal du sette begrunnelsestekster <br />
                        for innvilgelse, reduksjon og opphør.
                    </Hjelpetekst>
                </HjelpetekstWrapper>
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
