import { lagVedtaksperiodeMedBegrunnelser } from '@testutils/testdata/vedtaksperiodeTestdata';
import { VedtakBegrunnelseType } from '@typer/vedtak';
import { skalViseFritekstbegrunnelser, Vedtaksperiodetype } from '@typer/vedtaksperiode';
import { describe, expect, test } from 'vitest';

describe('Vedtaksperiode', () => {
    describe('SkalViseFritekstbegrunnelser', () => {
        test.each([
            'Standardbegrunnelse$ETTER_ENDRET_UTBETALING_ETTERBETALING_TRE_MÅNEDER',
            'Standardbegrunnelse$ETTER_ENDRET_UTBETALING_ETTERBETALING_TRE_MÅNEDER_KUN_UTVIDET_DEL',
            'Standardbegrunnelse$ETTER_ENDRET_UTBETALING_ETTERBETALING_TRE_AAR',
        ])('skal returnere true for utbetalingsperiode med begrunnelsen %s', standardbegrunnelse => {
            // Arrange
            const vedtaksperiode = lagVedtaksperiodeMedBegrunnelser({
                type: Vedtaksperiodetype.UTBETALING,
                begrunnelser: [
                    {
                        standardbegrunnelse,
                        vedtakBegrunnelseType: VedtakBegrunnelseType.ETTER_ENDRET_UTBETALING,
                        støtterFritekst: false,
                    },
                ],
            });

            // Act
            const skalVise = skalViseFritekstbegrunnelser(vedtaksperiode);

            // Assert
            expect(skalVise).toBe(true);
        });

        test('skal returnere false for utbetalingsperiode med etter endret utbetaling-begrunnelse som ikke gjelder etterbetaling', () => {
            // Arrange
            const vedtaksperiode = lagVedtaksperiodeMedBegrunnelser({
                type: Vedtaksperiodetype.UTBETALING,
                begrunnelser: [
                    {
                        standardbegrunnelse: 'Standardbegrunnelse$ETTER_ENDRET_UTBETALING_ENDRE_MOTTAKER',
                        vedtakBegrunnelseType: VedtakBegrunnelseType.ETTER_ENDRET_UTBETALING,
                        støtterFritekst: false,
                    },
                ],
            });

            // Act
            const skalVise = skalViseFritekstbegrunnelser(vedtaksperiode);

            // Assert
            expect(skalVise).toBe(false);
        });
    });
});
