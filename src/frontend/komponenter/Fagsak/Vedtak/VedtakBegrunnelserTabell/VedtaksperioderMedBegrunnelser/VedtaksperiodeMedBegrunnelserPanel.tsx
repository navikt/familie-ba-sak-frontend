import React from 'react';

import { Element, Normaltekst } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

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
        genererteBrevbegrunnelser,
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
            {genererteBrevbegrunnelser.status === RessursStatus.SUKSESS && (
                <>
                    <Element>Begrunnelse(r)</Element>
                    <ul>
                        {genererteBrevbegrunnelser.data.map((begrunnelse: string) => (
                            <li>
                                <Normaltekst children={begrunnelse} />
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {visFritekster() && <FritekstVedtakbegrunnelser />}
        </EkspanderbartBegrunnelsePanel>
    );
};
export default VedtaksperiodeMedBegrunnelserPanel;
