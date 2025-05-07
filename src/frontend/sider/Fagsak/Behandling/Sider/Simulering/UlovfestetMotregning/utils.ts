import type { IAvregningsperiode } from '../../../../../../typer/simulering';
import { Datoformat, isoStringTilFormatertString } from '../../../../../../utils/dato';
import { formaterBeløpUtenValutakode } from '../simuleringUtil';
import { dagerFristForAvventerSamtykkeUlovfestetMotregning } from './useTilbakekrevingsvedtakMotregning';

export const utledTekstTilModia = (avregningsperioder: IAvregningsperiode[]) => {
    if (avregningsperioder.length === 1) {
        const avregningsperiode = avregningsperioder[0];

        const fom = isoStringTilFormatertString({
            isoString: avregningsperiode.fom,
            tilFormat: Datoformat.MÅNED_ÅR_NAVN,
        });

        const tom = isoStringTilFormatertString({
            isoString: avregningsperiode.tom,
            tilFormat: Datoformat.MÅNED_ÅR_NAVN,
        });

        const erFomOgTomLike = fom === tom;
        const periode = erFomOgTomLike ? fom : `perioden fra ${fom} til ${tom}`;

        const etterbetaling = formaterBeløpUtenValutakode(avregningsperiode.totalEtterbetaling);
        const feilutbetaling = formaterBeløpUtenValutakode(avregningsperiode.totalFeilutbetaling);

        return (
            `Du har rett til etterbetaling av barnetrygd for ${periode} på ${etterbetaling} kroner.\n\n` +
            `Samtidig ser vi at du har fått en feilutbetaling på ${feilutbetaling} kroner i ${periode}.\n\n` +
            `Er det greit at vi venter med etterbetaling til vi har vurdert om vi skal kreve tilbake feilutbetalt beløp? Hvis du samtykker, kan vi trekke eventuell tilbakekreving fra etterbetalingen din.\n\n` +
            `Gi samtykke ved å svare JA på denne meldingen. I svaret kan du samtidig uttale deg om feilutbetalingen. Dette må du gjøre innen ${dagerFristForAvventerSamtykkeUlovfestetMotregning} dager.`
        );
    } else {
        const formaterPerioder = (felt: 'totalEtterbetaling' | 'totalFeilutbetaling') =>
            avregningsperioder.map(avregningsperiode => {
                const fom = isoStringTilFormatertString({
                    isoString: avregningsperiode.fom,
                    tilFormat: Datoformat.MÅNED_ÅR_NAVN,
                });

                const tom = isoStringTilFormatertString({
                    isoString: avregningsperiode.tom,
                    tilFormat: Datoformat.MÅNED_ÅR_NAVN,
                });

                const erFomOgTomLike = fom === tom;
                const periode = erFomOgTomLike ? fom : `${fom} til ${tom}`;
                const beløp = formaterBeløpUtenValutakode(avregningsperiode[felt]);

                const kulepunkt = `\u2022`;
                return `${kulepunkt} ${periode} på ${beløp} kroner`;
            });

        const etterbetalingsperioderFormatert = formaterPerioder('totalEtterbetaling');
        const feilutbetalingsperioderFormatert = formaterPerioder('totalFeilutbetaling');

        return (
            `Du har rett til etterbetaling av barnetrygd for periodene:\n` +
            etterbetalingsperioderFormatert.join('\n') +
            `\n\nSamtidig ser vi at du har fått feilutbetalinger i periodene:\n` +
            feilutbetalingsperioderFormatert.join('\n') +
            `\n\nEr det greit at vi venter med etterbetaling til vi har vurdert om vi skal kreve tilbake feilutbetalt beløp? Hvis du samtykker, kan vi trekke eventuell tilbakekreving fra etterbetalingen din.\n\n` +
            `Gi samtykke ved å svare JA på denne meldingen. I svaret kan du samtidig uttale deg om feilutbetalingen. Dette må du gjøre innen ${dagerFristForAvventerSamtykkeUlovfestetMotregning} dager.`
        );
    }
};
