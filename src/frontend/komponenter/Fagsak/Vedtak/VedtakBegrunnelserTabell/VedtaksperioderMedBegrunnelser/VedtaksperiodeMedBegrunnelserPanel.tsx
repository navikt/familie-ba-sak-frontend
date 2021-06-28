import React from 'react';

import { VedtakBegrunnelseType } from '../../../../../typer/vedtak';
import {
    IVedtaksperiodeMedBegrunnelser,
    Vedtaksperiodetype,
} from '../../../../../typer/vedtaksperiode';
import { useVedtaksperiodeMedBegrunnelser } from '../Context/VedtaksperiodeMedBegrunnelserContext';
import Utbetalingsresultat from '../Felles/Utbetalingsresultat';
import BegrunnelserMultiselect from './BegrunnelserMultiselect';
import EkspanderbartBegrunnelsePanel from './EkspanderbartBegrunnelsePanel';
import FritekstVedtakbegrunnelser from './FritekstVedtakbegrunnelser';

interface IProps {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
}

const VedtaksperiodeMedBegrunnelserPanel: React.FC<IProps> = ({
    vedtaksperiodeMedBegrunnelser,
}) => {
    const {
        erPanelEkspandert,
        onPanelClose,
        utbetalingsperiode,
    } = useVedtaksperiodeMedBegrunnelser();

    const visFritekster = () =>
        vedtaksperiodeMedBegrunnelser.type !== Vedtaksperiodetype.UTBETALING ||
        vedtaksperiodeMedBegrunnelser.begrunnelser.filter(
            begrunnelse => begrunnelse.vedtakBegrunnelseType === VedtakBegrunnelseType.REDUKSJON
        ).length > 0;

    return (
        <EkspanderbartBegrunnelsePanel
            vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
            åpen={erPanelEkspandert}
            onClick={() => onPanelClose(true)}
        >
            {utbetalingsperiode && (
                <Utbetalingsresultat
                    utbetalingsperiodeDetaljer={utbetalingsperiode.utbetalingsperiodeDetaljer}
                />
            )}
            <BegrunnelserMultiselect vedtaksperiodetype={vedtaksperiodeMedBegrunnelser.type} />
            {visFritekster() && <FritekstVedtakbegrunnelser />}
        </EkspanderbartBegrunnelsePanel>
    );
};

export default VedtaksperiodeMedBegrunnelserPanel;
