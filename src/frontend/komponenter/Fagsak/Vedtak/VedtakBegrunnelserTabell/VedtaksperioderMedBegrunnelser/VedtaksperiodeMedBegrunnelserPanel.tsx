import React from 'react';

import { Element, Feilmelding, Normaltekst } from 'nav-frontend-typografi';

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
    const { erPanelEkspandert, onPanelClose, genererteBrevbegrunnelser } =
        useVedtaksperiodeMedBegrunnelser();

    const visFritekster = () =>
        (vedtaksperiodeMedBegrunnelser.type !== Vedtaksperiodetype.UTBETALING &&
            vedtaksperiodeMedBegrunnelser.type !== Vedtaksperiodetype.ENDRET_UTBETALING) ||
        vedtaksperiodeMedBegrunnelser.begrunnelser.filter(
            begrunnelse => begrunnelse.vedtakBegrunnelseType === VedtakBegrunnelseType.REDUKSJON
        ).length > 0;

    return (
        <EkspanderbartBegrunnelsePanel
            vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
            åpen={erPanelEkspandert}
            onClick={() => onPanelClose(true)}
        >
            <Utbetalingsresultat
                utbetalingsperiodeDetaljer={
                    vedtaksperiodeMedBegrunnelser.utbetalingsperiodeDetaljer
                }
            />
            {vedtaksperiodeMedBegrunnelser.type !== Vedtaksperiodetype.AVSLAG &&
                vedtaksperiodeMedBegrunnelser.type !== Vedtaksperiodetype.ENDRET_UTBETALING && (
                    <BegrunnelserMultiselect
                        vedtaksperiodetype={vedtaksperiodeMedBegrunnelser.type}
                    />
                )}
            {genererteBrevbegrunnelser.status === RessursStatus.SUKSESS &&
                genererteBrevbegrunnelser.data.length > 0 && (
                    <>
                        <Element>Begrunnelse(r)</Element>
                        <ul>
                            {genererteBrevbegrunnelser.data.map(
                                (begrunnelse: string, index: number) => (
                                    <li key={`begrunnelse-${index}`}>
                                        <Normaltekst children={begrunnelse} />
                                    </li>
                                )
                            )}
                        </ul>
                    </>
                )}
            {genererteBrevbegrunnelser.status === RessursStatus.FEILET && (
                <>
                    <Feilmelding>{genererteBrevbegrunnelser.frontendFeilmelding}</Feilmelding>
                </>
            )}
            {visFritekster() && <FritekstVedtakbegrunnelser />}
        </EkspanderbartBegrunnelsePanel>
    );
};
export default VedtaksperiodeMedBegrunnelserPanel;
