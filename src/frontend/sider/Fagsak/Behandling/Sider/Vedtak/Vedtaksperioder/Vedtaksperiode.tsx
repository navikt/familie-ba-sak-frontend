import React from 'react';

import { BodyShort, ErrorMessage, Label } from '@navikt/ds-react';

import BegrunnelserMultiselect from './BegrunnelserMultiselect';
import EkspanderbarVedtaksperiode from './EkspanderbarVedtaksperiode';
import FritekstBegrunnelser from './FritekstBegrunnelser';
import Utbetalingsresultat from './Utbetalingsresultat';
import { useVedtaksperiodeContext } from './VedtaksperiodeContext';
import { useHentGenererteBrevbegrunnelser } from '../../../../../../hooks/useHentGenererteBrevbegrunnelser';
import { Standardbegrunnelse, VedtakBegrunnelseType } from '../../../../../../typer/vedtak';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../../typer/vedtaksperiode';
import { Vedtaksperiodetype } from '../../../../../../typer/vedtaksperiode';

interface IProps {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
}

const Vedtaksperiode: React.FC<IProps> = ({ vedtaksperiodeMedBegrunnelser }) => {
    const { erPanelEkspandert, onPanelClose } = useVedtaksperiodeContext();

    const { data: genererteBrevbegrunnelser, error: genererteBrevbegrunnelserError } = useHentGenererteBrevbegrunnelser(
        { vedtaksperiodeId: vedtaksperiodeMedBegrunnelser.id }
    );

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
        <EkspanderbarVedtaksperiode
            vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
            åpen={erPanelEkspandert}
            onClick={() => onPanelClose(true)}
        >
            <Utbetalingsresultat
                utbetalingsperiodeDetaljer={vedtaksperiodeMedBegrunnelser.utbetalingsperiodeDetaljer}
            />
            {vedtaksperiodeMedBegrunnelser.type !== Vedtaksperiodetype.AVSLAG && (
                <BegrunnelserMultiselect vedtaksperiodetype={vedtaksperiodeMedBegrunnelser.type} />
            )}
            {genererteBrevbegrunnelser !== undefined && genererteBrevbegrunnelser.length > 0 && (
                <>
                    <Label>Begrunnelse(r)</Label>
                    <ul>
                        {genererteBrevbegrunnelser.map((begrunnelse: string, index: number) => (
                            <li key={`begrunnelse-${index}`}>
                                <BodyShort children={begrunnelse} />
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {genererteBrevbegrunnelserError && (
                <>
                    <ErrorMessage>
                        Noe gikk galt og vi klarte ikke generere forhåndsvisning av brevbegrunnelser. Ta kontakt med
                        brukerstøtte hvis problemet vedvarer.
                    </ErrorMessage>
                </>
            )}
            {visFritekster() && <FritekstBegrunnelser />}
        </EkspanderbarVedtaksperiode>
    );
};
export default Vedtaksperiode;
