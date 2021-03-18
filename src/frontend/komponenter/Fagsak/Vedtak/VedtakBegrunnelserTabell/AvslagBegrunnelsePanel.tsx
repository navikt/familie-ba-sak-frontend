import React from 'react';

import styled from 'styled-components';

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { periodeToString } from '../../../../typer/periode';
import Hjelpetekst44px from './Hjelpetekst44px';
import { Vedtaksperiode } from '../../../../typer/vedtaksperiode';

interface IAvslagBegrunnelseTabellProps {
    vedtaksperiode: Vedtaksperiode;
    begrunnelser: string[];
}

const StyledEkspanderbartpanel = styled(Ekspanderbartpanel)`
    margin-bottom: 1.5rem;
    max-width: 49rem;

    .ekspanderbartPanel__hode {
        padding-top: 0;
        padding-bottom: 0;
    }
    .ekspanderbartPanel__innhold {
        padding: 1rem;
    }
`;

const UtbetalingsperiodepanelTittel = styled.p`
    display: flex;
    align-items: center;
    text-align: center;

    .typo-normal {
        margin-left: 1.5rem;
    }
`;

const UtbetalingsperiodepanelBody = styled.div`
    margin-left: 0.625rem;
`;

const VedtakBegrunnelsePanel: React.FC<IAvslagBegrunnelseTabellProps> = ({
    vedtaksperiode,
    begrunnelser,
}) => {
    return (
        <StyledEkspanderbartpanel
            key={`avslag_${vedtaksperiode.periodeFom}_${vedtaksperiode.periodeTom}`}
            apen={true} // TODO
            tittel={
                <UtbetalingsperiodepanelTittel>
                    {/* TODO legge inn tekst for hjelpeteksten og legg til hjepleteksten */}
                    {/* eslint-disable-next-line no-constant-condition */}
                    {true ? (
                        <div style={{ marginLeft: '0.625rem' }} />
                    ) : (
                        <Hjelpetekst44px innhold={'Midlertidig tekst'} />
                    )}
                    <Element>
                        {periodeToString({
                            fom: vedtaksperiode.periodeFom,
                            tom: vedtaksperiode.periodeTom,
                        })}
                    </Element>
                    <Normaltekst>Avslag</Normaltekst>
                </UtbetalingsperiodepanelTittel>
            }
        >
            <UtbetalingsperiodepanelBody>
                <Normaltekst children={'Begrunnelse(r) for avslag'} />
                <ul>
                    {begrunnelser.map((begrunnelse: string) => (
                        <li>{begrunnelse}</li>
                    ))}
                </ul>
            </UtbetalingsperiodepanelBody>
        </StyledEkspanderbartpanel>
    );
};

export default VedtakBegrunnelsePanel;
