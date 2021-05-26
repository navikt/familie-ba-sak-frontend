import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import { IBehandling } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import { IVedtaksperiodeMedBegrunnelser } from '../../../../../typer/vedtaksperiode';
import { VedtaksperiodeMedBegrunnelserProvider } from '../Context/VedtaksperiodeMedBegrunnelserContext';

interface IProps {
    fagsak: IFagsak;
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    åpenBehandling: IBehandling;
}

const VedtaksperiodeMedBegrunnelserPanel: React.FC<IProps> = ({
    fagsak,
    vedtaksperiodeMedBegrunnelser,
    åpenBehandling,
}) => {
    return (
        <VedtaksperiodeMedBegrunnelserProvider
            fagsak={fagsak}
            åpenBehandling={åpenBehandling}
            vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
        >
            <Normaltekst>{`Vedtaksperiode: ${vedtaksperiodeMedBegrunnelser.type}`}</Normaltekst>
            {/*<EkspanderbartBegrunnelsePanel
                vedtaksperiode={vedtaksperiode}
                åpen={ekspandertBegrunnelse}
                onClick={() => toggleForm(true)}
            >
                <UtbetalingsperiodepanelBody>
                     TODO - resultater, multiselect, fritekster
                </UtbetalingsperiodepanelBody>
            </EkspanderbartBegrunnelsePanel>*/}
        </VedtaksperiodeMedBegrunnelserProvider>
    );
};

export default VedtaksperiodeMedBegrunnelserPanel;
