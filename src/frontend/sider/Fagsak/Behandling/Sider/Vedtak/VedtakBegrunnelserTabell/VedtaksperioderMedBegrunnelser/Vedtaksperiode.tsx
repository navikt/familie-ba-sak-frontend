import React from 'react';

import { BodyShort, ErrorMessage, Label } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

import BegrunnelserMultiselect from './BegrunnelserMultiselect';
import EkspanderbartVedtaksbegrunnelsePanel from './EkspanderbartVedtaksbegrunnelsePanel';
import FritekstVedtakbegrunnelser from './FritekstVedtakbegrunnelser';
import { Standardbegrunnelse, VedtakBegrunnelseType } from '../../../../../../../typer/vedtak';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../../../typer/vedtaksperiode';
import { Vedtaksperiodetype } from '../../../../../../../typer/vedtaksperiode';
import { useVedtaksperiodeContext } from '../Context/VedtaksperiodeMedBegrunnelserContext';
import Utbetalingsresultat from '../Felles/Utbetalingsresultat';

interface IProps {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
}

const Vedtaksperiode: React.FC<IProps> = ({ vedtaksperiodeMedBegrunnelser }) => {
    const { erPanelEkspandert, onPanelClose, genererteBrevbegrunnelser } =
        useVedtaksperiodeContext();

    const ugyldigeReduksjonsteksterForÅTriggeFritekst = [
        Standardbegrunnelse.REDUKSJON_SATSENDRING,
        Standardbegrunnelse.REDUKSJON_UNDER_6_ÅR,
        Standardbegrunnelse.REDUKSJON_UNDER_18_ÅR,
    ];

    const vedtaksperiodeInneholderEtterbetaling3ÅrBegrunnelse = () =>
        vedtaksperiodeMedBegrunnelser.begrunnelser.filter(
            begrunnelse =>
                (begrunnelse.standardbegrunnelse as Standardbegrunnelse) ===
                Standardbegrunnelse.ETTER_ENDRET_UTBETALING_ETTERBETALING
        ).length > 0;

    const vedtaksperiodeInneholderBegrunnelseSomStøtterFritekst = () => {
        return vedtaksperiodeMedBegrunnelser.begrunnelser.some(
            vedtaksbegrunnelse => vedtaksbegrunnelse.støtterFritekst
        );
    };

    const visFritekster = () =>
        (vedtaksperiodeMedBegrunnelser.type !== Vedtaksperiodetype.UTBETALING &&
            vedtaksperiodeMedBegrunnelser.type !== Vedtaksperiodetype.ENDRET_UTBETALING) ||
        vedtaksperiodeInneholderEtterbetaling3ÅrBegrunnelse() ||
        vedtaksperiodeInneholderBegrunnelseSomStøtterFritekst() ||
        vedtaksperiodeMedBegrunnelser.begrunnelser.filter(
            begrunnelse =>
                !ugyldigeReduksjonsteksterForÅTriggeFritekst.includes(
                    begrunnelse.standardbegrunnelse as Standardbegrunnelse
                ) && begrunnelse.vedtakBegrunnelseType === VedtakBegrunnelseType.REDUKSJON
        ).length > 0;

    return (
        <EkspanderbartVedtaksbegrunnelsePanel
            vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
            åpen={erPanelEkspandert}
            onClick={() => onPanelClose(true)}
        >
            <Utbetalingsresultat
                utbetalingsperiodeDetaljer={
                    vedtaksperiodeMedBegrunnelser.utbetalingsperiodeDetaljer
                }
            />
            {vedtaksperiodeMedBegrunnelser.type !== Vedtaksperiodetype.AVSLAG && (
                <BegrunnelserMultiselect vedtaksperiodetype={vedtaksperiodeMedBegrunnelser.type} />
            )}
            {genererteBrevbegrunnelser.status === RessursStatus.SUKSESS &&
                genererteBrevbegrunnelser.data.length > 0 && (
                    <>
                        <Label>Begrunnelse(r)</Label>
                        <ul>
                            {genererteBrevbegrunnelser.data.map(
                                (begrunnelse: string, index: number) => (
                                    <li key={`begrunnelse-${index}`}>
                                        <BodyShort children={begrunnelse} />
                                    </li>
                                )
                            )}
                        </ul>
                    </>
                )}
            {genererteBrevbegrunnelser.status === RessursStatus.FEILET && (
                <>
                    <ErrorMessage>{genererteBrevbegrunnelser.frontendFeilmelding}</ErrorMessage>
                </>
            )}
            {visFritekster() && <FritekstVedtakbegrunnelser />}
        </EkspanderbartVedtaksbegrunnelsePanel>
    );
};
export default Vedtaksperiode;
