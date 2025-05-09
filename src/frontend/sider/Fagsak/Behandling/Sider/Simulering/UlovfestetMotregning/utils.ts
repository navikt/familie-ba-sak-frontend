import type { IAvregningsperiode } from '../../../../../../typer/simulering';
import { Datoformat, isoStringTilFormatertString } from '../../../../../../utils/dato';
import { formaterBeløpUtenValutakode } from '../simuleringUtil';
import { dagerFristForAvventerSamtykkeUlovfestetMotregning } from './useTilbakekrevingsvedtakMotregning';

export const utledTekstTilModia = (avregningsperioder: IAvregningsperiode[]) => {
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
        `Du har rett til etterbetaling av barnetrygd for:\n` +
        etterbetalingsperioderFormatert.join('\n') +
        `\n\nSamtidig ser vi at du har fått feilutbetalinger for:\n` +
        feilutbetalingsperioderFormatert.join('\n') +
        `\n\nEr det greit at vi venter med etterbetaling til vi har vurdert om vi skal kreve tilbake feilutbetalt beløp? Hvis du samtykker, kan vi trekke eventuell tilbakekreving fra etterbetalingen din.\n\n` +
        `Gi samtykke ved å svare JA på denne meldingen. I svaret kan du samtidig uttale deg om feilutbetalingen. Dette må du gjøre innen ${dagerFristForAvventerSamtykkeUlovfestetMotregning} dager.`
    );
};
