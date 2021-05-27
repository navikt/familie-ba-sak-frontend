import React from 'react';

import styled from 'styled-components';

import { useBehandling } from '../../../../context/BehandlingContext';
import { IBehandling } from '../../../../typer/behandling';
import { IRestVedtakBegrunnelse, VedtakBegrunnelseType } from '../../../../typer/vedtak';
import { hentUtbetalingsperiodeDetaljer, Vedtaksperiode } from '../../../../typer/vedtaksperiode';
import { useFritekstVedtakBegrunnelser } from './Context/FritekstVedtakBegrunnelserContext';
import { useVedtakBegrunnelser } from './Context/VedtakBegrunnelserContext';
import EkspanderbartBegrunnelsePanel from './Felles/EkspanderbartBegrunnelsePanel';
import FritekstVedtakbegrunnelser from './Felles/FritekstVedtakbegrunnelser';
import Utbetalingsresultat from './Felles/Utbetalingsresultat';
import VedtakBegrunnelserMultiselect from './VedtakBegrunnelserMultiselect';

interface IVedtakBegrunnelserTabell {
    vedtaksperiode: Vedtaksperiode;
    åpenBehandling: IBehandling;
}

const VedtaksperiodepanelBody = styled.div`
    margin-left: 0.625rem;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.25rem;
`;

const VedtakBegrunnelsePanel: React.FC<IVedtakBegrunnelserTabell> = ({
    vedtaksperiode,
    åpenBehandling,
}) => {
    const { erLesevisning } = useBehandling();

    const { ekspandertBegrunnelse, toggleForm } = useFritekstVedtakBegrunnelser();
    const { vedtakBegrunnelser } = useVedtakBegrunnelser();

    const harBegrunnelserMedFritekstMulighet =
        vedtakBegrunnelser.filter((vedtakBegrunnelse: IRestVedtakBegrunnelse) => {
            return (
                (vedtakBegrunnelse.begrunnelseType === VedtakBegrunnelseType.AVSLAG ||
                    vedtakBegrunnelse.begrunnelseType === VedtakBegrunnelseType.OPPHØR ||
                    vedtakBegrunnelse.begrunnelseType === VedtakBegrunnelseType.REDUKSJON) &&
                vedtakBegrunnelse.fom === vedtaksperiode.periodeFom &&
                vedtakBegrunnelse.tom === vedtaksperiode.periodeTom
            );
        }).length > 0;

    const utbetalingsperiodeDetaljer = hentUtbetalingsperiodeDetaljer(vedtaksperiode);
    return (
        <EkspanderbartBegrunnelsePanel
            vedtaksperiode={vedtaksperiode}
            åpenBehandling={åpenBehandling}
            åpen={ekspandertBegrunnelse}
            onClick={() => toggleForm(true)}
        >
            <VedtaksperiodepanelBody>
                {utbetalingsperiodeDetaljer ? (
                    <Utbetalingsresultat utbetalingsperiodeDetaljer={utbetalingsperiodeDetaljer} />
                ) : (
                    <div />
                )}
                <div>
                    <VedtakBegrunnelserMultiselect
                        erLesevisning={erLesevisning()}
                        personResultater={åpenBehandling.personResultater}
                        vedtaksperiode={vedtaksperiode}
                    />
                </div>
                {harBegrunnelserMedFritekstMulighet && (
                    <FritekstVedtakbegrunnelser vedtaksperiode={vedtaksperiode} />
                )}
            </VedtaksperiodepanelBody>
        </EkspanderbartBegrunnelsePanel>
    );
};

export default VedtakBegrunnelsePanel;
