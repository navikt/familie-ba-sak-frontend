import type { PropsWithChildren } from 'react';

import { useVedtaksperiodeContext } from '@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksperioder/VedtaksperiodeContext';
import { hentVedtaksperiodeTittel, Vedtaksperiodetype } from '@typer/vedtaksperiode';
import { dagensDato, isoDatoPeriodeTilFormatertString, isoStringTilDateMedFallback, tidenesEnde } from '@utils/dato';
import { formaterBeløp, summer } from '@utils/formatter';
import { endOfMonth, isAfter } from 'date-fns';

import { BodyShort, Label, ExpansionCard, HGrid } from '@navikt/ds-react';

const VEDTAKSPERIODETYPE_SOM_SKAL_VISE_SUM = [
    Vedtaksperiodetype.UTBETALING,
    Vedtaksperiodetype.UTBETALING_MED_REDUKSJON_FRA_SIST_IVERKSATTE_BEHANDLING,
];

function slutterSenereEnnInneværendeMåned(tom?: string) {
    return isAfter(isoStringTilDateMedFallback({ isoString: tom, fallbackDate: tidenesEnde }), endOfMonth(dagensDato));
}

export function EkspanderbarVedtaksperiode({ children }: PropsWithChildren) {
    const { vedtaksperiodeMedBegrunnelser, erPanelEkspandert, onPanelClose } = useVedtaksperiodeContext();

    const { type, utbetalingsperiodeDetaljer, fom, tom } = vedtaksperiodeMedBegrunnelser;

    const skalVedtaksperiodetypeViseSum = VEDTAKSPERIODETYPE_SOM_SKAL_VISE_SUM.includes(type);
    const harUtbetalingsperiodeDetaljer = utbetalingsperiodeDetaljer.length > 0;
    const skalViseSum = skalVedtaksperiodetypeViseSum && harUtbetalingsperiodeDetaljer;
    const sum = summer(utbetalingsperiodeDetaljer.map(detalj => detalj.utbetaltPerMnd));
    const tittel = hentVedtaksperiodeTittel(vedtaksperiodeMedBegrunnelser);

    const periode = isoDatoPeriodeTilFormatertString({
        fom: fom,
        tom: slutterSenereEnnInneværendeMåned(tom) ? '' : tom,
    });

    return (
        <ExpansionCard
            aria-label={`Begrunnelse - Periode ${fom}_${tom}`}
            size={'small'}
            open={erPanelEkspandert}
            onToggle={() => onPanelClose(true)}
        >
            <ExpansionCard.Header>
                <ExpansionCard.Title>
                    <HGrid columns={'minmax(6rem, 12rem) minmax(6rem, 15rem) auto'} gap={'space-8'}>
                        {fom && <Label>{periode}</Label>}
                        <BodyShort>{tittel}</BodyShort>
                        {skalViseSum && <BodyShort>{formaterBeløp(sum)}</BodyShort>}
                    </HGrid>
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content style={{ overflow: 'visible' }}>{children}</ExpansionCard.Content>
        </ExpansionCard>
    );
}
