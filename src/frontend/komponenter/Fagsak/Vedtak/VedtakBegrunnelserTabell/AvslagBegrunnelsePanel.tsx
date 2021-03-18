import React from 'react';

import styled from 'styled-components';

import { Element, Normaltekst } from 'nav-frontend-typografi';

import { Vedtaksperiode } from '../../../../typer/vedtaksperiode';
import EkspanderbartBegrunnelsePanel from './EkspanderbartBegrunnelsePanel';

interface IAvslagBegrunnelseTabellProps {
    vedtaksperiode: Vedtaksperiode;
    begrunnelser: string[];
}

const UtbetalingsperiodepanelBody = styled.div`
    margin-left: 0.625rem;
`;

const AvslagBegrunnelsePanel: React.FC<IAvslagBegrunnelseTabellProps> = ({
    vedtaksperiode,
    begrunnelser,
}) => {
    return (
        <EkspanderbartBegrunnelsePanel vedtaksperiode={vedtaksperiode} åpen={true}>
            <UtbetalingsperiodepanelBody>
                <Normaltekst children={'Begrunnelse(r) for avslag'} />
                <ul>
                    {begrunnelser.map((begrunnelse: string) => (
                        <li>{begrunnelse}</li>
                    ))}
                </ul>
            </UtbetalingsperiodepanelBody>
        </EkspanderbartBegrunnelsePanel>
    );
};

export default AvslagBegrunnelsePanel;
