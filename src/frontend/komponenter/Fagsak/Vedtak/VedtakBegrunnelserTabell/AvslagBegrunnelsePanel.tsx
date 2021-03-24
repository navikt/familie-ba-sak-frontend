import React from 'react';

import styled from 'styled-components';

import { Element, Normaltekst } from 'nav-frontend-typografi';

import { useApp } from '../../../../context/AppContext';
import {
    FritekstVedtakBegrunnelserProvider,
    useFritekstVedtakBegrunnelser,
} from '../../../../context/FritekstVedtakBegrunnelserContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelserContext';
import { IBehandling } from '../../../../typer/behandling';
import { ToggleNavn } from '../../../../typer/toggles';
import { IRestAvslagbegrunnelser } from '../../../../typer/vedtak';
import { Vedtaksperiode, Vedtaksperiodetype } from '../../../../typer/vedtaksperiode';
import EkspanderbartBegrunnelsePanel from './Felles/EkspanderbartBegrunnelsePanel';
import FritekstVedtakbegrunnelser from './FritekstVedtakbegrunnelser';

interface IVedtakBegrunnelserTabell {
    vedtaksperiode: Vedtaksperiode;
}

const PanelBody = styled.div`
    margin-left: 0.625rem;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 40px;

    ul {
        margin: 0;
        padding-left: 1.5rem;
    }
`;

const AvslagBegrunnelsePanel: React.FC<IVedtakBegrunnelserTabell> = ({ vedtaksperiode }) => {
    const { toggles } = useApp();

    const { avslagBegrunnelser } = useVedtakBegrunnelser();
    const { ekspandertBegrunnelse, toggleForm } = useFritekstVedtakBegrunnelser();

    return (
        <EkspanderbartBegrunnelsePanel
            vedtaksperiode={vedtaksperiode}
            åpen={ekspandertBegrunnelse}
            onClick={() => toggleForm(true)}
        >
            <PanelBody>
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

                {toggles[ToggleNavn.begrunnelseFritekst] && (
                    <FritekstVedtakbegrunnelser vedtaksperiode={vedtaksperiode} />
                )}
            </PanelBody>
        </EkspanderbartBegrunnelsePanel>
    );
};

export default AvslagBegrunnelsePanel;
