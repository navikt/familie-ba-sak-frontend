/**
 * @jest-environment jsdom
 */

import { setDefaultOptions } from 'date-fns';
import { nb } from 'date-fns/locale';

import { utledTekstTilModia } from './utils';

describe('utledTekstTilModia', () => {
    setDefaultOptions({ locale: nb });

    /* eslint-disable no-irregular-whitespace */
    test('formatering av én avregningsperiode på én måned', () => {
        const avregningsperioder = [
            {
                fom: '2025-01-01',
                tom: '2025-01-31',
                totalEtterbetaling: 1766,
                totalFeilutbetaling: 1766,
            },
        ];

        const tekst = utledTekstTilModia(avregningsperioder);

        expect(tekst).toEqual(
            `Du har rett til etterbetaling av barnetrygd for:\n` +
                `• januar 2025 på 1 766 kroner\n\n` +
                `Samtidig ser vi at du har fått feilutbetalinger for:\n` +
                `• januar 2025 på 1 766 kroner\n\n` +
                `Er det greit at vi venter med etterbetaling til vi har vurdert om vi skal kreve ` +
                `tilbake feilutbetalt beløp? Hvis du samtykker, kan vi trekke eventuell ` +
                `tilbakekreving fra etterbetalingen din.\n\n` +
                `Gi samtykke ved å svare JA på denne meldingen. I svaret kan du samtidig uttale ` +
                `deg om feilutbetalingen. Dette må du gjøre innen 14 dager.`
        );
    });

    test('formatering av én avregningsperiode på flere måneder', () => {
        const avregningsperioder = [
            {
                fom: '2025-01-01',
                tom: '2025-02-28',
                totalEtterbetaling: 1766,
                totalFeilutbetaling: 1766,
            },
        ];

        const tekst = utledTekstTilModia(avregningsperioder);

        expect(tekst).toEqual(
            `Du har rett til etterbetaling av barnetrygd for:\n` +
                `• januar 2025 til februar 2025 på 1 766 kroner\n\n` +
                `Samtidig ser vi at du har fått feilutbetalinger for:\n` +
                `• januar 2025 til februar 2025 på 1 766 kroner\n\n` +
                `Er det greit at vi venter med etterbetaling til vi har vurdert om vi skal kreve ` +
                `tilbake feilutbetalt beløp? Hvis du samtykker, kan vi trekke eventuell ` +
                `tilbakekreving fra etterbetalingen din.\n\n` +
                `Gi samtykke ved å svare JA på denne meldingen. I svaret kan du samtidig uttale ` +
                `deg om feilutbetalingen. Dette må du gjøre innen 14 dager.`
        );
    });

    test('formatering av én avregningsperiode på flere måneder', () => {
        const avregningsperioder = [
            {
                fom: '2025-01-01',
                tom: '2025-02-28',
                totalEtterbetaling: 1766,
                totalFeilutbetaling: 1766,
            },
            {
                fom: '2025-04-01',
                tom: '2025-04-30',
                totalEtterbetaling: 1766,
                totalFeilutbetaling: 1766,
            },
        ];

        const tekst = utledTekstTilModia(avregningsperioder);

        expect(tekst).toEqual(
            `Du har rett til etterbetaling av barnetrygd for:\n` +
                `• januar 2025 til februar 2025 på 1 766 kroner\n` +
                `• april 2025 på 1 766 kroner\n\n` +
                `Samtidig ser vi at du har fått feilutbetalinger for:\n` +
                `• januar 2025 til februar 2025 på 1 766 kroner\n` +
                `• april 2025 på 1 766 kroner\n\n` +
                `Er det greit at vi venter med etterbetaling til vi har vurdert om vi skal kreve ` +
                `tilbake feilutbetalt beløp? Hvis du samtykker, kan vi trekke eventuell ` +
                `tilbakekreving fra etterbetalingen din.\n\n` +
                `Gi samtykke ved å svare JA på denne meldingen. I svaret kan du samtidig uttale ` +
                `deg om feilutbetalingen. Dette må du gjøre innen 14 dager.`
        );
    });
});
