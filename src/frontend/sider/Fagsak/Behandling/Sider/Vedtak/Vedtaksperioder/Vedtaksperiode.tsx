import { GenererteBrevbegrunnelser } from '@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksperioder/GenererteBrevbegrunnelser';
import { Standardbegrunnelse, VedtakBegrunnelseType } from '@typer/vedtak';
import { Vedtaksperiodetype } from '@typer/vedtaksperiode';

import { VStack } from '@navikt/ds-react';

import { BegrunnelserMultiselect } from './BegrunnelserMultiselect';
import { EkspanderbarVedtaksperiode } from './EkspanderbarVedtaksperiode';
import { FritekstBegrunnelser } from './FritekstBegrunnelser';
import { Utbetalingsresultat } from './Utbetalingsresultat';
import { useVedtaksperiodeContext } from './VedtaksperiodeContext';

export function Vedtaksperiode() {
    const { vedtaksperiodeMedBegrunnelser } = useVedtaksperiodeContext();

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
        <EkspanderbarVedtaksperiode>
            <VStack gap={'space-20'}>
                {vedtaksperiodeMedBegrunnelser.utbetalingsperiodeDetaljer.length !== 0 && <Utbetalingsresultat />}
                {vedtaksperiodeMedBegrunnelser.type !== Vedtaksperiodetype.AVSLAG && <BegrunnelserMultiselect />}
                <GenererteBrevbegrunnelser />
                {visFritekster() && (
                    <div>
                        <FritekstBegrunnelser />
                    </div>
                )}
            </VStack>
        </EkspanderbarVedtaksperiode>
    );
}
