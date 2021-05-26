import React from 'react';

import styled from 'styled-components';

import { Element, Normaltekst } from 'nav-frontend-typografi';

import { IRestAvslagbegrunnelser } from '../../../../typer/vedtak';
import { Vedtaksperiode } from '../../../../typer/vedtaksperiode';
import { useFritekstVedtakBegrunnelser } from './Context/FritekstVedtakBegrunnelserContext';
import { useVedtakBegrunnelser } from './Context/VedtakBegrunnelserContext';
import EkspanderbartBegrunnelsePanel from './Felles/EkspanderbartBegrunnelsePanel';
import FritekstVedtakbegrunnelser from './Felles/FritekstVedtakbegrunnelser';

interface IVedtakBegrunnelserTabell {
    vedtaksperiode: Vedtaksperiode;
}

const PanelBody = styled.div`
    margin-left: 0.625rem;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;

    ul {
        margin: 0;
        padding-left: 1.5rem;
    }
`;

const AvslagBegrunnelsePanel: React.FC<IVedtakBegrunnelserTabell> = ({ vedtaksperiode }) => {
    const { avslagBegrunnelser } = useVedtakBegrunnelser();
    const { ekspandertBegrunnelse, toggleForm } = useFritekstVedtakBegrunnelser();

    return (
        <EkspanderbartBegrunnelsePanel
            vedtaksperiode={vedtaksperiode}
            åpen={ekspandertBegrunnelse}
            onClick={() => toggleForm(true)}
        >
            <PanelBody>
                <div>
                    <Element>Begrunnelse(r) for avslag</Element>
                    <ul>
                        {avslagBegrunnelser
                            .find(
                                (avslagBegrunnelser: IRestAvslagbegrunnelser) =>
                                    avslagBegrunnelser.fom === vedtaksperiode.periodeFom &&
                                    avslagBegrunnelser.tom === vedtaksperiode.periodeTom
                            )
                            ?.brevBegrunnelser.map((begrunnelse: string) => (
                                <li>
                                    <Normaltekst children={begrunnelse} />
                                </li>
                            ))}
                    </ul>
                </div>
                <FritekstVedtakbegrunnelser vedtaksperiode={vedtaksperiode} />
            </PanelBody>
        </EkspanderbartBegrunnelsePanel>
    );
};

export default AvslagBegrunnelsePanel;
